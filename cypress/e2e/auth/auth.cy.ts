/// <reference types="cypress" />

import {recurse} from 'cypress-recurse';
import {
    unregisteredUserDto,
    unregisteredUserDto2,
    unverifiedUserCredentials,
    unverifiedUserDto,
    verifiedUserDto,
} from '../../support/seed';
import {RegisterUserDto} from '../../../src/components/views/auth/Register';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../../src/service/auth.service';

describe('Auth spec', () => {
    before(() => {
        cy.task('seedDb');
    });

    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    const protectedRoute = '/collections/new';

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

    it('displays error message if user is already registered', () => {
        fillRegisterFormAndSubmit(verifiedUserDto);

        cy.getByTestId(`register-userExistsError`).should('be.visible').and('include.text', verifiedUserDto.email);
        cy.get('a[href="/login"]').should('exist');
        cy.get('a[href="/forgot-password"]').should('exist');
    });

    it('displays error message if user is registered, but not verified', () => {
        fillRegisterFormAndSubmit(unverifiedUserDto);

        cy.getByTestId(`auth-userIsNotVerifiedError`).should('be.visible').and('include.text', unverifiedUserDto.email);
        cy.getByTestId('resend-verification-email').should('exist');
    });

    it('registers a new user and sends verification mail with valid link', () => {
        const timestampFrom = new Date().getTime();
        fillRegisterFormAndSubmit(unregisteredUserDto);

        cy.getByTestId('register-successMsg').should('be.visible').and('include.text', unregisteredUserDto.email);
        cy.getByTestId('resend-verification-email').should('exist');

        recurse(
            () => cy.task('getLastTaggedEmail', {email: unregisteredUserDto.email, timestampFrom}),
            Cypress._.isObject,
            {
                timeout: 30000,
                delay: 5000,
            }
        )
            .its('body')
            .then((body) => {
                cy.document({log: false}).invoke({log: false}, 'write', body);

                cy.contains(unregisteredUserDto.name).should('be.visible');
                cy.contains('Confirm Email').should('be.visible');

                cy.contains('Confirm Email').click();

                cy.location('pathname').should('contain', '/verify-email');
                cy.location('pathname').should('eq', '/login');
                cy.getByTestId('login-form').should('be.visible');
            });
    });

    it('tries to login; displays error message if user is not verified', () => {
        cy.login(unverifiedUserCredentials);

        cy.getByTestId(`auth-userIsNotVerifiedError`).should('exist').and('be.visible');
        // .and('include.text', unverifiedUserCredentials.email);
        // cy.getByTestId('resend-verification-email').should('exist');
    });

    it('tries to login; displays error message if user is not registered', () => {
        cy.login(unregisteredUserDto2);

        cy.getByTestId('login-error').should('be.visible').and('include.text', 'Wrong credentials');
    });

    it('tries to login more than 5 times in 5 minutes with wrong credentials', () => {
        cy.intercept('POST', '/auth/login').as('loginRequest');
        const wrongCredentials = {email: verifiedUserDto.email, password: 'wrongPassword'};

        for (let i = 0; i < 5; i++) {
            cy.login(wrongCredentials);

            cy.wait('@loginRequest').then((interception) => {
                expect(interception.response?.statusCode).to.eq(401);
            });
        }

        cy.login(wrongCredentials);
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response?.statusCode).to.eq(429);
            cy.getByTestId('login-error').should('be.visible').and('include.text', 'Too many failed login attempts');
        });
    });

    // TODO: doesnt work because of previous test: logged in too many times :/
    it.only('logs in a user with valid credentials', () => {
        cy.intercept('POST', '/auth/login').as('loginRequest');
        cy.visit('/login');

        cy.getByTestId('login-form').should('be.visible');
        cy.getByTestId('login-email').type(verifiedUserDto.email);
        cy.getByTestId('login-password').type(verifiedUserDto.password);
        cy.getByTestId('login-form').getByTestId('form-submit').click();

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response?.body.data).to.have.property('accessToken');
            expect(interception.response?.body.data).to.have.property('refreshToken');
            cy.getLocalStorageItem(ACCESS_TOKEN).should('eq', interception.response?.body.data.accessToken);
            cy.getLocalStorageItem(REFRESH_TOKEN).should('eq', interception.response?.body.data.refreshToken);
        });

        cy.location('pathname').should('eq', '/collections');
        cy.getByTestId('logout-button').should('be.visible');

        cy.visit(protectedRoute);
        cy.location('pathname').should('eq', protectedRoute);
    });

    it('logs out a user', () => {
        cy.intercept('POST', '/auth/logout').as('logoutRequest');
        cy.login();

        cy.getByTestId('logout-button').click();

        cy.wait('@logoutRequest').then((interception) => {
            expect(interception.response?.statusCode).to.eq(200);
            cy.getLocalStorageItem(ACCESS_TOKEN).should('be.null');
            cy.getLocalStorageItem(REFRESH_TOKEN).should('be.null');
            cy.location('pathname').should('eq', '/about');
        });

        cy.visit(protectedRoute);
        cy.location('pathname').should('eq', '/login');
    });

    it('can not access protected route when not logged in', () => {
        cy.visit(protectedRoute);

        cy.location('pathname').should('eq', '/login');
    });

    it('can not access login page when logged in', () => {
        cy.login();

        cy.visit('/login');
        cy.location('pathname').should('eq', '/collections');
    });

    // TODO: Not finished!!!!!
    it.skip('resets password', () => {
        cy.visit('/forgot-password');

        cy.getByTestId('forgot-password-form').should('be.visible');
        cy.getByTestId('forgot-password-email').type(verifiedUserDto.email);
        cy.getByTestId('forgot-password-form').getByTestId('form-submit').click();

        cy.getByTestId('forgot-password-successMsg').should('be.visible').and('include.text', verifiedUserDto.email);

        recurse(() => cy.task('getTaggedEmail', verifiedUserDto.email), Cypress._.isObject, {
            timeout: 300000,
            delay: 5000,
        })
            .its('body')
            .then((body) => {
                cy.document({log: false}).invoke({log: false}, 'write', body);

                cy.contains('Reset Password').should('be.visible');

                cy.contains('Reset Password').click();

                cy.location('pathname').should('contain', '/reset-password');
                cy.getByTestId('reset-password-form').should('be.visible');
            });
    });
});
