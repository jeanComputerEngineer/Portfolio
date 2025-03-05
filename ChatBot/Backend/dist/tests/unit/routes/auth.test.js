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
// tests/unit/routes/auth.test.ts
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../src/routes/auth"));
const User_1 = __importDefault(require("../../../src/models/User"));
// Mock do modelo User
jest.mock("../../../src/models/User");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
describe("Auth Routes (Unit - Mock de User)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("POST /api/auth/register - deve retornar 400 se faltarem campos obrigatórios", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/api/auth/register")
            .send({ email: "teste@example.com" }); // faltam name e password
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/Campos obrigatórios ausentes/i);
    }));
    it("POST /api/auth/register - deve criar usuário se todos os campos forem fornecidos", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock para simular que não existe usuário ainda
        User_1.default.findOne.mockResolvedValue(null);
        // Mock para simular save()
        User_1.default.prototype.save.mockResolvedValue({
            _id: "fake_id",
            name: "Fulano",
            email: "fulano@example.com",
            password: "123456",
            preferredLanguage: "Portuguese",
        });
        const res = yield (0, supertest_1.default)(app)
            .post("/api/auth/register")
            .send({
            name: "Fulano",
            email: "fulano@example.com",
            password: "123456"
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Usuário registrado com sucesso");
        expect(User_1.default.findOne).toHaveBeenCalledWith({ email: "fulano@example.com" });
        expect(User_1.default.prototype.save).toHaveBeenCalledTimes(1);
    }));
});
