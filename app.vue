<!-- 
 Test pour voir si le plugin directus fonctionne -->
<script setup>
const { $directus } = useNuxtApp();
//console.log($directus); // c'était la source de plein de warns Failed to stringify parce que $directus n'est pas une simple donnée JSON, c'est l'instance complète du client SDK, un objet complexe rempli de fonctions (request, auth, with, etc.). or on ne peut pas stringifier une chaîne de caractères.
console.log('Le client Directus existe :', !!$directus);

const { login } = useDirectusAuth();

const user = useDirectusUser();

onBeforeMount(async () => {
  // Si l'utilisateur n'est pas connecté, lance le login
  if (!user.value) {
    //await login({ email: "prof.test@edufr.ch", password: "cintrisinidirictiS27!" })
    await login({ email: "admin@21-learning.com", password: "Van.Rossum$21" })
    //pour vérifier que user.value est bien renseigné
    console.log('Connecté !', user.value)
  } else {
    //log si déjà connecté
    console.log('Déjà connecté !', user.value)
  }
})
</script>


<template>
  <div>
    <UApp>
      <NuxtRouteAnnouncer />

      <nav>
      </nav>
  
      <main class="mx-auto max-w-4xl px-4"> 
        <NuxtPage/>
      </main>

    </UApp>
  </div>
</template>
