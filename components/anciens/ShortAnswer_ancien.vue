<script setup>

import { ref, onMounted, computed} from 'vue'
//import CorrectAnswerIcon from './icons/CorrectAnswerIcon.vue';
//import WrongAnswerIcon from './icons/WrongAnswerIcon.vue';

import MarkdownIt from 'markdown-it'

const props = defineProps({

    explain : {
        type: Boolean,
        required : true
    },

    submited : {
        type: Boolean,
        required : true
    },

    questionPrompt : {
        type : String,
        required : true
    },

    options : {
        type : Array,
        required : true
    }

})

/*
const correctAnswers = props.options.map(option => option.truth); //initialise une variable réactive pour stocker les réponses correctes (array avec les valeurs booléennes correctes pour chaque option) 

const userAnswersStatus = computed(() => {
  return userAnswers.value.map((element, index) => {
    return element === correctAnswers[index];
  });
}); //initialise une variable calculée, autrement dit qui se met à jour sitôt que les valeurs réactives dont elle dépend changent, ici les réponses données par l'utilisateur.
*/

//const explain = ref(false) //valeur booléenne dont dépend l'affichage ou non des explications.

const userAnswer = ref('') //initialise une variable réactive pour stocker la réponse de l'utilisateur 


/*onMounted(() => {
  console.log('Composant remonté')
})*/



</script>

<template>
    <div class="mb-3">
        {{ questionPrompt }}
    </div>

        <div class="flex flex-col">
            <UTextarea v-model="userAnswer" :maxrows="4" autoresize class="w-full"/>
            <div v-if="explain" class="text-sm ml-5 mt-1 mb-5 space-x-2">
                {{ options[0].explanations }}
            </div>

        </div>


</template>