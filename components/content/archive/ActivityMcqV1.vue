<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption.ts'
    import {computed} from 'vue'

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
    <AwrapperV1 :title="title">
        <!--div> {{ prompt }} </div-->
        
        <slot></slot>

        <div v-for="(opt,index) in normalizedOptions" :key="index">
            <McqOptionRenderV1 :opt="opt">

            </McqOptionRenderV1>
        </div>
    </AwrapperV1>

</template>