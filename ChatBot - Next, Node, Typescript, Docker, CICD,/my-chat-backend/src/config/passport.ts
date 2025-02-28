import passport from "passport";
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest } from "passport-local";
import bcrypt from "bcryptjs";
import { Account, IAccount } from "../models/account.model";

const localOptions: IStrategyOptionsWithRequest = {
    usernameField: "email",
    passReqToCallback: true,
};

passport.use(
    new LocalStrategy(localOptions, async (req, email, password, done) => {
        try {
            const user = await Account.findOne({ email });
            if (!user) {
                return done(null, false, { message: "Usuário não encontrado" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Senha incorreta" });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

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
