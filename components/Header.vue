<script setup>
  const user = useDirectusUser()
</script>

<template>
  <header class="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-800">
    <!-- Bloc gauche cliquable qui renvoie à l'accueil -->
    <NuxtLink
      to="/"
      class="flex w-64 items-center gap-2 shrink-0 select-none"
      aria-label="Accueil Nuxt classroom"
    >
      
    <!-- 
      leading-none réduit l'espace vertical
      pb-0.5 descend légèrement le texte pour mieux l'aligner au bas de l'icône
    -->
    <span class="text-xl sm:text-xl items-end font-bold leading-none pb-5 pl-2">
      Nuxt
    </span>
    <UIcon
      name="i-lucide-school"
      class="size-10 text-primary"
      aria-hidden="true"
    />
    <span class="text-2xl sm:text-xl font-bold leading-none pt-5">
      Classroom
    </span>
  </NuxtLink>

  <div class="flex-1" />

    <div class="flex items-center gap-5 pr-4">
      <span class="text-lg font-medium">
          {{ user?.first_name }}
      </span>
      <UAvatar icon="i-lucide-user-round" size="xl" />
    </div>

  </header>
</template>


