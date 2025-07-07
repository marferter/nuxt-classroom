<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<{
    initialCode?: string
}>();

onMounted(() => {
  const iframe = document.querySelector("#iframe");

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

<iframe width="100%" src="https://webtigerpython.ethz.ch" id="iframe" allow="usb;clipboard-write">
</iframe>

</template>
