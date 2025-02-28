import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/app/login/page";

// Simula o useRouter
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe("Login", () => {
    it("exibe erros quando não preenche os campos", () => {
        render(<Login />);
        const button = screen.getByRole("button", { name: /entrar/i });
        fireEvent.click(button);
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeTruthy(); // Verifica se o alerta existe
    });
});
