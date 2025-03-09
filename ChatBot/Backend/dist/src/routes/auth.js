"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtMiddleware_1 = require("../middlewares/jwtMiddleware");
const router = (0, express_1.Router)();
/**
 * Rotas públicas
 */
// Registro de usuário
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, preferredLanguage } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }
    try {
        const existing = yield User_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }
        const user = new User_1.default({ name, email, password, preferredLanguage });
        yield user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: err });
    }
}));
// Login com e‑mail e senha
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        // Se 2FA estiver habilitado, informe o cliente
        if (user.twoFactorEnabled) {
            return res.json({ message: '2FA requerido', user: { email: user.email, twoFactorEnabled: true } });
        }
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const safeUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isGitHub: user.isGitHub,
            preferredLanguage: user.preferredLanguage || 'Portuguese',
        };
        res.json({ message: 'Login efetuado com sucesso', token, user: safeUser });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro no login', error: err });
    }
}));
// Inicia o fluxo OAuth2 (redireciona para o GitHub)
router.get('/oauth2', passport_1.default.authenticate('github'));
// Callback OAuth2
router.get('/oauth2/callback', passport_1.default.authenticate('github', { failureRedirect: '/login' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passportUser = req.user;
    const userDoc = yield User_1.default.findOne({ githubId: passportUser.githubId });
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
    const token = jsonwebtoken_1.default.sign({ userId: userDoc._id, email: userDoc.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        domain: '.jeanhenrique.site',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    res.redirect('https://chatbot.jeanhenrique.site/chat?forceReload=1');
}));
// Rotas de 2FA – essas rotas são públicas para permitir a configuração logo após o registro
// Configuração de 2FA (setup)
router.get('/2fa/setup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Permite obter o email via query (útil logo após o registro)
    const email = req.query.email;
    if (!email)
        return res.status(400).json({ message: 'Email é necessário para configurar 2FA' });
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return res.status(404).json({ message: 'Usuário não encontrado' });
    const secret = speakeasy_1.default.generateSecret({ name: `ChatBot (${user.email})` });
    user.twoFactorSecret = secret.base32;
    yield user.save();
    qrcode_1.default.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err)
            return res.status(500).json({ message: 'Erro ao gerar QRCode', error: err });
        res.json({ message: '2FA setup iniciado', qrCode: data_url, secret: secret.base32 });
    });
}));
// Verificação de 2FA
router.post('/2fa/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token } = req.body;
    if (!email || !token) {
        return res.status(400).json({ message: 'Email e token são obrigatórios' });
    }
    const user = yield User_1.default.findOne({ email });
    if (!user || !user.twoFactorSecret) {
        return res.status(404).json({ message: 'Configuração de 2FA não encontrada' });
    }
    const verified = speakeasy_1.default.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
    });
    if (verified) {
        user.twoFactorEnabled = true;
        yield user.save();
        // Gera o token JWT
        const jwtToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: '2FA verificado com sucesso', token: jwtToken, user });
    }
    else {
        return res.status(400).json({ message: 'Token 2FA inválido' });
    }
}));
/**
 * A partir deste ponto, as rotas são protegidas – o jwtMiddleware é aplicado.
 */
router.use(jwtMiddleware_1.jwtMiddleware);
// Rotas protegidas (ex.: atualizar conta, alterar senha, etc.)
// Atualização de conta
router.put('/account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, preferredLanguage } = req.body;
    const userEmail = req.user.email;
    if (!userEmail) {
        return res.status(400).json({ message: 'Usuário não autenticado' });
    }
    try {
        const user = yield User_1.default.findOneAndUpdate({ email: userEmail }, { name, preferredLanguage }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ message: 'Conta atualizada', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar conta', error: err });
    }
}));
// Exclusão de conta
router.delete('/account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user.email;
    if (!userEmail) {
        return res.status(400).json({ message: 'Usuário não autenticado' });
    }
    try {
        yield User_1.default.findOneAndDelete({ email: userEmail });
        res.json({ message: 'Conta excluída' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao excluir conta', error: err });
    }
}));
// Alteração de senha
router.put('/changePassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = req.body;
    const userEmail = req.user.email;
    if (!userEmail || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }
    try {
        const user = yield User_1.default.findOne({ email: userEmail });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const isMatch = yield bcrypt_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        if (newPassword.length < 6 || newPassword.length > 20) {
            return res.status(400).json({
                message: 'A nova senha deve ter entre 6 e 20 caracteres.'
            });
        }
        user.password = newPassword;
        yield user.save();
        res.json({ message: 'Senha alterada com sucesso' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao alterar senha', error: err });
    }
}));
exports.default = router;
