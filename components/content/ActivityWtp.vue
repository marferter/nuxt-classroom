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

    // Variables et fonctions liées à la soumission des réponses

    const userAnswer = ref('') //initialise une variable réactive pour stocker la réponse de l'utilisateur
    const userErrorOutput = ref('')
    const userFullOutput = ref('')

    //valeur booléenne pour tracer les codes ont été volontairement soumis par l'élève via le bouton soumettre (true) des codes enregistrés via le code run ; règle de nommage du champ ad-hoc

    //champ de réponse spécifique
    //const userAnswerSubmittedField = 'submitted'

    const saveCode = (data) => {
        userAnswer.value = data[0]
        userErrorOutput.value = data[1]
        userFullOutput.value = data[2]
        console.log("answer", userAnswer.value)
        console.log("error", userErrorOutput.value)
        console.log("output", userFullOutput.value)
        submitAnswer(
            type,
            props.title,
            userAnswer.value,
            {
                ['error_output']:userErrorOutput.value,
                ['full_output']:userFullOutput.value
            }
        )
    }

    // Initialisation (=récupération des variables et fonctions) depuis le composable de soumission
    const { sending, sendError, sendSuccess, submitAnswer } = useAnswerSubmission()

     const {toggleSubmit, toggleExplain, explained, submitted} = useActivityState(() => {})

    const handleSubmit = () => {
        toggleSubmit()
        submitAnswer(
            type, //voir si je peux le passer par défaut ?
            props.title,
            userAnswer.value,
            {
                ['submitted']:true,
                ['error_output']:userErrorOutput.value,
                ['full_output']:userFullOutput.value
            }
        )
    }

    //Variables et fonctions liées à l'affichage ou non de l'éditeur de code
    const isComponentVisible = ref(false)

    const mountComponent = () => {
        isComponentVisible.value = true
    }
    
</script>

<template>

    <Awrapper 
        :title="title"
        @clearForm=""
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