import {generateTaggedEmailAddress, getTaggedEmail} from './testEmail';
import {resetDb, seedDb} from './database';

const pluginFunction = async (on: Cypress.PluginEvents): Promise<void> => {
    on('task', {
        resetDb,
        seedDb,
        generateTaggedEmailAddress,
        getTaggedEmail,
    });
};

export default pluginFunction;
