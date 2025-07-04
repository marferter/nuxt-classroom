<script setup>
import { ref, provide} from 'vue'

import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'


const props = defineProps({
    title : {
        type: String,
        required : false
    }
})

const explain = ref(false)
const submited = ref(false)

const toggleExplain = () => {
  explain.value = !explain.value
}

const toggleSubmited = () => {
  submited.value = !submited.value;
  if (!submited.value){
    resetKey.value++
  }
  if (!submited.value && explain.value) {
    toggleExplain();
  }
}

const resetKey = ref(0) //utilisé pour reset les composants enfants lorsqu'on clique sur nouvel essai


provide(/* key */'submited', /* value */ submited)
provide(/* key */'explain', /* value */ explain)


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

    <main :key="resetKey">
      <slot></slot>
    </main>

    <template #footer>
        <div class="flex space-x-4 justify-end">
            <UButton v-if="submited" @click="toggleExplain" size="xl"> {{ explain ? "Masquer explications" : "Afficher explications" }} </UButton>

            <UButton @click="toggleSubmited" size="xl"> {{ submited ? "Nouvel essai" : "Soumettre" }} </UButton>
        </div>
    </template>
  </UCard>
</template>