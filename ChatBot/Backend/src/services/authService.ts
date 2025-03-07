import passport, { Profile } from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.OAUTH2_CLIENT_ID || '',
            clientSecret: process.env.OAUTH2_CLIENT_SECRET || '',
            callbackURL: process.env.OAUTH2_CALLBACK_URL || 'http://localhost:6000/api/auth/oauth2/callback',
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: (error: any, user?: any) => void
        ) => {
            // Aqui você pode salvar ou atualizar o usuário no banco de dados
            return done(null, { accessToken, profile });
        }
    )
);

// Define a serialização e desserialização do usuário
passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

export default passport;
