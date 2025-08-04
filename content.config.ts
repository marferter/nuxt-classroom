import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import type Questions from './pages/questions.vue'

export default defineContentConfig({

  collections: {
    content: defineCollection({
      type: 'page',
      source: 'test/*.md'
    }),

    questions: defineCollection({
      type: 'page',
      source: 'questions/*.md'
    }),


    /* activity: defineCollection({
        source: ,
        type:'data',
        schema:
    
    })
    */
  }
})
