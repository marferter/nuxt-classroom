<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui'

    const items = ref<NavigationMenuItem[]>([
        {
            label: 'Démo des composants',
            icon: 'i-lucide-slack',
            // to: '/demo',
            children: [
                {
                    label: 'Choix multiples',
                    icon: 'i-lucide-file-check-2',
                    to: '/demo/mcq'  
                },
                {
                    label: 'Question ouverte',
                    icon: 'i-lucide-file-pen',
                    to: '/demo/short-answer'  
                },
                {
                    label: 'Code',
                    icon: 'i-lucide-file-code-2',
                    to: '/demo/wtp'  
                },
    
    
            ]
        },
        {
            label: 'Cours',
            icon: 'i-lucide-book-open',
            // to: '/Cours',

            children: [
                {
                    label: 'Fonctions sans paramètres',
                    icon: 'i-lucide-bookmark',
                    to: '/cours/fonctions-sans-parametres',
                    // disabled: true,
                },
                // {
                //     label: 'Page 2',
                //     icon: 'i-lucide-bookmark',
                //     to: '/cours/wtp',
                //     disabled: true,
                // },
            ]
        },
        {
            label: 'Espace enseignant',
            icon: 'i-lucide-shield-user',
            // disabled: true,
            children: [
                {
                    label: "Banque d'activités",
                    icon: 'i-lucide-landmark',
                    to: '/activities',
                },
                {
                    label: "Réviser les soumissions",
                    icon: 'i-lucide-chart-column',
                    to: '/admin',
                },
    
    
            ]
        },
        
    ])

</script>

<template>
    <UNavigationMenu :items="items" orientation="vertical" color="primary" class="text-xl [&_ul]:list-none [&_ul]:pl-0 [&_li]:text-lg mt-3"/>
</template>