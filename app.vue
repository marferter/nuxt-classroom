<!-- 
 Test pour voir si le plugin directus fonctionne -->
<script setup>
const { $directus } = useNuxtApp();
console.log($directus);
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
