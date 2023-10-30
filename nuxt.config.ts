import { resolve } from 'path'
export default defineNuxtConfig({
  extends: '@nuxt/ui-pro',
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/fontaine',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    'nuxt-og-image',
  ],
  app: {
    head: {
      script: [
        { src: '//cdnjs.cloudflare.com/ajax/libs/lottie-web/5.8.1/lottie.min.js' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      appEnv: process.env.APP_ENV || 'localhost',
    },
  },

  content: {
    navigation: {
      fields: ['resource', 'method'],
    },
    sources: {
      changelog: {
        driver: 'fs',
        base: resolve(__dirname, 'changelog'),
        prefix: '/changelog',
    }
    },
  },
  colorMode: {
    preference: 'dark',
  },
  ui: {
    icons: ['heroicons', 'simple-icons', 'ep', 'mdi'],
  },
  nitro: {
    prerender: {
      concurrency: 1,
      routes: ['/api/search.json'],
    }
  },
  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // Adding all global components to the main entry
    // To avoid lagging during page navigation on client-side
    // Downside: bigger JS bundle
    // With sync: 465KB, gzip: 204KB
    // Without: 418KB, gzip: 184KB
    'components:extend' (components) {
      for (const comp of components) {
        if (comp.global) {
          comp.global = 'sync'
        }
      }
    }
  }
})
