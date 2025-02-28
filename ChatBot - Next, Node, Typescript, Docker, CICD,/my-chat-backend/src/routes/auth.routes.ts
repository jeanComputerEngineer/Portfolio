import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import passport from "passport";
import { Account, IAccount } from "../models/account.model";

const router = Router();

// Helper para lidar com async/await
const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);

// Rota de registro
router.post(
    "/register",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, name, preferredLanguage } = req.body;
        const existing = await Account.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }
        const newUser = new Account({ email, password, name, preferredLanguage });
        await newUser.save();
        console.log("Usuário criado:", newUser);
        return res.json({ message: "Usuário registrado com sucesso." });
    })
);

// Rota de login (sem 2FA): se as credenciais forem válidas, o usuário é logado imediatamente.
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: IAccount, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
        req.logIn(user, (err: any) => {
            if (err) {
                return next(err);
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

// Rota para atualizar a conta
router.put("/account", (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return;
    }
    const { name, preferredLanguage } = req.body;
    Account.findByIdAndUpdate(
        (req.user as IAccount)._id,
        { name, preferredLanguage },
        { new: true }
    )
        .then((user) => res.json({ message: "Conta atualizada", user }))
        .catch((err) => res.status(500).json({ message: "Erro ao atualizar conta" }));
});

// Rota para excluir a conta
router.delete("/account", (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return;
    }
    Account.findByIdAndDelete((req.user as IAccount)._id)
        .then(() => res.json({ message: "Conta excluída" }))
        .catch((err) => res.status(500).json({ message: "Erro ao excluir conta" }));
});

export default router;
