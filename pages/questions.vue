<script setup>
// 1. On utilise useAsyncData pour récupérer les données côté serveur (ou client lors de la navigation)
//    'all-questions' est une clé unique pour cette requête.
const { data: pages } = await useAsyncData('all-pages', () => {
  return queryCollection('content').all()
})

// const { data: questions } = await useAsyncData('all-questions', () => {
//   return queryCollection('questions').all()
// })

// const { data: page } = await useAsyncData(route.path, () => {
//   return queryCollection('content').path(route.path).first()
// })

const pageTitles = Array.isArray(pages) ? pages.map(page => page.id) : []

</script>

<template>
  <main>

    <!-- <pre>{{ pages }}</pre> -->
    <!-- <div v-for="page in pages" >
      <p>{{ page.id }}</p>
      <p v-for="block of page.body.value">{{block}}</p>
    </div> -->

    <p v-if="Array.isArray(pages)">{{ pages.map(page => page.id) }}</p>
    
  
  </main>
</template>