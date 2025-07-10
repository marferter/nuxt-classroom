<script setup>
    import {computed, ref} from 'vue'

    //const submited = inject('submited')

    const userAnswer = ref('') //initialise une variable réactive pour stocker la réponse de l'utilisateur 

</script>

<template>
    
    <UTextarea v-model="userAnswer" :maxrows="4" autoresize class="w-full"/>

</template>