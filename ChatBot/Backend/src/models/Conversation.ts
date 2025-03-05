import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
    sender: 'user' | 'assistant';
    content: string;
}

export interface IConversation extends Document {
    owner: string; // Adicionado para armazenar o dono da conversa
    title: string;
    messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
    sender: { type: String, required: true, enum: ['user', 'assistant'] },
    content: { type: String, required: true }
});

const ConversationSchema: Schema = new Schema({
    owner: { type: String, required: true }, // novo campo
    title: { type: String, required: true },
    messages: { type: [MessageSchema], default: [] }
}, { timestamps: true });

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
