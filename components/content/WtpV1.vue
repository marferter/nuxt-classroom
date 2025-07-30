<script setup>
import { onMounted, useTemplateRef } from 'vue';


const props = defineProps({
    initialCode: String
});


const iframeRef = useTemplateRef("wtpiframe");


onMounted(() => {
  //pour que chaque composant accède à son propre iframe
  const iframe = iframeRef.value;


  if (!iframe) {
    console.error("L'iframe n'a pas été trouvé !");
    return;
  }

  const defObject = {
    type: 'files',
    data: [{
      name: 'main.py',
      data: props.initialCode
    }]
  };

    iframe.addEventListener('load', () => {
    iframe.contentWindow.postMessage(defObject, "*");
    });


  window.addEventListener('message', function(event) {
    console.log(event.data)
});
});

</script>

<template>
  <iframe
      ref="wtpiframe"
      width="100%"
      height="400px" 
      src="https://webtigerpython.ethz.ch" allow="usb;clipboard-write"
  >
  </iframe>
</template>
