<script setup lang="ts">
    import { ref } from 'vue'
    import type { Submission } from '~/types/directus-schema';

    const {
        title,
        uuid,
        initialCode = '',
        type = 'wtp'
    } = defineProps<{
        title: string;
        uuid: string;
        initialCode?: string;
        type?: Submission['activity_type'];
    }>();

    // Variables et fonctions liées à la soumission des réponses
    const userCode = ref<string>(initialCode)
    const userErrorOutput = ref<string>('')
    const userFullOutput = ref<string>('')


    const saveCode = (data: { input: string; error: string; output: string }) => {
        userCode.value = data.input
        userErrorOutput.value = data.error
        userFullOutput.value = data.output

        submitAnswer(
            uuid,
            title,
            type,
            {
                userCode: userCode.value,
                error_output: userErrorOutput.value,
                full_output: userFullOutput.value,
                submitted: false // On indique que ce n'est pas une soumission finale
            }
        )
    }

    // Initialisation (=récupération des variables et fonctions) depuis le composable de soumission
    const { sending, sendError, sendSuccess, submitAnswer } = useAnswerSubmission()

     const {toggleSubmit, toggleExplain, explained, submitted} = useActivityState(() => {})

    const handleSubmit = () => {
        toggleSubmit()
        submitAnswer(
            uuid,
            title,
            type,
            {
                userAnswer: userCode.value,
                error_output: userErrorOutput.value,
                full_output: userFullOutput.value,
                submitted: true // On indique que c'est la soumission finale de l'utilisateur
            }
        )
    }

    //Variables et fonctions liées à l'affichage ou non de l'éditeur de code
    // On type la variable pour l'affichage du composant
    const isComponentVisible = ref<boolean>(false)

    const mountComponent = () => {
        isComponentVisible.value = true
    }
    
</script>

<template>

    <Awrapper 
        :title="title"
        @clearForm="() => {}"
        @submit="handleSubmit"
        @explain="toggleExplain">

        <slot></slot>
        <!-- <pre>{{ userAnswer }}</pre> -->
        <UButton v-if="!isComponentVisible"   @click="mountComponent" size="xl"> Afficher éditeur </UButton>
        <WtpExpand 
            v-if="isComponentVisible"
            :initial-code="initialCode"
            @codeRun="saveCode"
        />
        <MdSolution v-if="explained && submitted">
            <slot name="solution"></slot>
        </MdSolution>
        
    </Awrapper>

</template>