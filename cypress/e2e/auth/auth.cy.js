/// <reference types="cypress" />

describe('Auth spec', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
        cy.clearLocalStorage();
    });

    it('displays register form', () => {
        cy.visit('/register');
        cy.get('[data-testid=register-form]').should('be.visible');
    });

    it('registers a new user', () => {
        cy.visit('/register');
        cy.get('[data-testid=register-form]').should('be.visible');
        cy.get('[data-testid=register-form] input[name=name]').type('Jess E. Pinkman');
        cy.get('[data-testid=register-form] input[name=email]').type('jess@test.eu');
        cy.get('[data-testid=register-form] input[name=password]').type('Password1!');
        cy.get('[data-testid=register-form] input[name=confirmedPassword]').type('Password1!');
        cy.get('[data-testid=register-form] input[type=checkbox]').check();
        cy.get('[data-testid=register-form] button[type=submit]').click();
        cy.get('[data-testid=register-success]').should('be.visible');
    });
});
