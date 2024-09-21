import {defineConfig} from 'cypress';
import * as dotenv from 'dotenv';
import pluginFunction from './cypress/plugins';

dotenv.config();

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            pluginFunction(on);
            return config;
        },
        baseUrl: process.env.BASE_URL,
    },
});
