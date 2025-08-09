<script setup>
import { ref, provide} from 'vue'

const props = defineProps({
    title : {
      type: String,
      required : false
    },

    // submitted : {
    //     type : Boolean,
    //     default : false
    // },

    // explained : {
    //     type : Boolean,
    //     default : false
    // }

})

const submitted = ref(false)
const explained = ref(false)

provide('submitted',submitted) 
provide('explained',explained)

const emit = defineEmits(['submit', 'clearForm','explain'])

//Au clic sur le bouton Soumettre ...
const handleSubmit = () => { 
  submitted.value = !submitted.value //inverse l'état de submitted
  emit('submit') //emet l'événement 'submit' au composant parent Activity...
}

//Au clic sur le bouton Nouvel essai les variables sont réinitialisées
const handleClearForm = () => {
  submitted.value = false 
  explained.value = false 
  emit('clearForm')
}

const handleExplain = () => {
  explained.value = !explained.value
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

    <main class="space-y-1">
      <slot> </slot>
    </main>

    <template #footer>
        <div class="flex space-x-4 justify-between">
            <!-- <p> Awrapper explained {{ explained }}</p> -->
              <UButton 
              v-if="submitted"   
              size="xl"
              @click="handleExplain"
            > 
              {{ explained ? "Masquer explications" : "Afficher explications" }} 
            </UButton>
            

            <UButton
              v-if="!submitted"
              size="xl"
              @click="handleSubmit" 
            > 
              Soumettre 
            </UButton>

            <UButton 
              v-else
              size="xl"
              @click="handleClearForm" 
            > 
              Nouvel essai 
            </UButton>    

        </div>
    </template>
  </UCard>
</template>