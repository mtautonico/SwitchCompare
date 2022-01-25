import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';

const production = process.env.NODE_ENV === 'production';
const sourceMapsInProduction = false;
const config = defineConfig({
    logLevel: production ? 'error' : 'info',
    plugins: [
        svelte({
            emitCss: production,
            compilerOptions: {
                dev: !production,
            },

            // @ts-ignore This is temporary until the type definitions are fixed!
            hot: !production
        })
    ],
    server: {
        host: 'localhost',
        port: 5000,
        proxy: {
            '/api': {
                target: 'http://localhost:8000/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/media': {
                target: 'http://localhost:8000/media',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/media/, '')
            },
        },
        fs: {
            allow: ["..", "src"]
        }
    },
    build: {
        sourcemap: sourceMapsInProduction,
    },
});

export default config;