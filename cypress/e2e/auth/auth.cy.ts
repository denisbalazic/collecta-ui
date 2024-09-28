/// <reference types="cypress" />

import {recurse} from 'cypress-recurse';
import {unregisteredUserDto, unverifiedUserDto, verifiedUserDto} from '../../support/seed';
import {RegisterUserDto} from '../../../src/components/views/auth/Register';

describe('Auth spec', () => {
    before(() => {
        cy.task('resetDb');
        cy.task('seedDb');
    });

    beforeEach(() => {
        cy.viewport(1200, 800);
        cy.clearLocalStorage();
    });

    const fillRegisterFormAndSubmit = (dto: RegisterUserDto): void => {
        cy.visit('/register');

        cy.getByTestId('register-name').type(dto.name);
        cy.getByTestId('register-email').type(dto.email);
        cy.getByTestId('register-password').type(dto.password);
        cy.getByTestId('register-confirmedPassword').type(dto.confirmedPassword);
        cy.getByTestId('register-termsConfirmed')[dto.termsConfirmed ? 'check' : 'uncheck']();

        cy.getByTestId('register-form').getByTestId('form-submit').click();
    };

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
        // testId is added to identify the input field which will show error message
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
            fillRegisterFormAndSubmit(dto);

            cy.getByTestId(`${dto.testId}--error`).should('be.visible');
        });
    });

    it('displays error message if server validation fails; same name', () => {
        fillRegisterFormAndSubmit({...unregisteredUserDto, name: verifiedUserDto.name});

        cy.getByTestId(`register-name--error`).should('be.visible');
    });

    it('displays message if user is already registered', () => {
        fillRegisterFormAndSubmit(verifiedUserDto);

        cy.getByTestId(`register-userExistsError`).should('be.visible').and('include.text', verifiedUserDto.email);
        cy.get('a[href="/login"]').should('exist');
        cy.get('a[href="/forgot-password"]').should('exist');
    });

    it('displays message if user is registered, but not verified', () => {
        fillRegisterFormAndSubmit(unverifiedUserDto);

        cy.getByTestId(`register-userIsNotVerifiedError`)
            .should('be.visible')
            .and('include.text', unverifiedUserDto.email);
        cy.getByTestId('resend-verification-email').should('exist');
    });

    it('registers a new user', () => {
        cy.task('generateTaggedEmailAddress', 'Unregistered').then((email) => {
            expect(email).to.be.a('string');

            fillRegisterFormAndSubmit({...unregisteredUserDto, email: email as string});

            cy.getByTestId('register-successMsg').should('be.visible').and('include.text', email);

            cy.getByTestId('resend-verification-email').should('exist');

            recurse(() => cy.task('getTaggedEmail', email), Cypress._.isObject, {
                timeout: 300000,
                delay: 5000,
            })
                .its('body')
                .then((body) => {
                    cy.document({log: false}).invoke({log: false}, 'write', body);
                    cy.log('**email has the user name**');

                    cy.contains('Confirm Email').should('be.visible');
                    cy.contains(unregisteredUserDto.name).should('be.visible');
                });
        });
    });
});
