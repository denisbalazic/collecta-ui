import {defineConfig} from 'cypress';
import * as dotenv from 'dotenv';
import pluginFunction from './cypress/plugins';

dotenv.config();

export default defineConfig({
    e2e: {
        setupNodeEvents: async (on, config) => {
            await pluginFunction(on);
            return config;
        },
        baseUrl: process.env.BASE_URL,
    },
});
