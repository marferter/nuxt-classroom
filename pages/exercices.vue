<script setup>

import { marked } from 'marked'
import ActivityWrapper from '~/components/ActivityWrapper.vue'

/*création d'un objet questionQCM à défaut de base de donnée*/

const questionQCM = 
    {
        "meta": {
            "UUID": "123e4567-e89b-12d3-a456-426614174000",
            "author": "John Doe",
            "time": "2025-04-29T06:59:48Z",
            "versions": "1.0.0"
        },
        "data": {
            "question_type" : "QCM",
            "title": "Trouver l'erreur dans ce code JavaScript",
            "question_prompt": "Quel est le problème dans ce code ?\n```javascript\nlet x = 10;\nif(x = 5) {\n  console.log('Ceci est un test');\n}\n```",
            "options": [
            {
                "option": "`x = 5` est une affectation, pas une comparaison.",
                "truth": true,
                "explanations": "L'opérateur correct pour comparer est `===` ou `==`."
            },
            {
                "option": "Le console.log est incorrect.",
                "truth": false,
                "explanations": "Le `console.log` est valide, il n'y a pas d'erreur ici."
            },
            {
                "option": "Il manque une accolade fermante.",
                "truth": false,
                "explanations": "Toutes les accolades sont correctement fermées dans ce code."
            }
            ]
        }
    }

const questionQCM_text = 
{
    "meta": {
        "UUID": "3b8f0c7d-1eac-4a8b-8c9a-5e1b0e2a77f0",
        "author": "marferter",
        "time": "2025-05-19T08:45:33Z",
        "versions": "1.0.0"
    },
    "data": {
        "question_type": "QCM",
        "title": "Python : Types et opérations",
        "question_prompt": "Quel type de données est retourné par l'expression : 3 * '7' en Python ?",
        "options": [
            {
                "option": "Une chaîne de caractères",
                "truth": true,
                "explanations": "La multiplication d'une chaîne par un entier en Python répète la chaîne : 3 * '7' => '777'."
            },
            {
                "option": "Un entier",
                "truth": false,
                "explanations": "L'opération retourne une chaîne, pas un entier."
            },
            {
                "option": "Une liste de trois éléments '7'",
                "truth": false,
                "explanations": "Ce serait le cas avec `[ '7' ] * 3`, mais pas avec `3 * '7'`."
            }
        ]
    }
}

/* Extraction des données à passer au composant */
const type = questionQCM.data.question_type

const titre = questionQCM.data.title

const enonceQcm = questionQCM.data.question_prompt

const options = questionQCM.data.options


</script>

<template>
    <div>
        <h1 class="font-bold text-5xl text-primary text-center"> Exercices </h1>
    </div>

    <!-- Cette section servait de test pour voir si les données de la question sont correctment importées depuis questionQCM -->
    <!--
    <div>
        <p> Type : {{ type }} </p>

        <p> Titre du QCM : {{ titre }} </p>
        
        <p> Enoncé de la question : {{ enonceQcm }} </p>

        <p> Options : </p>

        <div v-for="(opt, index) in options" :key="index">
            
            <p> {{ opt.option }} </p>

        </div>

        <p> Explications : </p>

        <div v-for="(opt, index) in options" :key="index">
            <p> {{ opt.explanations }} </p>
        </div>
    </div>
    -->



    <ActivityWrapper
        :questionType="type"
        :questionTitle="titre"
        :questionPrompt="enonceQcm"
        :options="options"
    />
 


    <!--  Composant proposant une présentation alternative pour la correction
    <div>
        <MChoice_full2 
        :elementType="type"
        :questionTitle="titre"
        :questionPrompt="enonceQcm"
        :options="options"
        />
    </div>
    -->
    


</template>