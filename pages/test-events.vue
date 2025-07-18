<script setup lang="ts">
import ActivityTest3 from '~/components/content/ActivityTest3.vue';

</script>

<template>
    <ActivityTest3 title="Test de passage d'events et de props ; gestion dans Activity"></ActivityTest3>

    <ActivityTest4 title="Test de passage d'events et de props ; gestion dans Awrapper">

        <template #solution>
            <p>Ceci est la solution.</p>
        </template>
    </ActivityTest4>
</template>