declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            login(): Chainable;
            /* loginAdmin(): Chainable;
            getByData(selector: string): Chainable; */
        }
    }
}

export {};
