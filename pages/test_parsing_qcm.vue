<script setup>
const mdString = `
* ++ Option correcte /// Ceci est l'explication.
* Option fausse
* ++ Avec code

    console.log("test")
* Option sans explication
* Option avec explication /// Explication séparée.
`
//fonctions écrites par Copilot : https://github.com/copilot/share/c8790194-4900-8810-8943-de096011601c

// 1. Extraction des items markdown avec contenu imbriqué
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

// 2. Parsing ++ et mapping vers objet { mcqOption, isCorrect }
function parseItemsWithPlusPlus(items) {
  return items.map(md => {
    const lines = md.split('\n')
    const firstLineIdx = lines.findIndex(line => line.trim().length > 0)
    let isCorrect = false
    if (firstLineIdx !== -1) {
      const firstLine = lines[firstLineIdx]
      const match = firstLine.match(/^(\s*[*-]\s*)(\+\+\s*)?(.*)$/)
      if (match) {
        isCorrect = !!match[2]
        lines[firstLineIdx] = match[1] + match[3]
      }
    }
    const cleaned = lines.map((line, idx) =>
      idx === firstLineIdx
        ? line.replace(/^\s*[*-]\s*/, '').trim()
        : line
    ).join('\n').trim()
    return { mcqOption: cleaned, isCorrect }
  })
}

// 3. Parsing de l’explication (///) et mapping final
function parseItemsWithExplanation(items) {
  return items.map(({ mcqOption, isCorrect }) => {
    const parts = mcqOption.split('///')
    return {
      mcqOption: parts[0].trim(),
      isCorrect,
      explanation: parts[1] ? parts[1].trim() : ''
    }
  })
}

const rawItems = extractMarkdownListItems(mdString)
const parsedPlus = parseItemsWithPlusPlus(rawItems)
const parsedFull = parseItemsWithExplanation(parsedPlus)
</script>

<template>
  <div>
    <h2>Options analysées :</h2>
    <ul>
      <li v-for="(item, i) in parsedFull" :key="i">
        <strong :style="{color: item.isCorrect ? 'green' : 'red'}">
          {{ item.isCorrect ? '✔' : '✖' }}
        </strong>
        <pre>{{ item.mcqOption }}</pre>
        <span v-if="item.explanation">
          <em> Explication : {{ item.explanation }}</em>
        </span>
      </li>
    </ul>
    <h3>Objet JS résultant :</h3>
    <pre>{{ parsedFull }}</pre>
  </div>



</template>