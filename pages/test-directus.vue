
<template>
  <div v-if="global">
    <h1>{{ global.title }}</h1>
    <p>{{ global.description }}</p>
  </div>
  <div v-else>
    <p>Chargement des données...</p>
  </div>
</template>

<!-- c'est le scrip qu'à écrit Cédric avec les composables nuxt-directus ; il marche
<script setup lang="ts">
const { getItems } = useDirectusItems();
const router = useRouter();

const global = ref(null);


const fetchGlobal = async () => {
  try {
    const filters = { };
    const items = await getItems({
      collection: "global",
      params: {
        filter: filters,
      },
    });
    console.log("Global items:", items);
    return items;

  } catch (e) {}
};

onMounted(async () => {
  const singleton = await fetchGlobal();
  alert(singleton)
  global.value = singleton;

});
</script>
-->

<!--avant ça ne marchait pas, et j'ai remplacé readItem par readItems-->

<script setup>
const { $directus, $readItems } = useNuxtApp()

const { data, error } = await useAsyncData('global', async () => {
  return await $directus.request($readItems('global'))
})

const global = data
</script>




