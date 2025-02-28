"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AccountSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    preferredLanguage: { type: String, default: "pt" },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String }
});
// Hash da senha antes de salvar
AccountSchema.pre("save", async function (next) {
    const account = this;
    if (!account.isModified("password"))
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        account.password = await bcryptjs_1.default.hash(account.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.Account = (0, mongoose_1.model)("Account", AccountSchema);
