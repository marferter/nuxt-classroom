<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  initialCode: String
})

//Variable pour identifier réactivement l'instance du composant
const iframeRef = ref(null)

//Variables et fonctions pour la gestion de l'affichage plein écran
const expanded = ref(false)

const toggleExpand = () => {
  expanded.value = !expanded.value
}

//Fonction pour envoyer le code initial à l'éditeur
const sendInitialCode = () => {
  if (!iframeRef.value) {
    console.error("L'iframe n'est pas prête !")
    return
  }

  const initialCodePayload = {
    type: 'files',
    data: [{
      name: 'main.py',
      data: props.initialCode
    }]
  }
  //Si ça marche il faudra remplacer * pour vérifier l'origine du message...
  iframeRef.value.contentWindow.postMessage(initialCodePayload,"https://webtigerpython.ethz.ch")
  console.log("Code initial envoyé à l'iframe")
}

//Définition de l'événement "code exécuté" à transmettre au composant parent
const emit = defineEmits('codeRun')

//Variables pour récupérer le code et les outputs de l'utilisateur
const userInputCode = ref('')
const userFullOutput = ref('')
const userErrorOutput = ref('')

const emitCodeRun = () => {
  emit('codeRun', {
    input: userInputCode.value,
    error: userErrorOutput.value,
    output: userFullOutput.value
  })
  // Réinitialisation des variables
  userInputCode.value = ''
  userErrorOutput.value = ''
  userFullOutput.value = ''
}

const handleGlobalMessage = (event) => {
  //Vérifications : si une condition est fausse on ignore le message
  if (
    !iframeRef.value || //iframe pas montée
    event.source !== iframeRef.value.contentWindow //le message vient d'une autre iframe
  ) {
    return //on arrête tout car le message n'est pas pour nous.
  }

  const msg = event.data

  //On teste le type des messages et on stocke leur data dans la variable correspondante
  switch (msg?.type) {
    case "code":
      userInputCode.value = msg.data
      break
    case "error":
      userErrorOutput.value = msg.data
      break
    case "full_output":
      userFullOutput.value = msg.data
      break
    case "program_finished":
      emitCodeRun()
      break
    // Optionnel : gérer les cas inattendus
    default:
      // rien ou log
      break
  }
}



onMounted(() => {

  if (iframeRef.value) {
    iframeRef.value.addEventListener('load',sendInitialCode)
  }

  window.addEventListener('message', handleGlobalMessage)
})

onBeforeUnmount(() => {
  // Nettoyer les listeners quand le composant est détruit pour éviter les fuites de mémoire.
  window.removeEventListener('message', handleGlobalMessage);

  if (iframeRef.value) {
    iframeRef.value.removeEventListener('load', sendInitialCode);
  }
})

</script>

<template>
  <div>
    <div :class="['wtp-iframe-container', { 'iframe-fullscreen-overlay': expanded }]">
      <div class="flex pb-1 space-x-4 justify-between">
        <UButton @click="sendInitialCode" size="xl"> Réinitialiser le code</UButton>
        <UButton @click="toggleExpand" size="xl">{{ expanded ? 'Réduire' : 'Amplifier' }}</UButton>
      </div>
      <iframe
        ref="iframeRef"
        :width="expanded ? '' : '100%'"
        :height="expanded ? '' : '400px'"
        src="https://webtigerpython.ethz.ch"
        allow="usb;clipboard-write"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>

.wtp-iframe-container {
  margin: 1rem auto;
  position: relative;
  background: #fafafa;
  border-radius: 10 pt;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;

}

.iframe-fullscreen-overlay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 70vh;
  background: #f9f9f9;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

}
.iframe-fullscreen-overlay iframe {
  flex: 1;
  width: 100vw;
  height: 100vh;
  border: none;
}

</style>