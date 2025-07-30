<script setup>

    import {computed, ref,watch} from 'vue'
    import hljs from 'highlight.js'; // Import highlight.js

    const props = defineProps({
        title : {
            type: String,
            required : true
        },
        uuid : {
            type:String,
            required : true
        },
        initialCode : {
            type: String,
            required : false
        },
        maxScore : {
            type : Number,
            required : false
        }
    });

    const type = 'wtp'

    const userAnswer = ref('Coucou') //initialise une variable réactive pour stocker la réponse de l'utilisateur

    // Variables et fonctions liées à la soumission des réponses et à l'état du composant

    // Initialisation (=récupération des variables et fonctions) depuis le composable de soumission
    const { sending, sendError, sendSuccess, submitAnswer } = useAnswerSubmission()

    // Initialisation (=récupération des variables et fonctions) depuis le composable d'état, avec la fonction de réinitialisation spécifique en argument : ici c'est une fonction à corps vide.
    const {submitted, explained,toggleExplain, handleActivityCycle} = useActivityState(() => {})

    // On observe l'état `submitted` du composable d'état.
    // Quand il passe à `true`, on déclenche la soumission des données ; isSubmitted récupère la valeur de la variable après changement.
    watch(submitted, (isSubmitted) => {
        if (isSubmitted) {
    // On est en état "soumis", on envoie la réponse
        submitAnswer(
            type,
            userAnswer.value
        )
        }
    });
    
</script>

<template>

    <Awrapper 
        :title="title"
        :explained="explained" 
        :submitted="submitted" 
        @explain="toggleExplain" 
        @submit="handleActivityCycle">

        <slot></slot>
        <UButton @click="toggleExpand" size="xl"> Plein écran </UButton>
        <Wtp :initial-code="initialCode"/>

        <MdSolution v-if="explained && submitted">
            <slot name="solution"></slot>
        </MdSolution>
        
    </Awrapper>

</template>