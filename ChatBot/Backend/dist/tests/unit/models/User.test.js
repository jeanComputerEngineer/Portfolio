"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/unit/models/User.test.ts
const User_1 = __importDefault(require("../../../src/models/User"));
describe("User Model", () => {
    it("deve criar um usuário com campos obrigatórios", () => {
        const user = new User_1.default({
            name: "Fulano",
            email: "fulano@example.com",
            password: "123456"
        });
        expect(user.name).toBe("Fulano");
        expect(user.email).toBe("fulano@example.com");
        expect(user.password).toBe("123456");
        // preferredLanguage deve ter default 'Portuguese'
        expect(user.preferredLanguage).toBe("Portuguese");
    });
    it("deve falhar ao criar usuário sem campos obrigatórios (teste apenas de exemplificação)", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default({
            // sem email e password
            name: "Sicrano"
        });
        // user.validate() é uma forma de verificar se o Mongoose reclama
        yield expect(user.validate()).rejects.toThrow();
    }));
});
