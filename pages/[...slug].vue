<script lang="ts" setup>

const { login } = useDirectusAuth();

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

await login({ email: "admin@21-learning.com", password: "Van.Rossum$21" });

</script>

<template>
    <main>
        <ContentRenderer v-if="page" :value="page" />
    </main>
</template>