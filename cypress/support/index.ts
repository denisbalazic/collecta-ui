declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            getByTestId(selector: string): Chainable;
            /* login(): Chainable; */
        }
    }
}

export {};
