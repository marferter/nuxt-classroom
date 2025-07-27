<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption.ts'
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
    
</script>

<template>
    <AwrapperV1 :title="title">
        <!--div> {{ prompt }} </div-->
        
        <MDC :value="prompt" tag="div"/>

        <CodeRender v-if="code" :code="code"/>

        <div v-for="(opt,index) in normalizedOptions" :key="index">
            <McqOptionRender :opt="opt">

            </McqOptionRender>
        </div>

        <slot :data="props" />
    </AwrapperV1>

</template>