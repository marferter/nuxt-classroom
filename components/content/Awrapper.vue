<script setup>
import { ref, provide, defineEmits} from 'vue'

import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const props = defineProps({
    title : {
      type: String,
      required : false
    },

    submitted : {
        type : Boolean,
        default : false
    },

    explained : {
        type : Boolean,
        default : false
    }

})

const emit = defineEmits(['submit','explain'])

//la variable wrapperSubmitted récupère la prop comme valeur initiale, mais par la suite, elle n'est pas mise à jour avec la prop par cette affectation ; sa valeur est toggled par le bouton submit, puis poussée par le emit vers le composant extérieur ; du coup, est-ce nécessaire que submitted soit une prop ?

/* inversion des valeurs gérée dans le composant activity
const wrapperSubmitted = ref(props.submitted)

const wrapperExplained = ref(props.explained)


const toggleWrapperSubmitted = () => {
    wrapperSubmitted.value = !wrapperSubmitted.value
}

const toggleWrapperExplained = () => {
    wrapperExplained.value = !wrapperExplained.value
}
*/


const submit = () => {
  //toggleWrapperSubmitted()
  //emit('submit',wrapperSubmitted.value)
  emit('submit')
} 

const explain = () => {
  //toggleWrapperExplained()
  //emit('explain',wrapperExplained.value)
  emit('explain')
}

</script>


<template>
  <UCard class="mt-4" variant="outline">
    <template #header>
        <div class="flex space-x-2">
            <h2 class="text-primary">
                {{ title }}
            </h2>

        </div>
    </template>

    <main>
      <slot> </slot>
    </main>

    <template #footer>
        <div class="flex space-x-4 justify-end">

            <UButton v-if="submitted" @click="explain" size="xl"> {{ explained ? "Masquer explications" : "Afficher explications" }} </UButton>
            
            <UButton @click="submit" size="xl"> {{ submitted ? "Nouvel essai" : "Soumettre" }} </UButton>

        </div>
    </template>
  </UCard>
</template>