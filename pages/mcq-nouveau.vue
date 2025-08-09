<script setup>
</script>

<template>
<ActivityMcqU
  :options="[
    { option: 'Paris', is: true, explanation: 'Paris est la capitale de la France.' },
    { option: 'Lyon', is: false, explanation: 'Lyon n’est pas la capitale.' },
    { option: 'Marseille', is: false, explanation: 'Marseille n’est pas la capitale.' }
  ]"
  uuid=8b4a35fe-ce68-45fe-a76b-66284fd455f9
  title="Quelle est la capitale de la France ?"
/>
</template>