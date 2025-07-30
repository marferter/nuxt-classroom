<!--Solution de Copilot pour pouvoir expand la fenêtre wtp-->

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  initialCode: String
})

const iframeRef = ref(null)
const expanded = ref(false)

function toggleExpand() {
  expanded.value = !expanded.value
}

onMounted(() => {
  const iframe = iframeRef.value

  if (!iframe) {
    console.error("L'iframe n'a pas été trouvé !")
    return
  }

  const defObject = {
    type: 'files',
    data: [{
      name: 'main.py',
      data: props.initialCode
    }]
  }

  iframe.addEventListener('load', () => {
    iframe.contentWindow.postMessage(defObject, "*")
  })

  // pour recevoir le message python ready
  window.addEventListener('message', function(event) {
    console.log(event.data)
  })

  iframe.addEventListener('message', function(event) {
  // Optionnel : vérifier l'origine
  // if (event.origin !== "https://test.webtigerpython.ethz.ch") return;

  const msg = event.data;
  if (msg && msg.type === "code") {
    // Ici, code lancé (par clic sur "Run" dans l'iframe OU par postMessage parent)
    console.log("Exécution de code détectée !", msg.data);
  }
});
})
</script>

<template>
  <div>
    <!-- Affichage normal -->
    <div v-if="!expanded" class="wtp-iframe-container">
      <iframe
        ref="iframeRef"
        width="100%"
        height="400px"
        src="https://webtigerpython.ethz.ch"
        allow="usb;clipboard-write"
      ></iframe>
      <UButton @click="toggleExpand" size="xl"> Plein écran </UButton>
    </div>
    <!-- Overlay fullscreen quand élargi : solution de Copilot-->
    <Teleport to="body">
      <div v-if="expanded" class="iframe-fullscreen-overlay">
        <UButton @click="toggleExpand" size="xl"> Réduire </UButton>
        <!--<button class="close-btn" @click="toggleExpand">
          Fermer
        </button>-->
        <iframe
          ref="iframeRef"
          width="100%"
          height="100%"
          src="https://webtigerpython.ethz.ch"
          allow="usb;clipboard-write"
        ></iframe>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>

.wtp-iframe-container {
  /*max-width: 700px;*/
  margin: 1rem auto;
  position: relative;
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  padding-top: 2.5rem;
}
/*
.expand-btn {
  position: absolute;
  top: 8px;
  right: 15px;
  z-index: 10;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 3px 12px;
  font-size: 0.95em;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
*/
.iframe-fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: #f9f9f9;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 0;
}
.iframe-fullscreen-overlay iframe {
  flex: 1;
  width: 100vw;
  height: 100vh;
  border: none;
}
.close-btn {
  position: absolute;
  top: 16px;
  right: 28px;
  z-index: 10000;
  background: white;
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0.5em 1.2em;
  font-size: 1.2em;
}
</style>