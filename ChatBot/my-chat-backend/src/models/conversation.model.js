"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    sender: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
var ConversationSchema = new mongoose_1.Schema({
    accountId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Account", required: true },
    title: { type: String, required: true },
    messages: [MessageSchema],
}, { timestamps: true });
exports.Conversation = (0, mongoose_1.model)("Conversation", ConversationSchema);
