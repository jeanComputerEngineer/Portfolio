// src/routes/auth.ts
import { Router } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import passport from 'passport';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import { jwtMiddleware } from '../middlewares/jwtMiddleware';

const router = Router();

/**
 * Rotas públicas
 */

// Registro de usuário
router.post('/register', async (req, res) => {
    const { name, email, password, preferredLanguage } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }
    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }
        const user: IUser = new User({ name, email, password, preferredLanguage });
        await user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: err });
    }
});

// Login com e‑mail e senha
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        // Se 2FA estiver habilitado, informe o cliente
        if (user.twoFactorEnabled) {
            return res.json({ message: '2FA requerido', user: { email: user.email, twoFactorEnabled: true } });
        }
        // Gera o token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        const safeUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isGitHub: user.isGitHub,
            preferredLanguage: user.preferredLanguage || 'Portuguese',
        };
        res.json({ message: 'Login efetuado com sucesso', token, user: safeUser });
    } catch (err) {
        res.status(500).json({ message: 'Erro no login', error: err });
    }
});

// Inicia o fluxo OAuth2 (redireciona para o GitHub)
router.get('/oauth2', passport.authenticate('github'));

// Callback OAuth2
router.get(
    '/oauth2/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    async (req, res) => {
        const passportUser: any = req.user;
        const userDoc = await User.findOne({ githubId: passportUser.githubId });
        if (!userDoc) {
            return res.redirect('https://chatbot.jeanhenrique.site/login');
        }
        const safeUser = {
            _id: userDoc._id,
            name: userDoc.name,
            email: userDoc.email,
            isGitHub: userDoc.isGitHub,
            preferredLanguage: userDoc.preferredLanguage || 'Portuguese',
        };
        const token = jwt.sign(
            { userId: userDoc._id, email: userDoc.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            domain: '.jeanhenrique.site',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.redirect('https://chatbot.jeanhenrique.site/chat?forceReload=1');
    }
);

// Rotas de 2FA – essas rotas são públicas para permitir a configuração logo após o registro

// Configuração de 2FA (setup)
router.get('/2fa/setup', async (req, res) => {
    // Permite obter o email via query (útil logo após o registro)
    const email = req.query.email as string;
    if (!email) return res.status(400).json({ message: 'Email é necessário para configurar 2FA' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    const secret = speakeasy.generateSecret({ name: `ChatBot (${user.email})` });
    user.twoFactorSecret = secret.base32;
    await user.save();
    QRCode.toDataURL(secret.otpauth_url as string, (err, data_url) => {
        if (err) return res.status(500).json({ message: 'Erro ao gerar QRCode', error: err });
        res.json({ message: '2FA setup iniciado', qrCode: data_url, secret: secret.base32 });
    });
});

// Verificação de 2FA
router.post('/2fa/verify', async (req, res) => {
    const { email, token } = req.body;
    if (!email || !token) {
        return res.status(400).json({ message: 'Email e token são obrigatórios' });
    }
    const user = await User.findOne({ email });
    if (!user || !user.twoFactorSecret) {
        return res.status(404).json({ message: 'Configuração de 2FA não encontrada' });
    }
    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
    });
    if (verified) {
        user.twoFactorEnabled = true;
        await user.save();
        // Gera o token JWT
        const jwtToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        return res.json({ message: '2FA verificado com sucesso', token: jwtToken, user });
    } else {
        return res.status(400).json({ message: 'Token 2FA inválido' });
    }
});


/**
 * A partir deste ponto, as rotas são protegidas – o jwtMiddleware é aplicado.
 */
router.use(jwtMiddleware);

// Rotas protegidas (ex.: atualizar conta, alterar senha, etc.)

// Atualização de conta
router.put('/account', async (req, res) => {
    const { name, preferredLanguage } = req.body;
    const userEmail = (req as any).user.email;
    if (!userEmail) {
        return res.status(400).json({ message: 'Usuário não autenticado' });
    }
    try {
        const user = await User.findOneAndUpdate({ email: userEmail }, { name, preferredLanguage }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ message: 'Conta atualizada', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar conta', error: err });
    }
});

// Exclusão de conta
router.delete('/account', async (req, res) => {
    const userEmail = (req as any).user.email;
    if (!userEmail) {
        return res.status(400).json({ message: 'Usuário não autenticado' });
    }
    try {
        await User.findOneAndDelete({ email: userEmail });
        res.json({ message: 'Conta excluída' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir conta', error: err });
    }
});

// Alteração de senha
router.put('/changePassword', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userEmail = (req as any).user.email;
    if (!userEmail || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        if (newPassword.length < 6 || newPassword.length > 20) {
            return res.status(400).json({
                message: 'A nova senha deve ter entre 6 e 20 caracteres.'
            });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Senha alterada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao alterar senha', error: err });
    }
});

export default router;
