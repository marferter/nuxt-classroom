<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption.ts'
    import CorrectAnswerIcon from './icons/CorrectAnswerIcon.vue';
    import WrongAnswerIcon from './icons/WrongAnswerIcon.vue';

    const props = defineProps<{
        opt: McqOption
        userAnswerCorrect: Boolean
    }>()

    const userAnswer = defineModel<boolean>() 

    // const userAnswerCorrect = computed(() => 
    // userAnswer.value === props.opt.is
    // )

    const submitted = inject('submitted')
    const explained = inject('explained')
    
</script>

<template>
    <div  
        :class="{
            'border-neutral-300': !submitted,
            'border-error-300': submitted && !userAnswerCorrect,
            'border-success-300': submitted && userAnswerCorrect}"
        
        class=" p-3 bg-neutral-50 border rounded-lg shadow-sm flex items-center justify-between">

        <div >
            <label class="flex items-center align-middle space-x-2 " >
                <UCheckbox color="primary" v-model="userAnswer" size="xl" />
                <!-- <div> {{ opt.option }} </div> -->
                 <div class="mdc-wrapper [&>p]:mt-0 [&>p]:mb-0 [&>p]:leading-tight">
                  <MDC :value="opt.option" tag="div"/>
                </div>
            </label>
        </div>

        <CorrectAnswerIcon v-if="submitted && userAnswerCorrect"/>
        <WrongAnswerIcon v-if="submitted && !userAnswerCorrect"/>
    </div>

    <!--<div class="ml-4 text-neutral-500 text-xs" v-if="explanation"> {{props.explanation}}</div>
    -->

    <div v-if="explained && opt.explanation && submitted" class=" mt-1 ml-5 mb-3 flex space-x-2">
        <label class="flex items-center space-x-1">
            <UCheckbox :default-value="opt.is" disabled/>
            <div class=" bg-primary-50 rounded-md p-1.5 [&>p]:text-xs">
                <MDC :value="opt.explanation" tag="div"/>
            </div>
        </label>
    </div>
</template>
