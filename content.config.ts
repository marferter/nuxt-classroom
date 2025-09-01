import { defineContentConfig, defineCollection, z } from '@nuxt/content'


export default defineContentConfig({

  collections: {
    lessons: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        rawbody: z.string()
      })
    }),

    activities : defineCollection({
      type: 'data',
      source: '3.activities/*.json',
      schema: z.object ({
        uuid: z.string(),
        lessonId: z.string(),
        activityTitle: z.string(),
        activityType: z.string(),
        body: z.any()
      })
    })
  }
})
