// import { createResolver } from '@nuxt/kit';
// const { resolve } = createResolver(import.meta.url);
// import { fileURLToPath } from 'url';
// import { dirname } from 'pathe';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    ['@pinia/nuxt', {}],
    [
      '@nuxtjs/i18n',
      {
        vueI18n: './i18n.config.ts'
      }
    ]
  ],
  runtimeConfig: {
    public: {
      api: {
        apiBaseUrl: process.env.API_BASE_URL || '',
        isMockActive: process.env.IS_MOCK_ACTIVE === 'true'
      }
    }
  }
});
