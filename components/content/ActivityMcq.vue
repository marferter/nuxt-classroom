<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption.ts'
    import {computed} from 'vue'
    import hljs from 'highlight.js'; // Import highlight.js

    const props = defineProps<{
    options: McqOption[];
    uuid: string;
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
    
</script>

<template>
    <Awrapper :title="title">
        <!--div> {{ prompt }} </div-->
        
        <slot></slot>

        <div v-for="(opt,index) in normalizedOptions" :key="index">
            <McqOptionRender :opt="opt">

            </McqOptionRender>
        </div>
    </Awrapper>

</template>