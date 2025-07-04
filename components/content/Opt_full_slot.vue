<script setup>

import { ref, onMounted, computed, inject} from 'vue'
import CorrectAnswerIcon from './icons/CorrectAnswerIcon.vue';
import WrongAnswerIcon from './icons/WrongAnswerIcon.vue';

const props = defineProps({

    isCorrect : {
        type: Boolean,
        required : false
    },

    explanation : {
        type: String,
        required : false
    },

})

const submited = inject('submited')
const explain = inject('explain')

const userAnswer = ref(false) //initialise une variable réactive pour stocker la réponse de l'utilisateur

const userAnswerStatus = computed(() => {
  return userAnswer.value === props.isCorrect
  })

</script>

<template>

    <div  
        :class="{'bg-elevated/50': !submited, 'bg-red-50': submited && !userAnswerStatus,'bg-green-50': submited && userAnswerStatus}"
        
        class="p-4 border border-neutral-300 rounded-lg shadow-sm flex items-center justify-between">

        <div >
            <label class="flex items-center space-x-2" >
                <UCheckbox color="primary" v-model="userAnswer" size="xl" />
            
                <slot />
                <!-- tests reactivité
                <p>User Answer {{ userAnswer }} </p>
                <p>Is correct {{ isCorrect }} </p>
                <p>User Answer Status {{ userAnswerStatus }} </p>
                -->
            </label>
        </div>

        <CorrectAnswerIcon v-if="submited && userAnswerStatus"/>
        <WrongAnswerIcon v-if="submited && !userAnswerStatus"/>
    </div>

    <!--<div class="ml-4 text-neutral-500 text-xs" v-if="explanation"> {{props.explanation}}</div>
    -->

    <div v-if="explain && props.explanation" class="text-sm ml-5 mt-1 mb-5 flex space-x-2">
        <UCheckbox :default-value="props.isCorrect" disabled/>
        <label> {{ props.explanation }} </label>
    </div>
 
</template>