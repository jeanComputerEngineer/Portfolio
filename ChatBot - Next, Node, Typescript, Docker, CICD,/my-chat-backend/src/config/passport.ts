import passport from "passport";
import { Strategy as LocalStrategy, IStrategyOptions, VerifyFunction } from "passport-local";
import { Account, IAccount } from "../models/account.model"; // ajuste o caminho conforme seu projeto
import bcrypt from "bcryptjs";

// Configuração da estratégia local
const options: IStrategyOptions = {
    usernameField: "email"
};

const verify: VerifyFunction = async (email: string, password: string, done: (error: any, user?: IAccount | false, options?: { message: string }) => void) => {
    try {
        const user = await Account.findOne({ email });
        if (!user) {
            return done(null, false, { message: "Usuário não encontrado" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: "Senha incorreta" });
        }
        // Aqui, se necessário, você pode implementar a verificação de dois fatores usando a biblioteca speakeasy.
        return done(null, user);
    } catch (error) {
        return done(error);
    }
};

passport.use(new LocalStrategy(options, verify));

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
