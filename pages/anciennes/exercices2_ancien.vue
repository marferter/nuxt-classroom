<script setup>

import { marked } from 'marked'

/*création d'un objet questionQCM à défaut de base de donnée*/

const questionQCM_markdown = 
{
    "meta": {
        "UUID": "f4c9a2b3-2a1b-478b-8c6a-8a3c1bb47e11",
        "author": "marferter",
        "time": "2025-05-19T08:45:33Z",
        "versions": "1.0.0"
    },
    "data": {
        "question_type": "QCM",
        "title": "Comprendre la syntaxe Python",
        "question_prompt": "Que fait ce code Python ?\n```python\ndef add(a, b=2):\n    return a + b\n\nresult = add(3)\nprint(result)\n```",
        "options": [
            {
                "option": "La fonction `add` additionne 3 et 2, donc `print(result)` affiche **5**.",
                "truth": true,
                "explanations": "Le paramètre `b` vaut 2 par défaut, donc `add(3)` renvoie 5."
            },
            {
                "option": "`print(result)` affichera une erreur car il manque un argument.",
                "truth": false,
                "explanations": "La fonction `add` a un paramètre par défaut, donc l'appel `add(3)` est valide."
            },
            {
                "option": "Le code affiche `32` car il concatène les deux valeurs.",
                "truth": false,
                "explanations": "En Python, l'opérateur `+` additionne les nombres, il ne concatène pas ici."
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
                "option": "Un entier",
                "truth": false,
                "explanations": "L'opération retourne une chaîne, pas un entier."
            },
            {
                "option": "Une chaîne de caractères",
                "truth": true,
                "explanations": "La multiplication d'une chaîne par un entier en Python répète la chaîne : 3 * '7' => '777'."
            },
            {
                "option": "Une liste de trois éléments '7'",
                "truth": false,
                "explanations": "Ce serait le cas avec `[ '7' ] * 3`, mais pas avec `3 * '7'`."
            }
        ]
    }
}

/* Extraction des données à passer au qcm */

const type_markdown = questionQCM_markdown.data.question_type

const titre_markdown = questionQCM_markdown.data.title

const enonceQcm_markdown = questionQCM_markdown.data.question_prompt

const options_markdown = questionQCM_markdown.data.options

const type_text = questionQCM_text.data.question_type

const titre_text = questionQCM_text.data.title

const enonceQcm_text = questionQCM_text.data.question_prompt

const options_text = questionQCM_text.data.options


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


<div class="space-y-4">
    <MChoice_full
        :questionType="type_text"
        :questionTitle="titre_text"
        :questionPrompt="enonceQcm_text"
        :options="options_text"
    />

    <MChoice_full
        :questionType="type_markdown"
        :questionTitle="titre_markdown"
        :questionPrompt="enonceQcm_markdown"
        :options="options_markdown"
    />
</div>


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