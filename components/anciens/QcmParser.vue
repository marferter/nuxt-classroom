<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'

const slots = useSlots()

// Fonction pour extraire le texte du slot, même s'il est fragmenté
function getRawSlotText() {
  const vnodes = slots.default ? slots.default() : []
  return vnodes
    .map(vnode => {
      // Si c'est un texte brut
      if (typeof vnode.children === 'string') return vnode.children
      // Si c'est un fragment ou un composant, on ignore ou on gère différemment
      return ''
    })
    .join('')
    .replace(/\r\n/g, '\n') // pour uniformiser les retours à la ligne
    .trim()
}

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


const parsedOptions = computed(() => {
  const md = getRawSlotText()
  const rawItems = extractMarkdownListItems(md)
  const parsedPlus = parseItemsWithPlusPlus(rawItems)
  return parseItemsWithExplanation(parsedPlus)
})

</script>

<template>
  <div>
    <ul>
      <li v-for="(item, i) in parsedOptions" :key="i">
        <strong :style="{color: item.isCorrect ? 'green' : 'red'}">
          {{ item.isCorrect ? '✔' : '✖' }}
        </strong>
        <pre>{{ item.mcqOption }}</pre>
        <span v-if="item.explanation">
          <em>Explication : {{ item.explanation }}</em>
        </span>
      </li>
    </ul>
    <pre>{{ parsedOptions }}</pre>
  </div>
</template>