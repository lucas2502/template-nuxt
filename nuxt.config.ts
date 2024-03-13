// import { createResolver } from '@nuxt/kit';
// const { resolve } = createResolver(import.meta.url);
// import { fileURLToPath } from 'url';
// import { dirname } from 'pathe';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  telemetry: false,
  srcDir: 'src/',
  modules: [
    ['@pinia/nuxt', {}],
    [
      '@nuxtjs/i18n',
      {
        vueI18n: './i18n.config.ts'
      }
    ],
    ['@nuxt/test-utils/module', {}]
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('ff-')
    }
  },

  runtimeConfig: {
    public: {
      api: {
        apiBaseUrl: process.env.API_BASE_URL || '',
        isMockActive: process.env.IS_MOCK_ACTIVE === 'true'
      }
    }
  }
});
