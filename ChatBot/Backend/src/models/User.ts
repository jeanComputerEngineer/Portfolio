// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    preferredLanguage?: string;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferredLanguage: { type: String, default: 'Portuguese' },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
});

// Hasheia a senha antes de salvar (somente se modificada)
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as any); // <-- Corrigido
    }
});


export default mongoose.model<IUser>('User', UserSchema);
