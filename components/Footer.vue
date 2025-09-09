<script setup>
    const { user,showNav } = defineProps({
    user: Object, // voir si je peux trouver le type des user directus
    showNav: Boolean
})


</script>

<template>
    <footer 
        class="fixed bottom-0 flex items-center gap-4 px-4 py-1 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        :class="{'left-70 right-0' : showNav, 'inset-x-0': !showNav }"
    >

    <div class="flex flex-1 justify-center">
      <UserSwitch :user="user" />
    </div>
    </footer>
</template>