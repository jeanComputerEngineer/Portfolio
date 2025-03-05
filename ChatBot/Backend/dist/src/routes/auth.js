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
const router = (0, express_1.Router)();
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
        res.json({ message: 'Login efetuado com sucesso', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro no login', error: err });
    }
}));
// Rotas OAuth2 utilizando Passport
router.get('/oauth2', passport_1.default.authenticate('oauth2'));
router.get('/oauth2/callback', passport_1.default.authenticate('oauth2', {
    failureRedirect: '/login'
}), (req, res) => {
    // Redireciona após autenticação bem-sucedida
    res.redirect('/chat');
});
// Endpoint para configurar 2FA (gera secret e QR Code)
router.get('/2fa/setup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    if (!email)
        return res.status(400).json({ message: 'Email é necessário' });
    const user = yield User_1.default.findOne({ email: email });
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
// Endpoint para verificar token 2FA
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
        return res.json({ message: '2FA verificado com sucesso', user });
    }
    else {
        return res.status(400).json({ message: 'Token 2FA inválido' });
    }
}));
// Atualização de conta
router.put('/account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, preferredLanguage } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O e-mail é necessário para atualizar a conta' });
    }
    try {
        const user = yield User_1.default.findOneAndUpdate({ email }, { name, preferredLanguage }, { new: true });
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
    // Tenta obter o e-mail do corpo ou da query string
    const email = req.body.email || req.query.email;
    if (!email) {
        return res.status(400).json({ message: 'O e-mail é necessário para excluir a conta' });
    }
    try {
        yield User_1.default.findOneAndDelete({ email });
        res.json({ message: 'Conta excluída' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao excluir conta', error: err });
    }
}));
// Alteração de senha
router.put('/changePassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const isMatch = yield bcrypt_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        user.password = newPassword; // Será hasheada pelo pre-save
        yield user.save();
        res.json({ message: 'Senha alterada com sucesso' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao alterar senha', error: err });
    }
}));
exports.default = router;
