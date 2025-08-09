<script setup lang="ts">
    import { ref } from 'vue'
    import type { Submission } from '~/types/directus-schema'

    const { 
        uuid, 
        title, 
        type = 'shortAnswer' 
    } = defineProps<{
        uuid: string;
        title: string;
        type?: Submission['activity_type'];
    }>();

    const userAnswer = ref('') //initialise une variable réactive pour stocker la réponse de l'utilisateur


    const userContent = computed(() => 
        ({userAnswer: userAnswer.value}))

    // Initialisation (=récupération des variables et fonctions) depuis les composables
    const { sending, sendError, sendSuccess, submitAnswer } = useAnswerSubmission()
    const {toggleSubmit, toggleExplain, resetActivity, explained, submitted} = useActivityState(clearTextArea)

    const handleSubmit = () => {
        toggleSubmit()
        submitAnswer(
            uuid,
            title,
            type,
            userContent.value
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

        <MdSolution v-if="explained && submitted">
            <slot name="solution"></slot>
        </MdSolution>
        
    </Awrapper>
</template>
