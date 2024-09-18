declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            resetDB(): Chainable;
            seedDB(seedData: any): Chainable;

            /* login(): Chainable;
            getByData(selector: string): Chainable; */
        }
    }
}

export {};
