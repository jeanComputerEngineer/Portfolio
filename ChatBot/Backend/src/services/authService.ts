import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    clientID: process.env.OAUTH2_CLIENT_ID || '',
    clientSecret: process.env.OAUTH2_CLIENT_SECRET || '',
    callbackURL: process.env.OAUTH2_CALLBACK_URL || 'http://localhost:6000/api/auth/oauth2/callback'
},
    async (accessToken: string, refreshToken: string, profile: any, cb: (error: any, user?: any) => void) => {
        // Aqui você pode implementar lógica para criar/atualizar o usuário no MongoDB
        return cb(null, { accessToken, profile });
    }
));

// Define a serialização e desserialização do usuário
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj as any);
});


export default passport;
