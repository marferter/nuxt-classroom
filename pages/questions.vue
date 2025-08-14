<script setup>
import { ContentRenderer } from '#components'
import { onMounted, ref } from 'vue'

// 1. On utilise useAsyncData pour récupérer les données côté serveur (ou client lors de la navigation)
//    'all-questions' est une clé unique pour cette requête.
const pages = ref([])
const questions = ref([])
const activityIsolee = ref([])
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
        },
        [
          "p",
          {},
          "Cochez toutes les valeurs littérales parmi les options suivantes :"
        ]
      ]
      ]
    }
  }
)

async function fetchPages() {
  const { data } = await useAsyncData('all-pages', () => {
    return queryCollection('content').all()
  })
  pages.value = data.value
  // if (Array.isArray(pages.value) && pages.value[2]?.body?.value?.[2]) {
  //   activityIsolee.value = pages.value[2].body.value[2]
  //   pageHackee.value.body.value.push(activityIsolee.value)
  // }
}

fetchPages()

async function fetchQuestions() {
  const { data } = await useAsyncData('all-questions', () => {
    return queryCollection('questions').all()
  })
  questions.value = data.value
}

fetchQuestions()

// onMounted(() => {
//   fetchPages()
//})

// const { data: questions } = await useAsyncData('all-questions', () => {
//   return queryCollection('questions').all()
// })

// const { data: page } = await useAsyncData(route.path, () => {
//   return queryCollection('content').path(route.path).first()
// })


const pageTitles = computed(() => Array.isArray(pages.value) ? pages.value.map(page => page.id) : [])

const { data: test } = await useAsyncData('activity', () => {
  return queryCollection('activities')
    .where('uuid', '=', '2649276c-e5ed-40ff-a509-52fe9349472e')
    .first()
})

</script>

<template>
  <main>
    <!-- <pre> Activité isolée : {{ activityIsolee }}</pre>
    <pre> Page hackée : {{ pageHackee }}</pre>
    <ContentRenderer v-if="Array.isArray(pages) && pages[2] && pages[2].body" :value="pages[2]" /> -->
    <pre> test {{ test }}</pre>
    <ContentRenderer v-if="test" :value="test" />

    <!-- <ContentRenderer :value="pageHackee" /> -->
<!-- 
    <pre> Page hackée : {{ pageHackee }}</pre> -->
    <!-- <pre v-if="Array.isArray(questions) && questions.length > 7"> Question :{{ questions[3] }}</pre> -->

    <!-- <pre v-if="Array.isArray(pages) && pages.length > 7">Page : {{ pages[3] }}</pre> -->
    <!-- <pre>{{ pages[2].body.value[2] }}</pre> -->

    
    <!--  Ne fonctionnent pas car la valeur donnée n a pas le format attendu
      <ContentRenderer :value="pages[9]?.body" />
    <MDCRenderer :body="pages[9].body" :data="pages[9].data"/> -->

    <!-- <pre>{{ pages }}</pre> -->
    <!-- <div v-for="page in pages" >
      <p>{{ page.id }}</p>
      <p v-for="block of page.body.value">{{block}}</p>
    </div> -->

    <!-- <p v-if="Array.isArray(pages)">{{ pages.map(page => page.id) }}</p> -->
    
  
  </main>
</template>