<script setup>
import { ContentRenderer } from '#components'
import { onMounted, ref } from 'vue'

const pageHackee = ref(
  {
    "champ-lambda":'',
    // "id": "content/activities/something.md",
    // "title": "Celui de l'activity, à récupérer",
    "body": {
      "type": "minimal",
      "value": [
        [
          "activity-mcq",
          {
            ":options": "[{\"option\":\"`3 + 4`\\n\",\"is\":false,\"explanation\":\"`3 + 4` est une *expression arithmétique* qui évalue à 7.\\n\"},{\"option\":\"`\\\"Hello, world!\\\"`\\n\",\"is\":true,\"explanation\":\"`\\\\\\\"Hello, world!\\\\\\\"` est une valeur littérale de type `str`.\\n\"},{\"option\":\"`sqrt(100)`\\n\",\"explanation\":\"`sqrt(100)` est une *expression (appel de fonction)* qui évalue à 10.\\n\"},{\"option\":\"`True`\\n\",\"is\":true,\"explanation\":\"`True` est une valeur littérale de type `bool`.\\n\"},{\"option\":\"`2 * (3 + 5)`\\n\",\"explanation\":\"`2 * (3 + 5)` est une *expression arithmétique* qui évalue à 16.\\n\"},{\"option\":\"`19 >= 18`\\n\",\"explanation\":\"`19 >= 18` est une *expression booléenne* qui évalue à `True`.\\n\"}]",
            "title": "Prompt simple et options avec code inline - syntaxe avec le *littéral block scalar*\n",
            "uuid": "f7ca7f81-e1c1-4b0c-916b-6a1809237a6f"
          }
        ],
        [
          "p",
          {},
          "Cochez toutes les valeurs littérales parmi les options suivantes :"
        ]
      ]
    }
  }
)


const { data: test } = await useAsyncData('activity', () => {
  return queryCollection('activities')
    .where('uuid', '=', '2649276c-e5ed-40ff-a509-52fe9349472e')
    .first()
})

const { data: activities } = await useAsyncData('all-activities', () => {
  return queryCollection('activities')
    .all()
})

</script>

<template>
  <main>
    <!-- <pre> {{ activities [0] }}</pre> -->
    <pre v-for="(activity, index) in activities"> Activité numéro {{ index }}
        {{ activity.uuid }}  {{ activity.activityTitle }} </pre>
    <!-- <pre> Page hackée : {{ pageHackee }}</pre> -->
    <!-- <ContentRenderer :value="pageHackee" /> -->
    <!-- <pre> test {{ test }}</pre> -->
    <!-- <ContentRenderer :value="test" /> -->
    <ContentRenderer v-for="(activity, index) in activities" :value="activity" />


  </main>
</template>