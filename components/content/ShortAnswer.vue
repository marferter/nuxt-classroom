<script setup lang="ts">

    import {computed} from 'vue'
    import hljs from 'highlight.js'; // Import highlight.js

    const props = defineProps<{
    options: McqOption[];
    prompt: string;
    code?: string;
    title?: string;
    maxScore?: number;
    }>();

    /*
    const props = withDefaults(defineProps<{
    options?: McqOption[]; // Make options optional
    prompt: string;
    title?: string;
    maxScore?: number;
    }>(), {
    options: () => [] // Default value
    });
    */

    const normalizedOptions = computed(() => {
    if (!props.options) {
        return [];
    }
    return props.options.map((opt: McqOption) => ({
        ...opt,
        is: typeof opt.is === "boolean" ? opt.is : false,
    }));
    });

    const userAnswer = ref('') //initialise une variable réactive pour stocker la réponse de l'utilisateur 

    //const submited = inject('submited')
    //const explain = inject('explain')
    
</script>

<template>
    <Awrapper :title="title">

        <slot></slot>

        <UTextarea v-model="userAnswer" :maxrows="4" autoresize class="w-full"/>

        <ShortAnswerSolution>
            <slot name="solution"></slot>
        </ShortAnswerSolution>
        
        <!--<CodeRender :code="code"/>-->
    </Awrapper>

</template>