<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption'
    import {defaultOption} from '~/utils/mcqOption'
    import {ref, computed} from 'vue'

    const props = defineProps<{
    options: McqOption[];
    uuid: string;
    title?: string;
    maxScore?: number;
    }>();

    // La normalisation suivante permet de gérer le cas où aucune prop n'est passée ainsi que d'attribuer des valeurs par défaut aux propriétés ; la version suivante est plus élégante et flexible (avec le spread operator) que celle de la version V1 de ce composant ; elle s'appuie sur l'objet mcqOption par défaut.

    const normalizedOptions = computed(() => {
    if (!props.options) {
        return [];
    }
    return props.options.map((opt) => ({
        ...defaultOption,
        ...opt
    }));
    });
    
    const userAnswers = ref(normalizedOptions.value.map(() => false))

    const userAnswersCorrect = computed(() => 
        normalizedOptions.value.map((opt, i) => userAnswers.value[i] === opt.is))
    
</script>

<template>
    <Awrapper :title="title">
        <!--div> {{ prompt }} </div-->
        
        <slot></slot>

        <!-- Pour faire le test sur l'array réactif des réponses de l'user -->
        <div v-for="answer in userAnswers"> 
            <p> {{ answer }}</p>
        </div>

        <div v-for="correction in userAnswersCorrect"> 
            <p> {{ correction }}</p>
        </div>

        <div v-for="(opt,index) in normalizedOptions" :key="index">
            <McqOptionRender v-model="userAnswers[index]" :opt="opt">

            </McqOptionRender>
        </div>
    </Awrapper>

</template>