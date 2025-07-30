<script setup>
import { onMounted, ref, onBeforeUnmount} from 'vue';


const props = defineProps({
    initialCode: String
});

//pour le test des id des iframes
//const componentId = Math.random().toString(36).slice(2, 9);

const iframeRef = ref(null)
const expanded = ref(false)

const toggleExpand = () => {
  expanded.value = !expanded.value
}

const sendInitialCode = () => {
  if (!iframeRef.value) {
    console.error("L'iframe n'est pas prête !")
    return
  }

  const messagePayload = {
    type: 'files',
    data: [{
      name: 'main.py',
      data: props.initialCode
    }]
  }
  
  //Si ça marche il faudra remplacer * pour vérifier l'origine du message...
  iframeRef.value.contentWindow.postMessage(messagePayload,"*")
  console.log("Code initial envoyé à l'iframe")
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

  if (msg && msg.type === "code") {
    console.log("Exécution de code détectée dans mon iframe")
    console.log(msg.data)
  }
}


onMounted(() => {
  //pour mettre en évidence que ce sont des instances différentes
  /*console.log(
    `[Instance ${componentId}] Mon composant est monté. Mon iframeRef pointe vers :`, 
    iframeRef.value
  */

  if (iframeRef.value) {
    iframeRef.value.addEventListener('load',sendInitialCode)
  }

  //console.log('message envoyé à',iframeRef.value)

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
  <iframe
      ref="iframeRef"
      width="100%"
      height="400px" 
      src="https://webtigerpython.ethz.ch" allow="usb;clipboard-write"
  >
  </iframe>
</template>
