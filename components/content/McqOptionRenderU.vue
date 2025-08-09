<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption.ts'
    import CorrectAnswerIcon from './icons/CorrectAnswerIcon.vue';
    import WrongAnswerIcon from './icons/WrongAnswerIcon.vue';

    const props = defineProps<{
        opt: McqOption,
        selected: boolean
    }>()
    const emit = defineEmits(['select'])

    const userAnswerCorrect = computed(() => 
    props.selected === props.opt.is
    )

    const submitted = inject('submitted')
    const explained = inject('explained')
    
</script>

<template>
    <div  
        :class="{'border-neutral-300': !submitted, 'border-error-300': submitted && !userAnswerCorrect,'border-success-300': submitted && userAnswerCorrect}"
        
        class=" p-4 bg-neutral-50 border rounded-lg shadow-sm flex items-center justify-between">

        <div >
            <label class="flex items-center space-x-2" >
                <UCheckbox
                    color="primary"
                    icon="i-lucide-squircle"
                    :model-value="selected"
                    @update:model-value="emit('select')"
                    size="xl"
                />
                <!-- <div> {{ opt.option }} </div> -->
                 <div class="mdc-wrapper">
                    <MDC :value="opt.option" tag="div"/>
                </div>
            </label>
        </div>

        <CorrectAnswerIcon v-if="selected && submitted && userAnswerCorrect"/>
        <WrongAnswerIcon v-if="selected && submitted && !userAnswerCorrect"/>
    </div>

    <!--<div class="ml-4 text-neutral-500 text-xs" v-if="explanation"> {{props.explanation}}</div>
    -->

    <div v-if="explained && opt.explanation && submitted" class="text-sm ml-5 mt-1 mb-5 flex space-x-2">
        <label class="flex items-center space-x-1">
            <UCheckbox
                icon="i-lucide-squircle" 
                :default-value="opt.is" 
                disabled/>
            <div class="mdc-wrapper">
                <MDC :value="opt.explanation" tag="div"/>
            </div>
        </label>
    </div>
</template>

<style>

.mdc-wrapper p {
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 line-height: 1 !important;
}

</style>