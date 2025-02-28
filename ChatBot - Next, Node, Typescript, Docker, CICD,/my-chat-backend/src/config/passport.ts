// src/config/passport.ts
import passport from "passport";
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest } from "passport-local";
import { Account, IAccount } from "../models/account.model";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import { decrypt } from "../utils/crypto"; // implementado abaixo

const options: IStrategyOptionsWithRequest = {
    usernameField: "email",
    passReqToCallback: true,
};

passport.use(new LocalStrategy(options, async (req, email, password, done) => {
    try {
        const user = await Account.findOne({ email });
        if (!user) {
            return done(null, false, { message: "Usuário não encontrado" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: "Senha incorreta" });
        }
        // Se 2FA estiver habilitado, verifique o token
        if (user.twoFactorEnabled) {
            const token = req.body.token;
            if (!token) {
                return done(null, false, { message: "Token de 2FA requerido" });
            }
            // Descriptografa o twoFactorSecret antes de usar
            const secret = decrypt(user.twoFactorSecret || "");
            const verified = speakeasy.totp.verify({
                secret,
                encoding: "base32",
                token,
            });
            if (!verified) {
                return done(null, false, { message: "Token de 2FA inválido" });
            }
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await Account.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
