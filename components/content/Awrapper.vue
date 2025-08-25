<script setup>
import { ref, provide} from 'vue'

const props = defineProps({
    title : {
      type: String,
      required : false
    },
})

const {toggleSubmit, toggleExplain, explained, submitted} = useActivityState(()=> {})

provide('submitted',submitted) 
provide('explained',explained)
//Pourquoi ne pas les passer au composant interne en prop : Awrapper ne peut pas passer de props aux composants internes car ils sont compris dans son slot, et non pas appelés dans son template

const emit = defineEmits(['submit', 'clearForm','explain'])

//Au clic sur le bouton Soumettre ...
const handleSubmit = () => { 
  toggleSubmit() //inverse l'état de submitted
  emit('submit') //emet l'événement 'submit' au composant parent Activity...
}
//Il est théoriquement possible d'émettre aussi la valeur de l'état en même temps que l'événement, mais j'avais des problèmes de réactivité et n'avoir ainsi qu'une source de vérité ; pour contourner le problème, j'ai des états submitted et explained dans la couche externe et ici, qui sont inversés chacun dans sa couche.

const handleExplain = () => {
  toggleExplain()
  emit('explain')
}

//Au clic sur le bouton Nouvel essai, les variables sont réinitialisées
const handleClearForm = () => {
  submitted.value = false 
  explained.value = false 
  emit('clearForm')
}

</script>


<template>
  <UCard class="mt-4" variant="outline">
    <template #header>
        <div class="flex space-x-2">
            <h2 class="text-primary text-xl">
                {{ title }}
            </h2>

        </div>
    </template>

    <main class="space-y-1">
      <slot> </slot>
    </main>

    <template #footer>
        <div class="flex space-x-4 justify-between">
          <UButton
            icon="i-lucide-lightbulb"
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
