<script setup>

    import {computed, ref} from 'vue'
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
        maxScore : {
            type : Number,
            required : false
        }
    });

    const type ='shortanswer'

    const userAnswer = ref('') //initialise une variable réactive pour stocker la réponse de l'utilisateur

    //champ de réponse spécifique : aucun pour ce composant

    // Initialisation (=récupération des variables et fonctions) depuis le composable de soumission
    const { sending, sendError, sendSuccess, submitAnswer } = useAnswerSubmission()

    const {toggleSubmit, toggleExplain, resetActivity, explained, submitted} = useActivityState(clearTextArea)

    const handleSubmit = () => {
        toggleSubmit()
        submitAnswer(
            type, //voir si je peux le passer par défaut ?
            props.title,
            userAnswer.value
        )
    }

        //fonction spécifique de réinitialisation du "formulaire"
    function clearTextArea() {
            userAnswer.value = ''
        }


</script>


<template>

    <Awrapper 
        :title="title"
        @clearForm="resetActivity"
        @submit="handleSubmit"
        @explain="toggleExplain"
    >
        <slot></slot>

        <UTextarea v-model="userAnswer" :maxrows="4" autoresize class="w-full"/>

        <!-- <p>AShortAnswer explained {{ explained }}</p>
        <p>AShortAnswer submitted {{ submitted}} </p> -->

        <MdSolution v-if="explained && submitted">
            <slot name="solution"></slot>
        </MdSolution>
        
    </Awrapper>

</template>
