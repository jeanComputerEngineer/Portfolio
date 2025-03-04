import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
    sender: 'user' | 'assistant';
    content: string;
}

export interface IConversation extends Document {
    title: string;
    messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
    sender: { type: String, required: true, enum: ['user', 'assistant'] },
    content: { type: String, required: true }
});

const ConversationSchema: Schema = new Schema({
    title: { type: String, required: true },
    messages: { type: [MessageSchema], default: [] }
}, { timestamps: true });

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
