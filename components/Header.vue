
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Exercices',
    to: '/exercices',
    /*active: route.path.startsWith('/examen')*/
  },
  {
    label: 'Exercices2',
    to: '/exercices2',
    /*active: route.path.startsWith('/examen')*/
  },
  {
    label: 'Exercices3',
    to: '/exercices3',
    /*active: route.path.startsWith('/examen')*/
  }

])
</script>

<template>
  <UHeader>
    <template #title>

    </template>

    <UNavigationMenu :items="items" />


    <template #right>
      <UColorModeButton />
    </template>

  </UHeader>
</template>

