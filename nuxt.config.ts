import { defineNuxtConfig } from 'nuxt/config'
import { extractAndProcessUuids } from './server/utils/content/extract-questions.js'


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  hooks: {
  
  },  
  
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
        highlight: {

          // Theme used in all color schemes.
          theme: 'material-theme-lighter',
          // OR
          // theme: {
          //   // Default theme (same as single string)
          //   default: 'github-light',
          //   // Theme used if `html.dark`
          //   dark: 'github-dark',
          //   // Theme used if `html.sepia`
          //   sepia: 'monokai'
          // },
          langs: [
            'python',
            'javascript'
          ],
        }
      },
    }
  },

  modules: ['@nuxt/ui', '@nuxt/content', 'nuxt-directus'],
  // directus : {
  //   url: 'https://directus.apps.21-learning.com/',
  //   autoFetch: true
  // }
  runtimeConfig: {
    public: {
      directus: {
        url: 'https://directus.apps.21-learning.com/'
      }
    }
  },
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['primary', 'neutral', 'error','success']
    }
  }
})