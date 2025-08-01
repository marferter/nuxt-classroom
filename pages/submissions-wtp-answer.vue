<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WtpExpand from '~/components/content/WtpExpand.vue';

const { getItems } = useDirectusItems();

// On n'utilise pas d'interface, donc la variable sera de type `any[]`
const submissions = ref<any[] | null>(null);
const error = ref<any>(null);
const isLoading = ref(false);

const fetchSubmissions = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // On appelle getItems sans le type générique `<Submission>`
    const items = await getItems({
      collection: "submissions_wtp",
      params: {
        fields: [
            'user_answer',
            'id'
        ]
      }
    });
    submissions.value = items;
  } catch (e) {
    console.error("Erreur lors de la récupération des soumissions :", e);
    error.value = e;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSubmissions();
});
</script>

<template>
  <div>
    <h1>Éléments de "submissions_wtp" (sans interface)</h1>
    
    <div v-if="isLoading">
      <p>Chargement des données...</p>
    </div>
    
    <div v-else-if="error" style="color: red;">
      <p>Une erreur est survenue lors du chargement des données.</p>
      <pre>{{ error.message || error }}</pre>
    </div>
    
    <div v-else-if="submissions && submissions.length > 0">
      <h2>Liste des soumissions :</h2>
      
      <!-- On crée une liste non ordonnée -->
      <ul>
        <!-- On boucle sur chaque 'submission' dans le tableau 'submissions' -->
        <!-- :key est important pour que Vue puisse suivre chaque élément -->
        <li v-for="submission in submissions" :key="submission.id" class="submission-item">
          <!-- Affichez les champs qui vous intéressent -->
          <strong>ID :</strong> {{ submission.id }} <br>
          <!-- <strong>Titre :</strong> {{ submission.question_title }} <br> -->
          <strong>Code de l'élève :</strong> <pre>{{ submission.user_answer }} </pre><br>
        </li>
      </ul>

      <WtpExpand 
        v-for="submission in submissions" :key="submission.id"
        :initial-code="submission.user_answer"
        >
    </WtpExpand>

      <hr style="margin: 2rem 0;">

      <h3>Données brutes pour le débogage :</h3>
      <pre>{{ submissions }}</pre>
    </div>
    
    <div v-else>
      <p>Aucune donnée à afficher.</p>
    </div>
  </div>
</template>

<style scoped>
pre {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>