import { defineNuxtPlugin } from '#app'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default defineNuxtPlugin((nuxtApp) => {
  // 1. Créer l'instance sans highlight
  const md = new MarkdownIt()

  // 2. Ajouter la fonction highlight proprement
  md.set({
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`
        } catch (_) {}
      }
      // Ici, on peut utiliser md.utils car l'instance existe déjà
      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    }
  })

  nuxtApp.provide('md', md)
})