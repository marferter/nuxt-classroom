<script setup>
import { extractListItems } from '@/utils/extractListItems.js'

const md = `
* ++ Première option correcte
* Deuxième option erronée
* Troisième option erronée
* Quatrième option correcte /// Ceci est une explication.
`

const items = extractListItems(md)
</script>

<template>
  <div>
    <p v-for="(item, i) in items" :key="i">
      {{ item }}
    </p>
  </div>
</template>