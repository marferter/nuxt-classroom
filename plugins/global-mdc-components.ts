import ActivityMcq from '~/components/content/ActivityMcq.vue'
import ActivityMcqU from '~/components/content/ActivityMcqU.vue'
import ActivityShortAnswer from '~/components/content/ActivityShortAnswer.vue'
import ActivityWtp from '~/components/content/ActivityWtp.vue'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('ActivityMcq', ActivityMcq)
  nuxtApp.vueApp.component('activity-mcq', ActivityMcq)
  nuxtApp.vueApp.component('ActivityMcqU', ActivityMcqU)
  nuxtApp.vueApp.component('activity-mcq-u', ActivityMcqU)
  nuxtApp.vueApp.component('ActivityShortAnswer', ActivityShortAnswer)
  nuxtApp.vueApp.component('activity-short-answer', ActivityShortAnswer)
  nuxtApp.vueApp.component('ActivityWtp', ActivityWtp)
  nuxtApp.vueApp.component('activity-wtp', ActivityWtp)
})