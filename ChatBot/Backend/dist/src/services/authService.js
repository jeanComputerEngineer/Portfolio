"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/authService.ts
const passport_1 = __importDefault(require("passport"));
const passport_oauth2_1 = require("passport-oauth2");
passport_1.default.use(new passport_oauth2_1.Strategy({
    authorizationURL: process.env.OAUTH2_AUTH_URL || 'https://exemplo.com/oauth/authorize',
    tokenURL: process.env.OAUTH2_TOKEN_URL || 'https://exemplo.com/oauth/token',
    clientID: process.env.OAUTH2_CLIENT_ID || '',
    clientSecret: process.env.OAUTH2_CLIENT_SECRET || '',
    callbackURL: process.env.OAUTH2_CALLBACK_URL || 'https://seusite.com/auth/callback'
}, (accessToken, refreshToken, profile, cb) => {
    // Implemente a lógica para encontrar ou criar o usuário
    return cb(null, profile);
}));
exports.default = passport_1.default;
