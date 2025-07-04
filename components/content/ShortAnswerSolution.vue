<script setup>
//const submited = inject('submited')
//const explain = inject('explain')

    const submited = inject('submited')
    const explain = inject('explain')

//
</script>

<template>

    <div v-if="explain" class="text-sm ml-5 mt-1 mb-5 flex space-x-2">
         <slot/>
    </div>

    <!--        <div v-if="explain" class="text-sm ml-5 mt-1 mb-5 space-x-2">
            {{ options[0].explanations }}
        </div>-->
</template>