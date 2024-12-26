// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  srcDir: 'app/',
  app: {
    keepalive: true,
    rootTag: 'body',
  },
  modules: [
    '@vueuse/nuxt',
    'nuxt-api-shield',
    'nuxt-csurf',
    'nitro-cloudflare-dev',
  ],
})
