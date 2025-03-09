// src/routes/auth.ts
import { Router } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import passport from 'passport';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Registra um novo usuário com nome, email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               preferredLanguage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 */
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     description: Autentica usuário com email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso.
 */
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
        res.json({ message: 'Login efetuado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro no login', error: err });
    }
});

// Inicia o fluxo OAuth2 (redireciona para o GitHub)
router.get('/oauth2', passport.authenticate('github'));

router.get(
    '/oauth2/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    async (req, res) => {
        // Faz a busca do usuário no banco, etc. (como já está no seu código).
        // Supondo que userDoc seja o usuário encontrado ou criado
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

        // Define o cookie
        res.cookie('user', JSON.stringify(safeUser), {
            httpOnly: false,
            domain: '.jeanhenrique.site',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        // Redireciona para /chat COM o parâmetro ?forceReload=1
        res.redirect('https://chatbot.jeanhenrique.site/chat?forceReload=1');
    }
);





// Endpoint para configurar 2FA (gera secret e QR Code)
router.get('/2fa/setup', async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email é necessário' });
    const user = await User.findOne({ email: email as string });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    const secret = speakeasy.generateSecret({ name: `ChatBot (${user.email})` });
    user.twoFactorSecret = secret.base32;
    await user.save();
    QRCode.toDataURL(secret.otpauth_url as string, (err, data_url) => {
        if (err) return res.status(500).json({ message: 'Erro ao gerar QRCode', error: err });
        res.json({ message: '2FA setup iniciado', qrCode: data_url, secret: secret.base32 });
    });

});

// Endpoint para verificar token 2FA
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
        return res.json({ message: '2FA verificado com sucesso', user });
    } else {
        return res.status(400).json({ message: 'Token 2FA inválido' });
    }
});

// Atualização de conta
router.put('/account', async (req, res) => {
    const { email, name, preferredLanguage } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O e-mail é necessário para atualizar a conta' });
    }
    try {
        const user = await User.findOneAndUpdate({ email }, { name, preferredLanguage }, { new: true });
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
    // Tenta obter o e-mail do corpo ou da query string
    const email = req.body.email || req.query.email;
    if (!email) {
        return res.status(400).json({ message: 'O e-mail é necessário para excluir a conta' });
    }
    try {
        await User.findOneAndDelete({ email });
        res.json({ message: 'Conta excluída' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir conta', error: err });
    }
});


// Alteração de senha
router.put('/changePassword', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }
    try {
        const user = await User.findOne({ email });
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
        user.password = newPassword; // O pre-save do UserSchema cuidará do hash
        await user.save();
        res.json({ message: 'Senha alterada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao alterar senha', error: err });
    }
});




export default router;
