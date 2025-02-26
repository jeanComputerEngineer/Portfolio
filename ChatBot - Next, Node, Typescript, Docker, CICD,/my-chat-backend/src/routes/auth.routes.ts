import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { Account, IAccount } from "../models/account.model";

const router = Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
    // Em vez de async, faça manualmente o try/catch
    (async () => {
        try {
            const { email, password, name, preferredLanguage } = req.body;

            const existing = await Account.findOne({ email });
            if (existing) {
                return res.status(400).json({ message: "E-mail já cadastrado." });
            }

            const newUser = new Account({ email, password, name, preferredLanguage });
            await newUser.save();

            console.log("Usuário criado:", newUser);
            return res.json({ message: "Usuário registrado com sucesso." });
        } catch (error) {
            console.error("Erro no registro:", error);
            return res.status(500).json({ message: "Erro no registro." });
        }
    })().catch(next);
});


/**
 * Login manual com callback do passport
 */
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: unknown, user: IAccount, info: unknown) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        // Se quiser usar sessão, loga o user:
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
                    preferredLanguage: user.preferredLanguage
                }
            });
        });
    })(req, res, next);
});

export default router;
