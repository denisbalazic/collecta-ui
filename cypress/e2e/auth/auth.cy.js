/// <reference types="cypress" />

import {unregisteredUserDto, verifiedUser} from '../../support/seed';

describe('Auth spec', () => {
    before(() => {
        cy.task('resetDb');
        cy.task('seedDb');
    });

    beforeEach(() => {
        cy.viewport(1200, 800);
        cy.clearLocalStorage();
    });

    it('displays register form', () => {
        cy.visit('/register');

        cy.getByTestId('register-form').should('be.visible');
        cy.getByTestId('register-name').should('be.visible');
        cy.getByTestId('register-email').should('be.visible');
        cy.getByTestId('register-password').should('be.visible');
        cy.getByTestId('register-confirmedPassword').should('be.visible');
        cy.getByTestId('register-termsConfirmed').should('be.visible');
        cy.getByTestId('form-submit').should('be.visible');
    });

    it('disables submit of registration if all fields are not filled', () => {
        cy.visit('/register');

        cy.getByTestId('register-name').should('be.visible');
        cy.getByTestId('register-email').should('be.visible');
        cy.getByTestId('register-form').getByTestId('form-submit').should('be.disabled');
    });

    it('displays error message if client validation fails', () => {
        const invalidRegisterDtos = [
            {...unregisteredUserDto, name: 'J', testId: 'register-name'},
            {...unregisteredUserDto, name: '    J    ', testId: 'register-name'},
            {...unregisteredUserDto, email: 'wrong@email', testId: 'register-email'},
            {...unregisteredUserDto, password: 'Short1!', confirmedPassword: 'Short1!', testId: 'register-password'},
            {
                ...unregisteredUserDto,
                password: 'lowercase1!',
                confirmedPassword: 'lowercase1!',
                testId: 'register-password',
            },
            {
                ...unregisteredUserDto,
                password: 'Password1!',
                confirmedPassword: 'notSame',
                testId: 'register-confirmedPassword',
            },
            {...unregisteredUserDto, termsConfirmed: false, testId: 'register-termsConfirmed'},
        ];

        invalidRegisterDtos.forEach((dto) => {
            cy.visit('/register');
            cy.getByTestId('register-name').type(dto.name);
            cy.getByTestId('register-email').type(dto.email);
            cy.getByTestId('register-password').type(dto.password);
            cy.getByTestId('register-confirmedPassword').type(dto.confirmedPassword);
            if (!dto.termsConfirmed) cy.getByTestId('register-termsConfirmed').uncheck();

            cy.getByTestId('register-form').getByTestId('form-submit').click();

            cy.getByTestId(`${dto.testId}--error`).should('be.visible');
        });
    });

    it('displays error message if server validation fails', () => {
        const invalidRegisterDtos = [
            // {...unregisteredUserDto, name: verifiedUser.name, testId: 'register-name'},
            {...unregisteredUserDto, email: verifiedUser.email, testId: 'register-email'},
        ];
        invalidRegisterDtos.forEach((dto) => {
            cy.visit('/register');
            cy.getByTestId('register-name').type(dto.name);
            cy.getByTestId('register-email').type(dto.email);
            cy.getByTestId('register-password').type(dto.password);
            cy.getByTestId('register-confirmedPassword').type(dto.confirmedPassword);
            cy.getByTestId('register-termsConfirmed').uncheck();

            cy.getByTestId('register-form').getByTestId('form-submit').click();

            cy.getByTestId(`${dto.testId}--error`).should('be.visible');
        });
    });

    it('registers a new user', () => {
        cy.visit('/register');
        cy.getByTestId('register-name').type(unregisteredUserDto.name);
        cy.getByTestId('register-email').type(unregisteredUserDto.email);
        cy.getByTestId('register-password').type(unregisteredUserDto.password);
        cy.getByTestId('register-confirmedPassword').type(unregisteredUserDto.confirmedPassword);
        cy.getByTestId('register-termsConfirmed').check();
        cy.getByTestId('register-form').getByTestId('form-submit').click();

        cy.getByTestId('register-successMsg').should('be.visible');
    });
});
