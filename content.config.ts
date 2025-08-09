import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import type Questions from './pages/questions.vue'

export default defineContentConfig({

  collections: {
    content: defineCollection({
      type: 'page',
      source: 'test/*.md'
    }),

    questions: defineCollection({
      type: 'data',
      source: 'questions/*.md',
      schema: z.object({
      })
    }),
  }
})
