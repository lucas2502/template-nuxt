import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],

    test: {
        reporters: ['verbose'],
        include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        globals: true,
        environment: 'jsdom'
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
            '@': path.resolve(__dirname, './src')
            // '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts')
        }
    }
});
