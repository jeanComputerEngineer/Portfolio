import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { Account, IAccount } from "../models/account.model";

const router = Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        try {
            const { email, password, name, preferredLanguage } = req.body;
            const existing = await Account.findOne({ email });
            if (existing) {
                res.status(400).json({ message: "E-mail já cadastrado." });
                return;
            }
            const newUser = new Account({ email, password, name, preferredLanguage });
            await newUser.save();
            console.log("Usuário criado:", newUser);
            res.json({ message: "Usuário registrado com sucesso." });
        } catch (error) {
            console.error("Erro no registro:", error);
            res.status(500).json({ message: "Erro no registro." });
        }
    })().catch(next);
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: unknown, user: IAccount, info: unknown) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
        req.logIn(user, (errLogin) => {
            if (errLogin) {
                return next(errLogin);
            }
            return res.json({
                message: "Login bem-sucedido",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    preferredLanguage: user.preferredLanguage,
                },
            });
        });
    })(req, res, next);
});

router.put("/account", (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return;
    }
    const { name, preferredLanguage } = req.body;
    Account.findByIdAndUpdate((req.user as IAccount)._id, { name, preferredLanguage }, { new: true })
        .then((user) => res.json({ message: "Conta atualizada", user }))
        .catch((err) => res.status(500).json({ message: "Erro ao atualizar conta" }));
});

router.delete("/account", (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return;
    }
    Account.findByIdAndDelete((req.user as IAccount)._id)
        .then(() => res.json({ message: "Conta excluída" }))
        .catch((err) => res.status(500).json({ message: "Erro ao excluir conta" }));
});

export default router;
