<script setup>

    const submited = inject('submited')
    const explain = inject('explain')

</script>

<template>

    <div v-if="explain" class="text-sm ml-5 mt-1 mb-5">
         <slot/>
    </div>

</template>