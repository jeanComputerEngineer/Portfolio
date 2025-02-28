import crypto from "crypto";

const algorithm = 'aes-256-cbc';
const encryptionKey = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef'; // 32 bytes
// Para IV, use um valor fixo para simplificar (não recomendado em produção, use IVs aleatórios e armazene-os)
const iv = Buffer.alloc(16, 0);

export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

export function decrypt(text: string): string {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
