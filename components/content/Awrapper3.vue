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
      <slot></slot>
    </main>

    <template #footer>
        <p> Reçoit la valeur de submitted en prop : {{ submitted }} </p>

        <p> Reçoit la valeur de explained en prop : {{ explained }} </p>
        <div class="flex space-x-4 justify-end">

            <!--<UButton v-if="submited" @click="toggleExplain" size="xl"> {{ explain ? "Masquer explications" : "Afficher explications" }} </UButton>-->

            <UButton v-if="submitted" @click="$emit('explain')" size="xl"> {{ explained ? "Masquer explications" : "Afficher explications" }} </UButton>
            
            <UButton @click="$emit('submit')" size="xl"> {{ submitted ? "Nouvel essai" : "Soumettre" }} </UButton>

        </div>
    </template>
  </UCard>
</template>