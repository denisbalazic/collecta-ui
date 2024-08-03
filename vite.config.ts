import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        macrosPlugin(),
        svgrPlugin({
            // https://react-svgr.com/docs/options/
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    build: {
        outDir: 'build',
    },
    server: {
        host: '0.0.0.0',
        port: 3001,
    },
});
