"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const encryptionKey = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef'; // 32 bytes
// Para IV, use um valor fixo para simplificar (não recomendado em produção, use IVs aleatórios e armazene-os)
const iv = Buffer.alloc(16, 0);
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}
function decrypt(text) {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
