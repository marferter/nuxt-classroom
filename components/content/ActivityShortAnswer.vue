<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Submission } from '~/types/directus-schema'

// Props typées
const { 
    uuid, 
    title, 
    type = 'shortAnswer' 
} = defineProps<{
    uuid: string;
    title: string;
    type?: Submission['activity_type'];
}>()

// Réponse utilisateur
const userAnswer = ref('')

// Composables pour la soumission et l'état de l'activité
const { sending, sendError, sendSuccess, submitAnswer } = useAnswerSubmission()
const { toggleSubmit, toggleExplain, resetActivity, explained, submitted } = useActivityState(clearTextArea)

// Gestion de la soumission
function handleSubmit() {
    toggleSubmit()
    submitAnswer(
        uuid,
        title,
        type,
        { userAnswer: userAnswer.value }
    )
}

//Fonction spécifique de réinitialisation du "formulaire"
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

        <UTextarea
            size="xl"
            v-model="userAnswer"
            :maxrows="4"
            autoresize
            class="w-full"
        />

        <MdSolution v-if="explained && submitted">
            <slot name="solution"></slot>
        </MdSolution>
    </Awrapper>
</template>
