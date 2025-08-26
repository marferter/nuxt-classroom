
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Cours',
    to: '',
  },
  {
    label: 'Demo',
    to: '',

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

