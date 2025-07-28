<!-- 
 Test pour voir si le plugin directus fonctionne -->
<script setup>
const { $directus } = useNuxtApp();
//console.log($directus); // c'était la source de plein de warns Failed to stringify parce que $directus n'est pas une simple donnée JSON, c'est l'instance complète du client SDK, un objet complexe rempli de fonctions (request, auth, with, etc.). or on ne peut pas stringifier une chaîne de caractères.
console.log('Le client Directus existe :', !!$directus);
</script>


<template>
  <div>
    <UApp>
      <NuxtRouteAnnouncer />

      <nav>
        <Header/>
      </nav>
  
      <main class="mx-auto max-w-4xl px-4"> 
        <NuxtPage/>
      </main>

    </UApp>
  </div>
</template>
