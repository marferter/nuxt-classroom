<script setup>

const route = useRoute()

const realPath = computed(() => {
  const parts = route.path.split('/')
  parts.shift() // Enlever le "/" initial
  parts.shift() // Enlever le segment "source"
  return '/' + parts.join('/')
})

const { data: page } = await useAsyncData(route.path, () => {
  console.log('Path modifié',realPath.value)
  return queryCollection('lessons').path(realPath.value).first()
})

const { login } = useDirectusAuth();

const user = useDirectusUser();

onBeforeMount(async () => {
  // Si l'utilisateur n'est pas connecté, lance le login
  if (!user.value) {
    //await login({ email: "prof.test@edufr.ch", password: "cintrisinidirictiS27!" })
    await login({ email: "admin@21-learning.com", password: "Van.Rossum$21" })
    //pour vérifier que user.value est bien renseigné
    //console.log('Connecté !', user.value)
  } else {
    //log si déjà connecté
    console.log('Déjà connecté !', user.value)
  }
})

//la variable suivante sert à tester le parsing du md et le rendu avec des composants NuxtMDC
/* const rawMd = `# Un fichier au contenu simple pour explorer la manipulation de l'AST

::ActivityMcq
---
title : Question 1
uuid: 9e3cb5b9-d553-4019-bf85-1634d111d1ff
options :
  - option : "Option 1"
    is : true
    explanation : "C'est la bonne réponse."
  - option : "Option 2"
    is : false
    explanation : "C'est incorrect."
  - option : "Option 3"
    is : false
    explanation : "C'est aussi incorrect."
---
 Cochez la bonne réponse parmi les options suivantes :
::


::ActivityMcq
---
title : Question 2
uuid: 27ecb20a-6fb6-460f-a07d-02d337901adf
options :
  - option : "Option A"
    is : true
    explanation : "C'est la bonne réponse."
  - option : "Option B" 
    is : false
    explanation : "C'est incorrect."
  - option : "Option C"
    is : false
    explanation : "C'est aussi incorrect."
---
Cochez la bonne réponse parmi les options suivantes 
::
`
*/

//const parsedMd = await parseMarkdown(rawMd)

//voici ce qu'on trouve dans le champ rawBody de la base de données ; c'est un format bizarre avec des échappements doubles bizarres qui font qu'ensuite on n'arrive plus à parser correctement, alors que tout marche très bien si je copie le contenu du fichier manuellement.
/*const rawBody = `
# Un fichier au contenu simple pour explorer la manipulation de l'AST \\n\\n::ActivityMcq\\n---\\ntitle : Question 1\\nuuid: 9e3cb5b9-d553-4019-bf85-1634d111d1ff\\noptions :\\n  - option : \"Option 1\"\\n    is : true\\n    explanation : \"C'est la bonne réponse.\"\\n  - option : \"Option 2\"\\n    is : false\\n    explanation : \"C'est incorrect.\"\\n  - option : \"Option 3\"\\n    is : false\\n    explanation : \"C'est aussi incorrect.\"\\n---\\n Cochez la bonne réponse parmi les options suivantes :\\n::\\n\\n\\n::ActivityMcq\\n---\\ntitle : Question 2\\nuuid: 27ecb20a-6fb6-460f-a07d-02d337901adf\\noptions :\\n  - option : \"Option A\"\\n    is : true\\n    explanation : \"C'est la bonne réponse.\"\\n  - option : \"Option B\" \\n    is : false\\n    explanation : \"C'est incorrect.\"\\n  - option : \"Option C\"\\n    is : false\\n    explanation : \"C'est aussi incorrect.\"\\n---\\nCochez la bonne réponse parmi les options suivantes \\n::\\n\\n\\n
`
*/

//la fonction suivante sert à supprimer ces échappements de trop et à faire l'expérience complète de prendre le champ rawbody dans la DB, le parsed puis le rendre uniquement avec des composants nuxtMDC
// const cleanRawValue = (rawValue) => {
//   return rawValue.replace(/\\n/g, '\n').replace(/\\"/g, '"');
// };

// const parsedPage = ref(null)

// watch(
//   () => page.value?.rawbody,
//   async (rawbody) => {
//     if (rawbody) {
//       const cleanedBody = cleanRawValue(rawbody);
//       parsedPage.value = await parseMarkdown(cleanedBody);
//     }
//   },
//   { immediate: true }
// );

// const showMdcData = ref(false)

const formattedMarkdown = computed(() => {
  const replaced = page.value.rawbody.replace(/\\n/g, '\n');
  return replaced;
});


</script>

<template>
    <main>
        <h1 v-if="page"> {{ page.title }} </h1>
        <h2> Markdown source </h2>
        <p> Voici le Markdown à la source du contenu (fichier .md de la collection 'lessons') ; <ULink href="#db-preview">plus bas</ULink> se trouve l'entrée correspondante de la base de données Content. </p>
        <pre style="white-space: pre-wrap"> {{ formattedMarkdown }} </pre>

        <USeparator />
        <div id="db-preview">
            <h2> Entrée correspondante dans la base de données Content </h2>
            <p> Voici les comment cette page est représentée dans la base de données Content. </p>
            <p> body.value contient l'AST résultant du parsing du Markdown par Content.</p>
            <pre v-if="page" style="white-space: pre-wrap">{{ page }} </pre>

            <!-- <UButton @click="showMdcData = !showMdcData"> 
                {{ showMdcData ? "Masquer l'HAST de NuxtMDC" : "Comparer avec l'HAST de NuxtMDC" }}
            </UButton>
            <div v-if="showMdcData">
                <h3> Parsing par Nuxt MDC</h3>
                <p> Voici l'Hypertext Abstract Syntax Tree qui résultant du parsing du Markdown par MDC :</p>
                <pre v-if="parsedPage" style="white-space: pre-line">{{ parsedPage }}</pre>
            </div> -->
        </div>
        <!-- <pre> {{ parsedMd }}</pre> -->
        <!-- <MDCRenderer :body="parsedMd.body"/> -->
        <!-- <pre> {{ parsedRawBody }}</pre> -->
        <!-- <MDCRenderer :body="parsedRawBody.body"/> -->
        
        <!-- <MDCRenderer :body="parsedPage.body"/> -->
    </main>
</template>


