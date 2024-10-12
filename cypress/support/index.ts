import {AuthCredentials} from '../../src/components/views/auth/Login';
import {RegisterUserDto} from '../../src/components/views/auth/Register';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            getByTestId(selector: string): Chainable;
            fillRegisterFormAndSubmit(dto: RegisterUserDto): Chainable;
            login(credentials?: AuthCredentials): Chainable;
            getLocalStorageItem(key: string): Chainable;
        }
    }
}

export {};
