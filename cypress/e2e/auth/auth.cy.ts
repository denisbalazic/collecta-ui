/// <reference types="cypress" />

import {recurse} from 'cypress-recurse';
import {
    unregisteredUserDto,
    unregisteredUserDto2,
    unregisteredUserDto3,
    unverifiedUserCredentials,
    unverifiedUserDto,
    verifiedUser2Dto,
    verifiedUserDto,
} from '../../support/seed';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../../src/service/auth.service';

describe('Auth spec', () => {
    before(() => {
        cy.task('seedDb');
    });

    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    const protectedRoute = '/collections/new';

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

        cy.getByTestId('register-form').should('be.visible');
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
            cy.fillRegisterFormAndSubmit(dto);

            cy.getByTestId(`${dto.testId}--error`).should('be.visible');
        });
    });

    it('displays error message if server validation fails; same name', () => {
        cy.fillRegisterFormAndSubmit({...unregisteredUserDto, name: verifiedUserDto.name});

        cy.getByTestId(`register-name--error`).should('be.visible');
    });

    it('displays error message if user is already registered', () => {
        cy.fillRegisterFormAndSubmit(verifiedUserDto);

        cy.getByTestId(`register-userExistsError`).should('be.visible').and('include.text', verifiedUserDto.email);
        cy.get('a[href="/login"]').should('exist');
        cy.get('a[href="/forgot-password"]').should('exist');
    });

    it('displays error message if user is registered, but not verified', () => {
        cy.fillRegisterFormAndSubmit(unverifiedUserDto);

        cy.getByTestId(`auth-userIsNotVerifiedError`).should('be.visible').and('include.text', unverifiedUserDto.email);
        cy.getByTestId('resend-verification-email').should('exist');
    });

    it('registers a new user and sends verification mail, verifies email and logs in', () => {
        const timestampFrom = new Date().getTime();
        cy.fillRegisterFormAndSubmit(unregisteredUserDto);

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

                cy.location('pathname').should('include', '/verify-email');
                cy.location('pathname').should('eq', '/login');
                cy.getByTestId('login-form').should('be.visible');

                cy.login(unregisteredUserDto);

                cy.location('pathname').should('not.eq', '/login');
            });
    });

    it('resends verification email', () => {
        cy.fillRegisterFormAndSubmit(unregisteredUserDto2);

        cy.getByTestId('register-successMsg').should('be.visible').and('include.text', unregisteredUserDto2.email);
        cy.getByTestId('resend-verification-email').should('exist').click();

        recurse(() => cy.task('getLastTaggedEmail', {email: unregisteredUserDto2.email}), Cypress._.isObject, {
            timeout: 30000,
            delay: 5000,
        })
            .its('body')
            .then((body) => {
                cy.document({log: false}).invoke({log: false}, 'write', body);

                cy.contains(unregisteredUserDto2.name).should('be.visible');
                cy.contains('Confirm Email').should('be.visible');
            });
    });

    it('trying to verify with invalid token', () => {
        cy.visit('/verify-email/invalidToken');

        cy.getByTestId('verify-email-error').should('be.visible');
        cy.get('a[href="/register"]').should('exist');
    });

    it('tries to login; displays error message if user is not verified', () => {
        cy.login(unverifiedUserCredentials);

        cy.getByTestId(`auth-userIsNotVerifiedError`)
            .should('exist')
            .and('be.visible')
            .and('include.text', unverifiedUserCredentials.email);
        cy.getByTestId('resend-verification-email').should('exist');
    });

    it('tries to login; displays error message if user is not registered', () => {
        cy.login(unregisteredUserDto3);

        cy.getByTestId('login-error').should('be.visible').and('include.text', 'Wrong credentials');
    });

    it('tries to login more than 5 times in 5 minutes with wrong credentials', () => {
        cy.intercept('POST', '/auth/login').as('loginRequest');
        // verifiedUser2Dto is used only here to avoid locking the verified user
        const wrongCredentials = {email: verifiedUser2Dto.email, password: 'wrongPassword'};

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

    it('logs in a user with valid credentials', () => {
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
        cy.getByTestId('profile-button').should('be.visible');

        cy.visit(protectedRoute);
        cy.location('pathname').should('eq', protectedRoute);
    });

    it('logs out a user', () => {
        cy.intercept('POST', '/auth/logout').as('logoutRequest');
        cy.login();

        cy.getByTestId('profile-button').click();
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
        cy.location('pathname').should('not.eq', '/login');
    });

    it('resets password', () => {
        const timestampFrom = new Date().getTime();
        cy.visit('/forgot-password');

        cy.getByTestId('forgot-password-form').should('be.visible');
        cy.getByTestId('forgot-password-email').type(verifiedUserDto.email);
        cy.getByTestId('forgot-password-form').getByTestId('form-submit').click();

        cy.getByTestId('forgot-password-successMsg').should('be.visible').and('include.text', verifiedUserDto.email);

        recurse(
            () => cy.task('getLastTaggedEmail', {email: verifiedUserDto.email, timestampFrom}),
            Cypress._.isObject,
            {
                timeout: 30000,
                delay: 5000,
            }
        )
            .its('body')
            .then((body) => {
                cy.document({log: false}).invoke({log: false}, 'write', body);

                cy.contains(verifiedUserDto.name).should('be.visible');
                cy.contains('Reset password').should('be.visible');
                cy.contains('Reset password').click();

                cy.location('pathname').should('include', '/reset-password');
                cy.getByTestId('reset-password-form').should('be.visible');

                cy.getByTestId('reset-password-password').type('NewPassword1!');
                cy.getByTestId('reset-password-confirmedPassword').type('NewPassword1!');
                cy.getByTestId('reset-password-form').getByTestId('form-submit').click();

                cy.location('pathname').should('eq', '/login');

                cy.login({...verifiedUserDto, password: 'NewPassword1!'});
                cy.location('pathname').should('not.eq', '/login');
            });
    });

    it('tries to reset password with invalid token', () => {
        cy.visit('/reset-password/invalidToken');

        cy.getByTestId('reset-password-form').should('be.visible');
        cy.getByTestId('reset-password-password').type('NewPassword1!');
        cy.getByTestId('reset-password-confirmedPassword').type('NewPassword1!');
        cy.getByTestId('reset-password-form').getByTestId('form-submit').click();

        cy.getByTestId('reset-password-error').should('be.visible');
        cy.get('a[href="/forgot-password"]').should('exist');
    });

    it('changes password', () => {
        cy.login();
        cy.location('pathname').should('eq', '/collections');
        cy.visit('/user');
        cy.location('pathname').should('eq', '/user');

        cy.contains(verifiedUserDto.name).should('be.visible');
        cy.getByTestId('change-password-show').as('changePasswordButton');
        cy.get('@changePasswordButton').should('be.visible').click({force: true});

        cy.getByTestId('change-password-form').should('be.visible');
        cy.getByTestId('change-password-oldPassword').type(verifiedUserDto.password);
        cy.getByTestId('change-password-password').type('NewPassword1!');
        cy.getByTestId('change-password-confirmedPassword').type('NewPassword1!');
        cy.getByTestId('change-password-form').getByTestId('form-submit').click();

        cy.getByTestId('change-password-form').should('not.exist');

        cy.getByTestId('profile-button').click();
        cy.getByTestId('logout-button').click();

        cy.login({...verifiedUserDto, password: 'NewPassword1!'});
        cy.location('pathname').should('not.eq', '/login');
    });
});
