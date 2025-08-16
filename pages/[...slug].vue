<script setup>

import { onMounted } from 'vue'

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('lessons').path(route.path).first()
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
        <ContentRenderer v-if="page" :value="page" />
    </main>
</template>


