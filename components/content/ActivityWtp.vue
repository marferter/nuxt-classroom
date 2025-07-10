<script setup>

    import {computed, ref} from 'vue'
    import hljs from 'highlight.js'; // Import highlight.js

    const props = defineProps({
        title : {
            type: String,
            required : true
        },
        initialCode : {
            type: String,
            required : false
        },
        maxScore : {
            type : Number,
            required : false
        }
    });

    const userAnswer = ref('') //initialise une variable réactive pour stocker la réponse de l'utilisateur 

    //const submited = inject('submited')
    //const explain = inject('explain')
    
</script>

<template>

    <Awrapper :title="title">

        <slot></slot>

        <Wtp :initial-code="initialCode"/>

        <MdSolution>
            <slot name="solution"></slot>
        </MdSolution>
        
    </Awrapper>

</template>