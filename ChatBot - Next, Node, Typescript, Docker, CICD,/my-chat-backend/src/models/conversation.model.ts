import { Schema, model, Document, Types } from "mongoose";

export interface IMessage {
    sender: "user" | "assistant";
    content: string;
    createdAt: Date;
}

export interface IConversation extends Document {
    accountId: Types.ObjectId;
    messages: IMessage[];
}

const MessageSchema = new Schema<IMessage>({
    sender: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ConversationSchema = new Schema<IConversation>({
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    messages: [MessageSchema]
});

export const Conversation = model<IConversation>("Conversation", ConversationSchema);
