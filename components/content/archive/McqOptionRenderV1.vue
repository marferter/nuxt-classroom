<script setup lang="ts">

    import type { McqOption } from '~/utils/mcqOption.ts'
    import CorrectAnswerIcon from '../icons/CorrectAnswerIcon.vue';
    import WrongAnswerIcon from '../icons/WrongAnswerIcon.vue';

    const props = defineProps<{

        opt: McqOption

    }>()

    const userAnswer = ref(false) //initialise une variable réactive pour stocker la réponse de l'utilisateur

    const userAnswerStatus = computed(() => {
    return userAnswer.value === props.opt.is
    })
    
    const submited = inject('submited')
    const explain = inject('explain')
    
</script>

<template>
    <div  
        :class="{'bg-elevated/50': !submited, 'bg-red-50': submited && !userAnswerStatus,'bg-green-50': submited && userAnswerStatus}"
        
        class="p-4 border border-neutral-300 rounded-lg shadow-sm flex items-center justify-between">

        <div >
            <label class="flex items-center space-x-2" >
                <UCheckbox color="primary" v-model="userAnswer" size="xl" />
                <!-- <div> {{ opt.option }} </div> -->
                 <div class="mdc-wrapper">
                    <MDC :value="opt.option" tag="div"/>
                </div>
            </label>
        </div>

        <CorrectAnswerIcon v-if="submited && userAnswerStatus"/>
        <WrongAnswerIcon v-if="submited && !userAnswerStatus"/>
    </div>

    <!--<div class="ml-4 text-neutral-500 text-xs" v-if="explanation"> {{props.explanation}}</div>
    -->

    <div v-if="explain && opt.explanation" class="text-sm ml-5 mt-1 mb-5 flex space-x-2">
        <label class="flex items-center space-x-1">
            <UCheckbox :default-value="opt.is" disabled/>
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