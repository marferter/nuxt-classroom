import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        }
      }
    }
  },
  modules: ['@nuxt/ui-pro', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['primary','neutral','error']
    }
  }
})