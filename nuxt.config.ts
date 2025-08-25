import { defineNuxtConfig } from 'nuxt/config'
import { extractActivities} from './scripts/extractActivities'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  hooks: {
    'content:file:afterParse': async (ctx) => {
      console.log('HOOK called for:', ctx.file?.path)
      const fileId = ctx.file?.id ?? ctx.file?.path ?? 'inconnu'
      if (!ctx.file?.path?.includes('/2.demo/') && !ctx.file?.path?.includes('/1.cours/')) {
        console.log('HOOK skipped for:', ctx.file?.path)
        return
      }
      const ast = Array.isArray(ctx.content.body?.value) ? ctx.content.body.value : []
      await extractActivities(ast, fileId)
      console.log('HOOK extractActivities done for:', fileId)
    }
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

  mdc: {
    components: {
      map: {
        ActivityMcq: 'ActivityMcq',
        'activity-mcq': 'ActivityMcq',
        ActivityMcqU: 'ActivityMcqU',
        'activity-mcq-u': 'ActivityMcqU',
        ActivityShortAnswer: 'ActivityShortAnswer',
        'activity-short-answer': 'ActivityShortAnswer',
        ActivityWtp: 'ActivityWtp',
        'activity-wtp': 'ActivityWtp'
      }
    },
    highlight: {
      theme: 'material-theme-palenight'
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

function createShikiHighlighter(arg0: {
  bundledThemes: { 'material-theme-palenight': any }
  // Configure the bundled languages
  bundledLangs: { html: any; mdc: any; vue: any; yml: any; scss: any; ts: any; typescript: any }
}) {
  throw new Error('Function not implemented.')
}
