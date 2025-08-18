<script setup>

import { onMounted, ref } from 'vue'
import { parseMarkdown } from '#imports'
import { textarea } from '#build/ui'
//import ActivityMcq from '~/components/content/ActivityMcq.vue'

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  console.log('Path',route.path)
  return queryCollection('lessons').path(route.path).first()
})

const isDemo = computed(() => {
  return route.path.split('/').filter(Boolean)[0] === 'demo'
})

const sourceLink = computed(() => {
  return '/source' + route.path
})

const { login } = useDirectusAuth();

const user = useDirectusUser();

onBeforeMount(async () => {
  // Si l'utilisateur n'est pas connecté, lance le login
  if (!user.value) {
    //await login({ email: "prof.test@edufr.ch", password: "cintrisinidirictiS27!" })
    await login({ email: "admin@21-learning.com", password: "Van.Rossum$21" })
    //pour vérifier que user.value est bien renseigné
    //console.log('Connecté !', user.value)
  } else {
    //log si déjà connecté
    console.log('Déjà connecté !', user.value)
  }
})

</script>

<template>
    <main>
        <ULink 
          :to="sourceLink" 
          target="_blank"
          v-if="isDemo"
        > Voir le code source de cette page 
        </ULink>
        <ContentRenderer v-if="page" :value="page"/>
    </main>
</template>


