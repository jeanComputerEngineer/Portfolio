"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const account_model_1 = require("../models/account.model");
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
/// <reference path="../types/express-session.d.ts" />
const router = (0, express_1.Router)();
// Helper para lidar com async/await
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// Configuração do Nodemailer (ajuste conforme necessário ou use variáveis de ambiente)
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER || "seu-email@gmail.com",
        pass: process.env.EMAIL_PASS || "sua-senha-de-email",
    },
});
// Rota de registro (permanece inalterada)
router.post("/register", asyncHandler(async (req, res, next) => {
    try {
        const { email, password, name, preferredLanguage } = req.body;
        const existing = await account_model_1.Account.findOne({ email });
        if (existing) {
            res.status(400).json({ message: "E-mail já cadastrado." });
            return;
        }
        const newUser = new account_model_1.Account({ email, password, name, preferredLanguage });
        await newUser.save();
        console.log("Usuário criado:", newUser);
        res.json({ message: "Usuário registrado com sucesso." });
    }
    catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ message: "Erro no registro." });
    }
}));
// Rota de login com verificação por e-mail
router.post("/login", (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(401).json({ message: "Credenciais inválidas" });
            return;
        }
        // Gera um token de 6 dígitos (em hexadecimal, por exemplo)
        const token = crypto_1.default.randomBytes(3).toString("hex");
        // Armazena o token e o usuário pendente na sessão
        req.session.twoFactorToken = token;
        req.session.pendingUser = user;
        // Envia e-mail com o token
        const mailOptions = {
            from: process.env.EMAIL_USER || "seu-email@gmail.com",
            to: user.email,
            subject: "Seu código de autenticação",
            text: `Seu código de autenticação é: ${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Erro ao enviar e-mail:", error);
                res.status(500).json({ message: "Erro ao enviar e-mail de autenticação" });
                return;
            }
            res.json({ message: "Código enviado para o seu e-mail. Verifique sua caixa de entrada." });
        });
    })(req, res, next);
});
// Rota para verificar o código enviado por e-mail
router.post("/verify", (req, res, next) => {
    const { token } = req.body;
    if (req.session.twoFactorToken && req.session.pendingUser && token === req.session.twoFactorToken) {
        // Finaliza o login usando o usuário pendente
        req.logIn(req.session.pendingUser, (err) => {
            if (err) {
                next(err);
                return;
            }
            const user = req.session.pendingUser;
            // Limpa as variáveis da sessão
            delete req.session.twoFactorToken;
            delete req.session.pendingUser;
            res.json({
                message: "Login bem-sucedido",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    preferredLanguage: user.preferredLanguage,
                },
            });
        });
    }
    else {
        res.status(401).json({ message: "Código inválido" });
    }
});
// Rotas para atualizar e excluir conta
router.put("/account", (req, res, next) => {
    if (!req.user) {
        return;
    }
    const { name, preferredLanguage } = req.body;
    account_model_1.Account.findByIdAndUpdate(req.user._id, { name, preferredLanguage }, { new: true })
        .then((user) => res.json({ message: "Conta atualizada", user }))
        .catch((err) => res.status(500).json({ message: "Erro ao atualizar conta" }));
});
router.delete("/account", (req, res, next) => {
    if (!req.user) {
        return;
    }
    account_model_1.Account.findByIdAndDelete(req.user._id)
        .then(() => res.json({ message: "Conta excluída" }))
        .catch((err) => res.status(500).json({ message: "Erro ao excluir conta" }));
});
exports.default = router;
