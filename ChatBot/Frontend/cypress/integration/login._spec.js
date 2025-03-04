// cypress/integration/login_spec.js
describe('Página de Login', () => {
    it('deve exibir a tela de login e permitir navegação para o cadastro', () => {
        cy.visit('https://backchat.jeanhenrique.site/hatbot.jeanhenrique.site/login');
        cy.contains('Login');
        cy.get('a[href="/register"]').click();
        cy.url().should('include', '/register');
    });
});
