<script setup>
const { $directus, $readItems, $createItem } = useNuxtApp()
import { ref } from 'vue'

const { data, error } = await useAsyncData('global', async () => {
  return await $directus.request($readItems('global'))
})

const global = data

const userAnswer = ref('')
const sending = ref(false)
const sendError = ref(null)
const sendSuccess = ref(false)

async function submitAnswer() {
  sending.value = true
  sendError.value = null
  sendSuccess.value = false
  try {
    await $directus.request($createItem('test_form_simple', { text: userAnswer.value }))
    sendSuccess.value = true
    userAnswer.value = ''
  } catch (e) {
    sendError.value = e.message || 'Erreur lors de l\'envoi'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div v-if="global">
    <h1>{{ global.title }}</h1>
    <p>{{ global.description }}</p>
  </div>
  <div v-else>
    <p>Chargement des données...</p>
  </div>

  <form @submit.prevent="submitAnswer" class="space-y-4 mt-6">
    <UTextarea v-model="userAnswer" :maxrows="4" autoresize class="w-full" placeholder="Votre réponse..."/>
    <UButton type="submit" :loading="sending">Envoyer</UButton>
    <div v-if="sendSuccess" class="text-green-600">Réponse envoyée !</div>
    <div v-if="sendError" class="text-red-600">{{ sendError }}</div>
  </form>
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






