"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
var crypto_1 = __importDefault(require("crypto"));
var algorithm = 'aes-256-cbc';
var encryptionKey = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef'; // 32 bytes
// Para IV, use um valor fixo para simplificar (não recomendado em produção, use IVs aleatórios e armazene-os)
var iv = Buffer.alloc(16, 0);
function encrypt(text) {
    var cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}
function decrypt(text) {
    var encryptedText = Buffer.from(text, 'hex');
    var decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
