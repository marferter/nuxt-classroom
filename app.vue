<!-- Test pour voir si le plugin directus fonctionne -->
<script setup>
const { $directus } = useNuxtApp();
console.log('Le client Directus existe :', !!$directus);
const route = useRoute()

const showNav = computed(() => {
  // Liste des chemins où la barre de navigation doit être masquée
  const forbiddenPaths = ['/login', '/forbidden']
  
  // On vérifie si le chemin actuel commence par l'un des chemins interdits.
  // Utiliser startsWith est plus robuste car ça masquera aussi /admin/users, /admin/settings, etc.
  return !forbiddenPaths.some(path => route.path.startsWith(path))
})

</script>

<template>
  <div>
    <UApp>
      <NuxtRouteAnnouncer />

      <Header/>

      <!-- class="mx-auto max-w-4xl px-4" -->
      <main class="flex h-screen">
        <!-- 
      flex-shrink-0: empêche la barre de navigation de rétrécir
      w-64: donne une largeur fixe (width: 16rem / 256px). Vous pouvez ajuster cette valeur (ex: w-72)
      bg-gray-100 dark:bg-gray-900: couleur de fond pour les modes clair et sombre
    -->
        <nav v-if="showNav" class="flex-shrink-0 w-70 bg-gray-50 dark:bg-gray-900">
          <Navigation/>
        </nav>
        <div class="flex-grow overflow-y-auto">
        <UContainer >
        <NuxtPage class="pb-13 pt-5"/>
        </UContainer>
        <Footer :show-nav="showNav" />
        </div>
      </main>

    </UApp>
  </div>
</template>
