import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Account } from "../models/account.model";

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback"
    },
    async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void
    ) => {
        try {
            const email = profile.emails && profile.emails[0].value;
            let user = await Account.findOne({ email });
            if (!user) {
                user = new Account({
                    email,
                    name: profile.displayName,
                    password: "", // OAuth users typically do not have a password
                    preferredLanguage: "pt",
                    twoFactorEnabled: false,
                });
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));
