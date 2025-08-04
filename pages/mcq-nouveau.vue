<script setup>
</script>

<template>
<ActivityMcqU
  :options="[
    { option: 'Paris', is: true, explanation: 'Paris est la capitale de la France.' },
    { option: 'Lyon', is: false, explanation: 'Lyon n’est pas la capitale.' },
    { option: 'Marseille', is: false, explanation: 'Marseille n’est pas la capitale.' }
  ]"
  uuid="exemple-uuid-123"
  title="Quelle est la capitale de la France ?"
/>
</template>