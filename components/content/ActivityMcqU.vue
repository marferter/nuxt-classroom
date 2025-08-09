<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption'
    import {defaultOption} from '~/utils/mcqOption'
    import {ref, computed, watch} from 'vue'
    import type { Submission } from '~/types/directus-schema';

    const { 
        options, 
        uuid, 
        title, 
        type = 'mcqu' 
    } = defineProps<{
        options: McqOption[];
        uuid: string;
        title: string;
        type?: Submission['activity_type'];
    }>();

    // Variables liées à la donnée de la question et aux réponses ; elles sont passées au composant interne d'affichage des questions McqOptionRender

    // La normalisation suivante permet de gérer le cas où aucune prop n'est passée ainsi que d'attribuer des valeurs par défaut aux propriétés ; la version suivante est plus élégante et flexible (avec le spread operator) que celle de la version V1 de ce composant ; elle s'appuie sur l'objet mcqOption par défaut.
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
    
    const userAnswer = ref<number | null>(null) // index de la réponse sélectionnée
    
    const userContent = computed(() => ({
        userAnswer: userAnswer.value,
        userCorrection: userAnswerCorrect.value
    }))

    // Comme il s'agit d'un champ de réponse spécifique à la question, on précise ici le nom du champ spécifique correspondant dans la base de données
    const userAnswerCorrectField = 'user_correction'
    const userAnswerCorrect = computed(() => {
        if (userAnswer.value === null) return false;
        return normalizedOptions.value[userAnswer.value]?.is === true;
    });

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
        userAnswer.value = null
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

        <div v-for="(opt, index) in normalizedOptions" :key="index">
            <McqOptionRenderU
            :opt="opt"
            :selected="userAnswer === index"
            @select="userAnswer = index"
            />
        </div>
    </Awrapper>

</template>