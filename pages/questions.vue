<script setup>
// 1. On utilise useAsyncData pour récupérer les données côté serveur (ou client lors de la navigation)
//    'all-questions' est une clé unique pour cette requête.
const { data: questions } = await useAsyncData('all-questions', () => {
  return queryCollection('questions').find()
})
</script>

<template>
  <main>
    <pre>{{ questions }}</pre>
    
    <UContainer class="py-8">
      <h1 class="text-3xl font-bold mb-8">Banque de Questions</h1>

      <!-- On vérifie que le tableau de questions existe et n'est pas vide -->
      <div v-if="questions && questions.length" class="space-y-8">
        <!-- 4. On boucle sur chaque document "question" trouvé dans le tableau -->
        <div v-for="question in questions" :key="question._id">
          <!-- 5. On utilise ContentRenderer pour afficher le contenu de chaque question -->
          <!--    Comme chaque fichier ne contient qu'un appel de composant, cela affichera le composant Activity -->
          <ContentRenderer :value="question" />
        </div>
      </div>

      <!-- Message affiché si aucune question n'est trouvée -->
      <div v-else>
        <p>Aucune question n'a été trouvée dans le dossier <code>content/questions</code>.</p>
      </div>
    </UContainer>
    <p>{{ questions === undefined ? 'questions est undefined' : 'questions existe' }}</p>
  </main>
</template>