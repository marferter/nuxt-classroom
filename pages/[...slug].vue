<script setup>

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

const user = useDirectusUser();
// console.log("role", user.value.role)


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


