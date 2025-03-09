import passport, { Profile } from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User';

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.OAUTH2_CLIENT_ID || '',
            clientSecret: process.env.OAUTH2_CLIENT_SECRET || '',
            callbackURL: process.env.OAUTH2_CALLBACK_URL || 'http://localhost:6000/api/auth/oauth2/callback',
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
            try {
                const githubId = profile.id;
                let user = await User.findOne({ githubId });
                if (!user) {
                    // Gera e-mail e senha aleatórios
                    const randomEmail = `github_${githubId}@example.com`;
                    const randomPassword = Math.random().toString(36).slice(-8);
                    user = new User({
                        name: profile.displayName || profile.username || 'GitHub User',
                        email: randomEmail,
                        password: randomPassword,
                        githubId,
                        isGitHub: true,
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// Serialização e desserialização permanecem os mesmos
passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

export default passport;
