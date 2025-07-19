<script setup>

    import {computed, ref} from 'vue'
    import hljs from 'highlight.js'; // Import highlight.js

    const props = defineProps({
        title : {
            type: String,
            required : true
        },
        uuid : {
            type:String,
            required : false
        },
        maxScore : {
            type : Number,
            required : false
        }
    });

    const userAnswer = ref('') //initialise une variable réactive pour stocker la réponse de l'utilisateur 

    const submitted = ref(false)
    const explained = ref(false)

    const clearTextArea = () => {
        if (submitted.value === false) {
            userAnswer.value = ''
        }
    }

    const handleSubmit = (status) => {
        //toggleSubmitted()
        clearTextArea()
        submitted.value = status
    }

    const handleExplain = (status) => {
        explained.value = status
    }
    
</script>


<template>

    <p> Variable réactive modifée dans le composant petit-enfant (saisie dans le champ de texte): {{userAnswer}} </p>

    <p> Evénement émis par la composant enfant (bouton soumettre / nouvel essai) qui change la valeur de la variable submited : {{ submitted }}</p>

    <p> Evénement émis par le composant enfant (bouton afficher / masquer explications) qui change la valeur de la variable submited : {{ explained }}</p>

    <Awrapper4 :title="title" :submitted="submitted" :explained="explained" @explain="handleExplain" @submit="handleSubmit">

        <slot></slot>

        <UTextarea v-model="userAnswer" :maxrows="4" autoresize class="w-full"/>

        <MdSolution4 v-if="explained && submitted">
            <slot name="solution"></slot>
        </MdSolution4>
        
    </Awrapper4>

</template>