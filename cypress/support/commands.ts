/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import {verifiedUserCredentials} from './seed';
import {AuthCredentials} from '../../src/components/views/auth/Login';
import {RegisterUserDto} from '../../src/components/views/auth/Register';

Cypress.Commands.add('getByTestId', (id) => {
    cy.get(`[data-test=${id}]`);
});

Cypress.Commands.add('fillRegisterFormAndSubmit', (dto: RegisterUserDto) => {
    cy.visit('/register');

    cy.getByTestId('register-name').type(dto.name);
    cy.getByTestId('register-email').type(dto.email);
    cy.getByTestId('register-password').type(dto.password);
    cy.getByTestId('register-confirmedPassword').type(dto.confirmedPassword);
    cy.getByTestId('register-termsConfirmed')[dto.termsConfirmed ? 'check' : 'uncheck']();

    cy.getByTestId('register-form').getByTestId('form-submit').click();
});

Cypress.Commands.add('login', (credentials: AuthCredentials = verifiedUserCredentials) => {
    cy.intercept('POST', '/auth/login').as('loginRequest');
    cy.visit('/login');
    cy.getByTestId('login-email').type(credentials.email);
    cy.getByTestId('login-password').type(credentials.password);
    cy.getByTestId('login-form').getByTestId('form-submit').click();

    cy.wait('@loginRequest').then((interception) => {
        // eslint-disable-next-line no-unused-expressions
        expect(interception.response).to.not.be.null;
    });
});

Cypress.Commands.add('getLocalStorageItem', (key) =>
    cy.getAllLocalStorage().then((result) => {
        return result?.[Cypress.env('baseUrl')]?.[key] || null;
    })
);

export {};
