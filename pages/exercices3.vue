<script setup>
const mdString = `
* Première puce avec \`du code inline\`
  Et un paragraphe supplémentaire.

    console.log("du code bloc indenté")
* Deuxième puce simple
`
// Fonction robuste pour extraire les items de liste markdown avec contenu associé
function extractMarkdownListItems(md) {
  const lines = md.split('\n')
  const items = []
  let currentItem = null

  for (const line of lines) {
    // Nouvelle puce de premier niveau ?
    if (/^\s*[*-]\s+/.test(line)) {
      if (currentItem !== null) {
        items.push(currentItem.trimEnd())
      }
      currentItem = line.trimEnd()
    }
    // Ligne indentée (code, paragraphe, etc.) ou vide : fait partie de la puce précédente
    else if (currentItem !== null && (/^\s{2,}/.test(line) || line === '')) {
      currentItem += '\n' + line
    }
    // Sinon, on ignore (hors liste)
  }
  // Ajouter la dernière puce si besoin
  if (currentItem !== null) {
    items.push(currentItem.trimEnd())
  }
  return items
}

const items = extractMarkdownListItems(mdString)
</script>

<template>
  <div v-for="item in items" :key="item">
    <pre>{{ item }}</pre>
    <MDC :value="item" />
  </div>
</template>