<script setup>
import hljs from 'highlight.js'
import { onMounted, ref } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'python' }
})

const highlightedCode = ref('')

const codeEl = ref(null)

onMounted(() => {
  hljs.highlightElement(codeEl.value)
})

</script>

<template>
  <pre><code ref="codeEl" :class="`language-${language}`">{{ code }}</code></pre>
</template>
