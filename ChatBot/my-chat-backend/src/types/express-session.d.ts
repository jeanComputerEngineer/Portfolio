// src/types/express-session.d.ts
import "express-session";

declare module "express-session" {
    interface Session {
        twoFactorToken?: string;
        pendingUser?: any;
    }
}
