import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    preferredLanguage?: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferredLanguage: { type: String, default: 'Portuguese' }
});

export default mongoose.model<IUser>('User', UserSchema);
