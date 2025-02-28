import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import passport from "passport";
import { Account, IAccount } from "../models/account.model";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

const router = Router();

// Async handler wrapper to catch errors
const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Google OAuth middleware as explicit RequestHandlers
const googleAuth: RequestHandler = passport.authenticate("google", { failureRedirect: "/login" });
const googleCallback: RequestHandler = (req: Request, res: Response) => {
    res.redirect("/chat");
};

router.post(
    "/register",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
    })
);

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        "local",
        (err: unknown, user: IAccount, info: unknown) => {
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
        }
    )(req, res, next);
});

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

router.delete("/account", (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return;
    }
    Account.findByIdAndDelete((req.user as IAccount)._id)
        .then(() => res.json({ message: "Conta excluída" }))
        .catch((err) => res.status(500).json({ message: "Erro ao excluir conta" }));
});

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", googleAuth, googleCallback);

// Endpoint para configurar 2FA (gerar secret e QR code)
router.get("/2fa/setup", (req: Request, res: Response) => {
    if (!req.user) {
        return;
    }
    const secret = speakeasy.generateSecret({ length: 20 });
    const otpAuthUrl = secret.otpauth_url;
    if (!otpAuthUrl) {
        res.status(500).json({ message: "Erro: OTP Auth URL não gerado" });
        return;
    }
    req.session!.twoFactorTempSecret = secret.base32;
    QRCode.toDataURL(otpAuthUrl, (err: Error | null | undefined, data_url: string) => {
        if (err) {
            res.status(500).json({ message: "Erro ao gerar QR Code" });
            return;
        }
        res.json({ secret: secret.base32, qrCode: data_url });
    });
});

// Endpoint para verificar o token 2FA e habilitar 2FA no usuário
router.post(
    "/2fa/verify",
    asyncHandler(async (req: Request, res: Response) => {
        if (!req.user) {
            return res.status(401).json({ message: "Não autorizado" });
        }
        const { token } = req.body;
        const tempSecret = req.session!.twoFactorTempSecret;
        const verified = speakeasy.totp.verify({
            secret: tempSecret!, // non-null assertion: we expect this to be defined
            encoding: "base32",
            token,
        });
        if (verified) {
            const user = req.user as any;
            user.twoFactorEnabled = true;
            // Armazena o secret de forma criptografada (veja utils/crypto)
            user.twoFactorSecret = require("../utils/crypto").encrypt(tempSecret);
            await user.save();
            res.json({ message: "2FA habilitado com sucesso" });
        } else {
            res.status(400).json({ message: "Token inválido" });
        }
    })
);

export default router;
