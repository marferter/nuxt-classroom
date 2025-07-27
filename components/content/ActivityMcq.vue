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

    // Variables liées à la donnée de la question et aux réponses ; liées au composant interne d'affichage des questions McqOptionRender

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

    // Variables et fonctions liées au statut de soumision et d'affichage du corrigé ; liées au composant intermédiaire d'enveloppe des questions Awrapper

    const submitted = ref(false)
    const explained = ref(false)

    const clearBoxes = () => {
        if (submitted.value === false) {
            for (let i = 0 ; i < userAnswers.value.length; i++){
                userAnswers.value[i] = false
            }
        }
    }

    const handleSubmit = () => {
        submitted.value = !submitted.value //inverse submitted
        if (submitted.value === true){
            submitAnswer()
            //console.log("soumis")
        }
        else {
            clearBoxes()
        }
    }

    const handleExplain = () => {
        explained.value = !explained.value //inverse explained
    }

    // Variables et fonctions liées à la communication avec Directus
    const { $directus, $readItems, $createItem } = useNuxtApp()
    const sending = ref(false)
    const sendError = ref<string | null>(null)
    const sendSuccess = ref(false)

    async function submitAnswer() {
        sending.value = true
        sendError.value = null
        sendSuccess.value = false
        try {
            await $directus.request($createItem('submissions_mcq', {
            user_answer: userAnswers.value,
            user_correction: userAnswersCorrect.value
        }))
            sendSuccess.value = true
            //userAnswers.value = '' je crois que ça sert à reset... à voir si je veux déplacer ici ma fonction de reset
        } catch (e) {
            sendError.value = (e as Error).message || 'Erreur lors de l\'envoi'
        } finally {
            sending.value = false
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