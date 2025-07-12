import { defineNuxtConfig } from 'nuxt/config'
import { createDirectus, rest, createItems } from '@directus/sdk';

const client = createDirectus('https://directus.apps.21-learning.com/').with(rest());

//Token d'API admin (stocke-le dans une variable d'env sécurisée !)
//const TOKEN = process.env.DIRECTUS_TOKEN;


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  hooks: {
    'content:file:beforeParse'(ctx) {
        // console.log(ctx)
    },
    'content:file:afterParse': async (ctx) => {
        //console.dir("résultat du parsing")
        //console.dir(ctx.content.body.value, {depth: null})

        const { content } = ctx
        //console.dir(ctx.content.body.value[0], {depth: 0})
      
        const uuids = []

        for (const block of content.body.value) {
          const tag = block[0]
          const props = block[1]
          if (
            typeof tag === 'string' && 
            tag.startsWith('activity') &&
            typeof props.uuid === 'string'){
            //console.dir(tag)
            //console.dir(props.uuid)
            uuids.push(props.uuid)
          }
        
          console.dir(uuids)

        if (uuids.length > 0) {
        const items = uuids.map((uuid) => ({
          id: uuid,
        }));

        console.dir(items)

        try {
          // Authentification
          //await client.auth.static(TOKEN);

          await client.request(createItems('activities_test_a', items));
        } catch (e) {
          console.error('Erreur lors de la création dans Directus:', e);
        }
      }

        }

        //console.dir(uuids)

        
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
        url: 'https://directus.apps.21-learning.com/'
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