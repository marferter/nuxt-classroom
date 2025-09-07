<script setup>
import { provide } from 'vue'

//Props
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
})

// Emits
const emit = defineEmits(['submit', 'clearForm', 'explain'])

// Etat de l'activité
const { toggleSubmit, toggleExplain, explained, submitted } = useActivityState(() => {})

// Provide des états pour les descendants
provide('submitted', submitted)
provide('explained', explained)

// Handlers
function handleSubmit() {
  toggleSubmit()
  emit('submit')
}

function handleExplain() {
  toggleExplain()
  emit('explain')
}

function handleClearForm() {
  submitted.value = false
  explained.value = false
  emit('clearForm')
}
</script>

<template>
  <UCard class="mt-4" variant="outline">
    <template #header>
      <div class="flex space-x-2">
        <h2 class="text-primary text-xl">{{ title }}</h2>
      </div>
    </template>

    <main class="space-y-1">
      <slot />
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
