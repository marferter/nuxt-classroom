<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption'
    import {defaultOption} from '~/utils/mcqOption'
    import {ref, computed} from 'vue'

    const props = defineProps<{
    options: McqOption[];
    uuid: string;
    title?: string;
    maxScore?: number;
    }>();

    // Variables liées à la donnée de la question et aux réponses ; elles sont passées au composant interne d'affichage des questions McqOptionRender

    // La normalisation suivante permet de gérer le cas où aucune prop n'est passée ainsi que d'attribuer des valeurs par défaut aux propriétés ; la version suivante est plus élégante et flexible (avec le spread operator) que celle de la version V1 de ce composant ; elle s'appuie sur l'objet mcqOption par défaut.
    const normalizedOptions = computed(() => {
    if (!props.options) {
        return [];
    }
    return props.options.map((opt) => ({
        ...defaultOption,
        ...opt
    }));
    });
    
    const userAnswers = ref(normalizedOptions.value.map(() => false))

    const userAnswersCorrect = computed(() => 
        normalizedOptions.value.map((opt, i) => userAnswers.value[i] === opt.is))

    // Variables et fonctions liées au statut de soumision et d'affichage du corrigé ; elles sont passées au composant intermédiaire d'enveloppe des questions Awrapper

    const submitted = ref(false)
    const explained = ref(false)

    // Variables et fonctions liées à la soumission des réponses
    // Récupération depuis le composable
    const { sending, sendError, sendSuccess, submitAnswer } = useAnswerSubmission();

    const handleExplain = () => {
        explained.value = !explained.value //inverse explained
    }

    const clearBoxes = () => {
        if (submitted.value === false) {
            for (let i = 0 ; i < userAnswers.value.length; i++){
                userAnswers.value[i] = false
            }
        }
    }

    // Appel du composable de submit
    async function handleSubmit() {
        submitted.value = !submitted.value // D'abord, on inverse l'état
        
        if (submitted.value === true) {
            // On est maintenant en état "soumis", on envoie la réponse
            await submitAnswer(userAnswers.value, userAnswersCorrect.value);

            if (sendSuccess.value) {
                //console.log("Succès");
            }
        }
        else {
            // On est en état "nouvel essai", on réinitialise les cases
            clearBoxes()
            explained.value = false
        }
    }
    
</script>

<template>
    <Awrapper :title="title" :submitted="submitted"
    :explained="explained" @explain="handleExplain" @submit="handleSubmit">
        <!--div> {{ prompt }} </div-->
        
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
            <McqOptionRender :submitted="submitted" :explained="explained" v-model="userAnswers[index]" :opt="opt">

            </McqOptionRender>
        </div>
    </Awrapper>

</template>