// src/services/authService.ts
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';

passport.use(new OAuth2Strategy({
    authorizationURL: process.env.OAUTH2_AUTH_URL || 'https://exemplo.com/oauth/authorize',
    tokenURL: process.env.OAUTH2_TOKEN_URL || 'https://exemplo.com/oauth/token',
    clientID: process.env.OAUTH2_CLIENT_ID || '',
    clientSecret: process.env.OAUTH2_CLIENT_SECRET || '',
    callbackURL: process.env.OAUTH2_CALLBACK_URL || 'https://seusite.com/auth/callback'
},
    (
        accessToken: string,
        refreshToken: string,
        profile: any,
        cb: (error: any, user?: any) => void
    ) => {
        // Implemente a lógica para encontrar ou criar o usuário
        return cb(null, profile);
    }
));

export default passport;
