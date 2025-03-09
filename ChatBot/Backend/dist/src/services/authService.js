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
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = require("passport-github2");
const User_1 = __importDefault(require("../models/User"));
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.OAUTH2_CLIENT_ID || '',
    clientSecret: process.env.OAUTH2_CLIENT_SECRET || '',
    callbackURL: process.env.OAUTH2_CALLBACK_URL || 'http://localhost:6000/api/auth/oauth2/callback',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const githubId = profile.id;
        let user = yield User_1.default.findOne({ githubId });
        if (!user) {
            // Gera e-mail e senha aleatórios
            const randomEmail = `github_${githubId}@example.com`;
            const randomPassword = Math.random().toString(36).slice(-8);
            user = new User_1.default({
                name: profile.displayName || profile.username || 'GitHub User',
                email: randomEmail,
                password: randomPassword,
                githubId,
                isGitHub: true,
            });
            yield user.save();
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, null);
    }
})));
// Serialização e desserialização permanecem os mesmos
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
exports.default = passport_1.default;
