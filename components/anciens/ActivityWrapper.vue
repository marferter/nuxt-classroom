<script setup>
import {ref} from 'vue'
import MChoice from './MChoice.vue'
import ActivityTest from './ActivityTest.vue'
import ShortAnswer from './ShortAnswer.vue'

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

// const resetKey = ref(0)

const submited = ref(false) // valeur booléenne dont dépend, dans le contexte "apprendre", l'affichage ou non des réponses correctes.

const toggleSubmited = () => {
    submited.value = !submited.value ;   // inverse la valeur de submitted
    if (!submited.value && explain.value) {
        toggleExplain()
    }
    
}

const componentsMap = {
  QCM : MChoice,
  test : ActivityTest,
  text : ShortAnswer
}

const dynamicComponent = componentsMap[props.questionType]

</script>

<template>
  <UCard variant="outline">
    <template #header>
        <div class="flex space-x-2">
            <h2 class="text-primary">
                {{ questionTitle }}
            </h2>
            <h2 class="text-primary text-xs">
                {{ questionType }}
            </h2>

        </div>
    </template>

    <component
        :is="dynamicComponent"
        :explain="explain"
        :submited="submited"
        :questionPrompt="questionPrompt"
        :options="options"
        :key="resetKey"
    />

    <template #footer>
        <div class="flex space-x-4 justify-end">
            <UButton v-if="submited" @click="toggleExplain" size="xl"> {{ explain ? "Masquer explications" : "Afficher explications" }} </UButton>

            <UButton @click="toggleSubmited" size="xl"> {{ submited ? "Nouvel essai" : "Soumettre" }} </UButton>
        </div>
    </template>
  </UCard>
</template>