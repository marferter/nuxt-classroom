import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  hooks: {
    'content:file:beforeParse'(ctx) {
        // console.log(ctx)
    },
    'content:file:afterParse'(ctx) {
        console.dir(ctx, {depth: null})
    },
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
        highlight: {

          // Theme used in all color schemes.
          //theme: 'github-light',
          // OR
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          },
          langs: [
            'python',
            'javascript'
          ],
        }
      },
    }
  },
  modules: ['@nuxt/ui-pro', '@nuxt/content', 'nuxt-directus'],
  runtimeConfig: {
    public: {
      directus: {
        url: 'https://classroom-directus.jcloud.ik-server.com/'
      }
    }
  },
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['primary', 'neutral', 'error']
    }
  }
})