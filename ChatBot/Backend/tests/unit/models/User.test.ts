// tests/unit/models/User.test.ts
import User from "../../../src/models/User";

describe("User Model", () => {
    it("deve criar um usuário com campos obrigatórios", () => {
        const user = new User({
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

    it("deve falhar ao criar usuário sem campos obrigatórios (teste apenas de exemplificação)", async () => {
        const user = new User({
            // sem email e password
            name: "Sicrano"
        });
        // user.validate() é uma forma de verificar se o Mongoose reclama
        await expect(user.validate()).rejects.toThrow();
    });
});
