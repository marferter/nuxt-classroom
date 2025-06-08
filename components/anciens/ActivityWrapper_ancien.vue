<script setup>
import {ref} from 'vue'
import MChoice_interne_ancien from './anciens/MChoice_interne_ancien.vue'

const props = defineProps({

    questionType : {
        type : String,
        required : true
    },

    questionTitle : {
        type: String,
        required : true
    },

    questionPrompt : {
        type : String,
        required : false
    },

    options : {
        type : Array,
        required : false
    }

})

const explain = ref(false) //valeur booléenne dont dépend l'affichage ou non des explications.

const toggleExplain = () => {
    explain.value = !explain.value
} // inverse la valeur de explain ; fonctionnalité du bouton correspondant

const submited = ref(false) // valeur booléenne dont dépend, dans le contexte "apprendre", l'affichage ou non des réponses correctes.

const resetKey = ref(0)

const toggleSubmited = () => {
    submited.value = !submited.value ;   // inverse la valeur de submitted
    if (submited.value == false) {
        resetKey.value++ ;
        explain.value = false
    }
    
}

</script>

<template>
  <UCard>
    <template #header>
        <h2 class="mb-3 font-bold text-xl text-primary">
            {{ questionType }} 
            :
            {{ questionTitle }}
        </h2>
    </template>

    <MChoice_interne_ancien
        :explain="explain"
        :submited="submited"
        :questionPrompt="questionPrompt"
        :options="options"
        :key="resetKey"
    />

    <template #footer>
        <div class="flex space-x-4 justify-end mt-6">
            <UButton v-if="submited" @click="toggleExplain" size="xl"> {{ explain ? "Masquer explications" : "Afficher explications" }} </UButton>

            <UButton @click="toggleSubmited" size="xl"> {{ submited ? "Nouvel essai" : "Soumettre" }} </UButton>
        </div>
    </template>
  </UCard>
</template>