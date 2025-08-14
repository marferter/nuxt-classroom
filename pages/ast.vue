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

content/test/mcq-simple.md	Un fichier au contenu simple pour explorer la manipulation de l'AST	{"type":"minimal","value":


[["h1",{"id":"un-fichier-au-contenu-simple-pour-explorer-la-manipulation-de-last"},"Un fichier au contenu simple pour explorer la manipulation de l'AST"],["activity-mcq-v1",{":options":"[{\"option\":\"Option 1\",\"is\":true,\"explanation\":\"C'est la bonne réponse.\"},{\"option\":\"Option 2\",\"is\":false,\"explanation\":\"C'est incorrect.\"},{\"option\":\"Option 3\",\"is\":false,\"explanation\":\"C'est aussi incorrect.\"}]","title":"Question 1","uuid":"9e3cb5b9-d553-4019-bf85-1634d111d1ff"},["p",{},"Cochez la bonne réponse parmi les options suivantes :"]],["activity-mcq-v1",{":options":"[{\"option\":\"Option A\",\"is\":true,\"explanation\":\"C'est la bonne réponse.\"},{\"option\":\"Option B\",\"is\":false,\"explanation\":\"C'est incorrect.\"},{\"option\":\"Option C\",\"is\":false,\"explanation\":\"C'est aussi incorrect.\"}]","title":"Question 2","uuid":"27ecb20a-6fb6-460f-a07d-02d337901adf"},["p",{},"Cochez la bonne réponse parmi les options suivantes"]]],"toc":{"title":"","searchDepth":2,"depth":3,"links":[]}}