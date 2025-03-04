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
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// Registro de novo usuário
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
// Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        res.json({ message: 'Login efetuado com sucesso', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro no login', error: err });
    }
}));
// Atualização da conta (nome e língua preferida)
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
    const { email } = req.body;
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
        const user = yield User_1.default.findOne({ email, password: currentPassword });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
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
