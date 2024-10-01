import {getLastTaggedEmail} from './testEmail';
import {resetDb, seedDb} from './database';

const pluginFunction = async (on: Cypress.PluginEvents): Promise<void> => {
    on('task', {
        resetDb,
        seedDb,
        getLastTaggedEmail,
    });
};

export default pluginFunction;
