import { Router } from 'express';
import User, { IUser } from '../models/User';

const router = Router();

// Registro de novo usuário
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

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        res.json({ message: 'Login efetuado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro no login', error: err });
    }
});

// Atualização da conta (nome e língua preferida)
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
    const { email } = req.body;
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
        const user = await User.findOne({ email, password: currentPassword });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Senha alterada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao alterar senha', error: err });
    }
});

export default router;
