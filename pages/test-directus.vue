<!--
<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <ContentRenderer v-if="home" :value="home" />
  <div v-else>Home not found</div>
</template>
-->

<template>
  <div v-if="global">
    <h1>{{ global.title }}</h1>
    <p>{{ global.description }}</p>
  </div>
  <div v-else>
    <p>Chargement des données...</p>
  </div>
</template>


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

<!--
<script setup>
const { $directus, $readItem } = useNuxtApp()

const { data, error } = await useAsyncData('global', async () => {
  return await $directus.request($readItem('global'))
})

const global = data
</script>
-->



