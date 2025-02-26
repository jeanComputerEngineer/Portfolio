import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAccount extends Document {
    email: string;
    password: string;
    name: string;
    preferredLanguage: string;
    twoFactorEnabled: boolean;
    twoFactorSecret?: string;
}

const AccountSchema = new Schema<IAccount>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    preferredLanguage: { type: String, default: "pt" },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String }
});

// Hash da senha antes de salvar
AccountSchema.pre("save", async function (next) {
    const account = this as IAccount;
    if (!account.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        account.password = await bcrypt.hash(account.password, salt);
        next();
    } catch (error) {
        next(error as any);
    }
});

export const Account = model<IAccount>("Account", AccountSchema);
