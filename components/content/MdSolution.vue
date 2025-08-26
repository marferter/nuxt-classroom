<script setup>

</script>

<template>
    <!-- Solution affichée avec une icône et un slot pour le contenu -->
    <div class="flex gap-1 items-center rounded-md bg-primary-50 p-1 text-sm">
        <UIcon name="i-lucide-lightbulb" class="size-20 text-primary-500" />
        <slot />
    </div>
</template>