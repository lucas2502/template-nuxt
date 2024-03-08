import { quasar } from '@quasar/vite-plugin';
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);
import { fileURLToPath } from 'url';
import { join, dirname } from 'pathe';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    ],
    [
      '@sidebase/nuxt-auth',
      {
        provider: {
          type: 'authjs'
        },
        globalAppMiddleware: true
      }
    ]
  ],
  css: [
    '@quasar/extras/roboto-font/roboto-font.css',
    '@quasar/extras/material-icons/material-icons.css',
    join(__dirname, 'assets/styles/quasar.sass')
  ],
  vite: {
    // define: {
    //   __QUASAR_SSR__: true,
    //   __QUASAR_SSR_SERVER__: true
    // },
    plugins: [
      // vue({ // template: { transformAssetUrls }, // }),
      quasar({
        sassVariables: resolve('assets/styles/quasar.variables.sass')
      }) as Plugin
    ]
  },
  build: {
    transpile: ['quasar']
  },
  runtimeConfig: {
    public: {
      api: {
        apiBaseUrl: process.env.API_BASE_URL || '',
        isMockActive: process.env.IS_MOCK_ACTIVE === 'true'
      },
      authJs: {
        baseUrl: process.env.NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true // whether to hit the /auth/session endpoint on every client request
      }
    },
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET // You can generate one with `openssl rand -base64 32`
    },
    keycloak: {
      clientId: process.env.NUXT_KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.NUXT_KEYCLOAK_CLIENT_SECRET,
      host: process.env.NUXT_KEYCLOAK_HOST,
      realm: process.env.NUXT_KEYCLOAK_REALM
    }
  },
  auth: {
    // baseUrl:  process.env.AUTH_ORIGIN,
    computed: {
      origin: process.env.AUTH_ORIGIN
      // pathname: '/api/auth',
      // fullBaseUrl: process.env.AUTH_ORIGIN + "/api/auth",
    },
    provider: {
      type: 'authjs',
      // Select the default-provider to use when `signIn` is called. Setting this here will also effect the global middleware behavior: E.g., when you set it to `github` and the user is unauthorized, they will be directly forwarded to the Github OAuth page instead of seeing the app-login page
      defaultProvider: 'keycloak'
      // signinUrl: 'test'
    },
    // pathname: '/api/auth',
    // The module is enabled. Change this to disable the module
    isEnabled: true,
    // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
    origin: process.env.AUTH_ORIGIN,
    // The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
    // basePath: '/api/auth',
    // Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
    enableSessionRefreshPeriodically: false,
    // Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
    enableSessionRefreshOnWindowFocus: false,
    // Whether to add a global authentication middleware that will protect all pages without exclusion
    globalAppMiddleware: true,
    // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path.
    addDefaultCallbackUrl: false,
    // Configuration of the global auth-middleware (only applies if you set `globalAppMiddleware: true` above!)
    globalMiddlewareOptions: {
      // Whether to allow access to 404 pages without authentication. Set this to `false` to force users to sign-in before seeing `404` pages. Setting this to false may lead to vue-router problems (as the target page does not exist)
      allow404WithoutAuth: true,
      // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path. Note: You also need to set the global `addDefaultCallbackUrl` setting to `false` if you want to fully disable this for the global middleware.
      addDefaultCallbackUrl: false
    }
  }
});
