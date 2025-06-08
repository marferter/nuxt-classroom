<script setup>

import { ref, onMounted, computed} from 'vue'
import CorrectAnswerIcon from './icons/CorrectAnswerIcon.vue';
import WrongAnswerIcon from './icons/WrongAnswerIcon.vue';


const props = defineProps({

    title : {
        type: String,
        required : false
    },

    maxScore : {
        type: Number,
        required : false
    },
})

const earnedScore = 0



</script>


<template>
    <div>
        <h2 class="text-primary text-xl " >QCM {{props.title}} </h2>

        <p>maxScore: {{ props.maxScore }}</p>
        <slot />
    </div>
</template>
