<script setup>

import { ref, onMounted, computed} from 'vue'
import { marked } from 'marked'
//import MarkdownIt from 'markdown-it';
//import hljs from 'highlight.js';
//import 'highlight.js/styles/default.css'; // Importe un style pour highlight.js

const props = defineProps({

    elementType : {
        type : String,
        required : true
    },

    questionTitle : {
        type: String,
        required : true
    },

    questionPrompt : {
        type : String,
        required : true
    },

    options : {
        type : Array,
        required : true
    },

    explanations : {
        type : Array,
        required : false
    }

})

const userAnswers = ref([]);
const correctAnswers = ref([]);
//const userAnswersStatus = ref([]);

/*
const userAnswers = ref(props.options.map(() => false))
//construit un array de réponses false

const correctAnswers = ref(props.options.map( option => option.truth))

const userAnswersStutus = ref(userAnswers.map((element, index) => {return correctAnswers[index] === element}))
*/

onMounted(() => {
  userAnswers.value = props.options.map(() => false);
  correctAnswers.value = props.options.map(option => option.truth);

  /*userAnswersStatus.value = userAnswers.value.map((element, index) => {
    return element === correctAnswers.value[index]; // Compare user answer to correct answer
  });*/
});

const userAnswersStatus = computed(() => {
  return userAnswers.value.map((element, index) => {
    return element === correctAnswers.value[index];
  });
});

const explain = ref(false)

const toggleExplain = () => {
    explain.value = !explain.value
}

const submited = ref(false)

const toggleSubmited = () => {
    submited.value = !submited.value ;
    if (submited.value == false) {
        userAnswers.value = props.options.map(() => false)
    }

}

/*
const feedbackColor = (e) => {
    primary
}*/

/*
const computeStatus = () => {
    for (let answer in userAnswer)
}
*/

</script>

<template>
    <div> {{ correctAnswers }} </div>
    <div>
        <UCard variant="soft" class="border border-neutral-300">
            <h2 class="mb-3 font-bold text-xl text-primary">
                {{ elementType }} 
                :
                {{ questionTitle }}
            </h2>

            <div class="mb-3">
                {{ questionPrompt }}
            </div>

            <div class="space-y-0.5">
                <div v-for="(opt,index) in options">
                    <div  class="p-4 border border-neutral-300 rounded-lg shadow-sm bg-neutral-100 flex items-center space-x-2">
                        <input 
                            type="checkbox" :id="index" name="question" value="true"
                            v-model="userAnswers[index]"
                            class="appearance-none w-5 h-5 border border-1 border-neutral-300 rounded-sm checked:bg-neutral-400"
                            :class="{'bg-neutral-50':!submited, 'border-2 border-red-500': submited && !userAnswersStatus[index], 'border-2 border-primary-500': submited && userAnswersStatus[index]}"
                        >
                        <!--
                        <input 
                            type="checkbox" :id="index" name="question" value="true"
                            class=" appearance-none w-5 h-5 border-1 border-neutral-300 rounded-sm bg-neutral-50 checked:bg-primary-500 checked:border-0"
                        >
                        -->
                        <!-- <UCheckbox color="primary" v-model="userAnswers[index]"size="xl" /> -->
                        <label :for="index"> {{ opt.option }} </label>
                        <p>{{ userAnswers[index] }} </p>
                        <p>{{ userAnswersStatus[index] }}</p>


                    </div>
                    <div v-if="explain" class="text-sm ml-5 mt-1 mb-5 flex space-x-2">
                        <input type="checkbox" :id="index" :checked="opt.truth" disabled>
                        <!-- <UCheckbox :default-value="opt.truth" disabled/> -->
                        <p> {{ opt.explanations }} </p>
                    </div>
                </div>
            </div>
            <UButton @click="toggleExplain"> {{ explain ? "Masquer explications" : "Afficher explications" }} </UButton>
            <UButton > Nouvel essai (mélanger) </UButton>
            <UButton> Statut examen ou exercice </UButton>
            <UButton @click="toggleSubmited" > {{ submited ? "Nouvel essai" : "Soumettre" }} </UButton>
            <p> {{ submited }}</p>
        </UCard>
    
    </div>



    <!--    
        <div>
            <UCheckbox
                v-for="option in options"
                :label="option" 
                variant="card"
            />
        </div>

        <div v-for="(option,index) in options" class="p-4 border rounded-lg shadow-sm bg-white flex items-center space-x-2">
                <input type="checkbox" :id="index" name="question" value="true">
                <label v-html="marked(option)" :for="index"></label>
        </div>
    -->
            
</template>