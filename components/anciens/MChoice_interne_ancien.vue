<script setup>

import { ref, onMounted, computed} from 'vue'

//import { marked } from 'marked'
//import MarkdownIt from 'markdown-it';
//import hljs from 'highlight.js';
//import 'highlight.js/styles/default.css'; // Importe un style pour highlight.js

/* Voici les props du composant MChoice: ce sont les données qu'il reçoit du composant parent
pour l'instant l'examen dans lequel la question est intégrée*/

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

const correctAnswers = props.options.map(option => option.truth); //initialise une variable réactive pour stocker les réponses correctes (array avec les valeurs booléennes correctes pour chaque option) 

const userAnswers = ref(props.options.map(() => false)); //initialise une variable réactive pour stocker les réponses de l'utilisateur (array de false, aussi long que la liste des options)

const userAnswersStatus = computed(() => {
  return userAnswers.value.map((element, index) => {
    return element === correctAnswers[index];
  });
}); //initialise une variable calculée, autrement dit qui se met à jour sitôt que les valeurs réactives dont elle dépend changent, ici les réponses données par l'utilisateur.


//const explain = ref(false) //valeur booléenne dont dépend l'affichage ou non des explications.


</script>

<template>
    <div class="mb-3">
        {{ questionPrompt }}
    </div>

    
    <div class="space-y-0.5" v-for="(opt,index) in options">
        <div  :class="{'bg-white': !submited, 'bg-red-100': submited && !userAnswersStatus[index],'bg-green-100': submited && userAnswersStatus[index]}" class="p-4 border border-neutral-300 rounded-lg shadow-sm flex items-center space-x-2">
            <UCheckbox color="primary" v-model="userAnswers[index]" size="xl" />
            <label> {{ opt.option }} </label>

        </div>
        <div v-if="explain" class="text-sm ml-5 mt-1 mb-5 flex space-x-2">
            <UCheckbox :default-value="opt.truth" disabled/>
            <label> {{ opt.explanations }} </label>
        </div>
    </div>


</template>