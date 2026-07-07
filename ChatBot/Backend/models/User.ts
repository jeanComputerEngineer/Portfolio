import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    preferredLanguage?: string;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string;
    githubId?: string;          // Novo campo para o ID do GitHub
    isGitHub?: boolean;         // Novo campo para identificar login via GitHub
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferredLanguage: { type: String, default: 'Portuguese' },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    githubId: { type: String, unique: true, sparse: true },
    isGitHub: { type: Boolean, default: false }
});

// Hasheia a senha antes de salvar (somente se modificada)
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as any);
    }
});

export default mongoose.model<IUser>('User', UserSchema);
