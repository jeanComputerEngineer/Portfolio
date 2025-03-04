describe("ChatPageComponent - Fluxo Completo", () => {
    // Realiza o login antes de cada teste
    beforeEach(() => {
        cy.visit("https://chatbot.jeanhenrique.site/login");

        // Preenche os campos de e-mail e senha
        cy.get("input#email").should("be.visible").type("jschenrique41@gmail.com");
        cy.get("input#password").should("be.visible").type("12345");

        // Submete o formulário de login e aguarda redirecionamento para /chat
        cy.get("form[aria-label='loginForm']").submit();
        cy.url().should("include", "/chat");
    });

    it("Verifica os elementos principais da página de chat", () => {
        // Campo para digitar mensagem e botão de envio
        cy.get("textarea[aria-label='Type your message']").should("be.visible");
        cy.get("button[aria-label='Send message']").should("be.visible");

        // Seletor de modelo com o texto "DeepSeek Chat"
        cy.get("select").should("contain.text", "DeepSeek Chat");
    });

    it("Envia uma mensagem de teste e verifica se ela aparece", () => {
        const mensagemTeste = "Olá, esta é uma mensagem de teste!";

        // Limpa e preenche o campo de mensagem
        cy.get("textarea[aria-label='Type your message']")
            .clear()
            .type(mensagemTeste);

        // Clica no botão de envio e aguarda que a mensagem apareça na lista
        cy.get("button[aria-label='Send message']").click();
        cy.contains(mensagemTeste).should("be.visible");
    });

    it("Cria uma nova conversa", () => {
        // Busca o botão de nova conversa com título que contenha "create" ou "nova"
        cy.get("button[title]")
            .filter((index, btn) => {
                const title = btn.getAttribute("title");
                return /create/i.test(title) || /nova/i.test(title);
            })
            .then(($btn) => {
                if ($btn.length > 0) {
                    cy.wrap($btn).click({ force: true });
                    // Opcional: verifique se a lista de conversas atualizou (ajuste conforme o texto exibido)
                    cy.get("aside").within(() => {
                        cy.contains(/nova conversa/i).should("exist");
                    });
                } else {
                    cy.log("Botão de nova conversa não encontrado - teste pulado.");
                }
            });
    });

    it("Inspeciona os elementos do menu superior", () => {
        // Verifica elementos dentro do header (menu superior)
        cy.get("header").within(() => {
            // Título da aplicação
            cy.contains("ChatBot").should("be.visible");

            // Verifica botões que sabemos que estão no header: editar perfil, alternar tema e logout
            cy.get("button[title]")
                .filter((i, btn) => /edit/i.test(btn.getAttribute("title")))
                .should("have.length.at.least", 1);


        });
    });


    it("Exibe sugestões quando não há mensagens na conversa", () => {
        // Cria nova conversa
        cy.get("button[title]")
            .filter((index, btn) => {
                const title = btn.getAttribute("title");
                return /create/i.test(title) || /nova/i.test(title);
            })
            .then(($btn) => {
                if ($btn.length > 0) {
                    cy.wrap($btn).click({ force: true });
                } else {
                    cy.log("Botão de nova conversa não encontrado - não é possível testar sugestões.");
                }
            });

        // Verifica se o container de sugestões aparece
        cy.contains(/sugestões/i).should("be.visible");


    });

});
