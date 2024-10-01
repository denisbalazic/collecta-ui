import {AuthCredentials} from '../../src/components/views/auth/Login';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            getByTestId(selector: string): Chainable;
            login(credentials?: AuthCredentials): Chainable;
            getLocalStorageItem(key: string): Chainable;
        }
    }
}

export {};
