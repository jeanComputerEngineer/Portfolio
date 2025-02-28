"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const account_model_1 = require("../models/account.model");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails && profile.emails[0].value;
        let user = await account_model_1.Account.findOne({ email });
        if (!user) {
            user = new account_model_1.Account({
                email,
                name: profile.displayName,
                password: "", // OAuth users typically do not have a password
                preferredLanguage: "pt",
                twoFactorEnabled: false,
            });
            await user.save();
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, null);
    }
}));
