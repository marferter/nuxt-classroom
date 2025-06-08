<script setup>
// --- Fonction pour extraire ++ et retourner un array d'objets ---
function parseItemsWithPlusPlus(items) {
  return items.map(md => {
    // Récupère la première ligne non vide
    const lines = md.split('\n')
    const firstLineIdx = lines.findIndex(line => line.trim().length > 0)
    let correct = false

    if (firstLineIdx !== -1) {
      // Détecte la puce + option ++
      const firstLine = lines[firstLineIdx]
      const match = firstLine.match(/^(\s*[*-]\s*)(\+\+\s*)?(.*)$/)
      if (match) {
        correct = !!match[2]
        // Reconstruit la première ligne sans "++"
        lines[firstLineIdx] = match[1] + match[3]
      }
    }

    // Nettoie la puce sur la première ligne, trim chaque ligne
    const cleaned = lines.map((line, idx) =>
      idx === firstLineIdx
        ? line.replace(/^\s*[*-]\s*/, '').trim()
        : line
    ).join('\n').trim()

    return { text: cleaned, correct }
  })
}

// --- Données de test markdown ---
const mdString = `
* ++ Première option correcte
  Paragraphe explicatif.

    console.log("du code")
* Deuxième option erronée
* ++ Troisième bonne option
* Option normale
`

// --- Utilisation avec ta fonction d'extraction markdown précédente ---
function extractMarkdownListItems(md) {
  const lines = md.split('\n')
  const items = []
  let currentItem = null

  for (const line of lines) {
    if (/^\s*[*-]\s+/.test(line)) {
      if (currentItem !== null) items.push(currentItem.trimEnd())
      currentItem = line.trimEnd()
    } else if (currentItem !== null && (/^\s{2,}/.test(line) || line === '')) {
      currentItem += '\n' + line
    }
  }
  if (currentItem !== null) items.push(currentItem.trimEnd())
  return items
}

const rawItems = extractMarkdownListItems(mdString)
const parsedItems = parseItemsWithPlusPlus(rawItems)
</script>

<template>
  <div>
    <h2>Options extraites :</h2>
    <ul>
      <li v-for="(item, i) in parsedItems" :key="i">
        <pre>{{ item.text }}</pre>
        <span v-if="item.correct" style="color: green; font-weight: bold;">(correcte)</span>
        <span v-else style="color: red;">(fausse)</span>
      </li>
    </ul>
    <h3>Objet JS résultant :</h3>
    <pre>{{ parsedItems }}</pre>
  </div>
</template>