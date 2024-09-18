/// <reference types="cypress" />

describe('Auth spec', () => {
    before(() => {
        cy.resetDB();
    });

    beforeEach(() => {
        cy.viewport(1200, 800);
        cy.clearLocalStorage();
    });

    it('displays register form', () => {
        cy.visit('/register');
        cy.get('[data-testid=register-form]').should('be.visible');
        cy.get('[data-testid=register-form] input[name=name]').should('be.visible');
        cy.get('[data-testid=register-form] input[name=email]').should('be.visible');
        cy.get('[data-testid=register-form] input[name=password]').should('be.visible');
        cy.get('[data-testid=register-form] input[name=confirmedPassword]').should('be.visible');
        cy.get('[data-testid=register-form] input[name=termsConfirmed]').should('be.visible');
        cy.get('[data-testid=register-form] button[type=submit]').should('be.disabled');
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

    it('disables submit on registration if all fields are not filled', () => {
        cy.visit('/register');
        cy.get('[data-testid=register-form]').should('be.visible');
        cy.get('[data-testid=register-form] input[name=name]').type('Jess E. Pinkman');
        cy.get('[data-testid=register-form] input[name=email]').type('jess@test.eu');
        cy.get('[data-testid=register-form] button[type=submit]').should('be.disabled');
    });
});
