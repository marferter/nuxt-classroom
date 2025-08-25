<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption'
    import {defaultOption} from '~/utils/mcqOption'
    import type { McqAnswers } from '~/utils/mcqAnswers'
    import {ref, computed, watch} from 'vue'
    import type { Submission } from '~/types/directus-schema';

    const { 
        options, 
        uuid, 
        title, 
        type = 'mcq' 
    } = defineProps<{
        options: McqOption[];
        uuid: string;
        title: string;
        type?: Submission['activity_type'];
    }>();

    // Variables liées à la donnée de la question et aux réponses ; elles sont passées au composant interne d'affichage des questions McqOptionRender

    // La normalisation suivante permet de gérer le cas où aucune prop n'est passée ainsi que d'attribuer des valeurs par défaut aux propriétés ; elle s'appuie sur l'objet mcqOption par défaut.
    const normalizedOptions = computed(() => {
        if (!options) {
            return [];
        }
        return options.map((opt) => ({
            ...defaultOption,
            ...opt
        }));
        }
    );
    
    const userAnswer = ref(normalizedOptions.value.map(() => false))

    const userAnswerCorrect = computed(() => 
        normalizedOptions.value.map((opt, i) => userAnswer.value[i] === opt.is))

    const userContent = computed<McqAnswers>(() => ({
        userAnswer: userAnswer.value,
        userCorrection: userAnswerCorrect.value
    }))

    // Variables et fonctions liées à la soumission des réponses et à l'état du composant

    // Initialisation (=récupération des variables et fonctions) depuis le composable de soumission
    const { sending, sendError, sendSuccess, submitAnswer } = useAnswerSubmission()

    const handleSubmit = () => {
        submitAnswer(
            uuid,
            title,
            type,
            userContent.value
        )
    }
    //fonction spécifique de réinitialisation du "formulaire"
    const clearBoxes = () => {
        userAnswer.value.fill(false)
    }

</script>

<template>
    <Awrapper 
        :title="title" 
        @clearForm="clearBoxes"
        @submit="handleSubmit">
        
        <slot></slot>

        <!-- Pour faire le test sur l'array réactif des réponses de l'user et sur celui de la correction
        <div v-for="answer in userAnswers"> 
            <p> {{ answer }}</p>
        </div>

        <div v-for="correction in userAnswersCorrect"> 
            <p> {{ correction }}</p>
        </div>
        -->

        <div v-for="(opt,index) in normalizedOptions" :key="index">
            <McqOptionRender
            :opt="opt"
            :userAnswerCorrect="userAnswerCorrect[index]"
            v-model="userAnswer[index]">
            </McqOptionRender>
        </div>
    </Awrapper>

</template>