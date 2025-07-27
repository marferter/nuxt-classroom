import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({

  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    }),
    /* activity: defineCollection({
        source: ,
        type:'data',
        schema:
    
    })
    */
  }
})
