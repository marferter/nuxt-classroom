<script setup>
const { data } = await useAsyncData('ast', () =>
  queryCollection('content').all().first()
)
</script>

<template>
  <pre v-if="data">{{ JSON.stringify(data.body, null, 2) }}</pre>
  <div v-else>Document non trouvé</div>
</template>

<!--
<script setup>
const { data } = await useAsyncData('list', () =>
  queryCollection('content').find()
)
</script>

<template>
  <ul>
    <li v-for="doc in data" :key="doc._id">{{ doc._path }}</li>
  </ul>
</template>
-->