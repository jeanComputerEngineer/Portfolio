"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const account_model_1 = require("../models/account.model");
// Configuração da Estratégia Local sem 2FA
const localOptions = {
    usernameField: "email",
    passReqToCallback: true,
};
passport_1.default.use(new passport_local_1.Strategy(localOptions, async (req, email, password, done) => {
    try {
        const user = await account_model_1.Account.findOne({ email });
        if (!user) {
            return done(null, false, { message: "Usuário não encontrado" });
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: "Senha incorreta" });
        }
        // Removemos a verificação de token 2FA via TOTP
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await account_model_1.Account.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
exports.default = passport_1.default;
