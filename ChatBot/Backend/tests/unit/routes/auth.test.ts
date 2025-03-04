// tests/unit/routes/auth.test.ts
import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import authRoutes from "../../../src/routes/auth";
import User from "../../../src/models/User";

// Mock do modelo User
jest.mock("../../../src/models/User");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes (Unit - Mock de User)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("POST /api/auth/register - deve retornar 400 se faltarem campos obrigatórios", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({ email: "teste@example.com" }); // faltam name e password

        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/Campos obrigatórios ausentes/i);
    });

    it("POST /api/auth/register - deve criar usuário se todos os campos forem fornecidos", async () => {
        // Mock para simular que não existe usuário ainda
        (User.findOne as jest.Mock).mockResolvedValue(null);
        // Mock para simular save()
        (User.prototype.save as jest.Mock).mockResolvedValue({
            _id: "fake_id",
            name: "Fulano",
            email: "fulano@example.com",
            password: "123456",
            preferredLanguage: "Portuguese",
        });

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Fulano",
                email: "fulano@example.com",
                password: "123456"
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Usuário registrado com sucesso");
        expect(User.findOne).toHaveBeenCalledWith({ email: "fulano@example.com" });
        expect(User.prototype.save).toHaveBeenCalledTimes(1);
    });
});
