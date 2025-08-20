<script setup>
import { ref } from 'vue'

//requête originale qui renvoie toutes les activités
const { data: activities } = await useAsyncData('all-activities', () => {
  return queryCollection('activities')
    .all()
})



</script>

<template>

  <main >

    <h1> Banque d'activités </h1>

    <p> Cette page est une ébauche de banque d'activités ; elle présente un rendu de toutes les activités présentes dans les dossiers "demo" et "cours". </p>

    <h2> Fonctionnalités prévues </h2>
    <ul class="list-disc pl-6">
      <li> Pour chaque type d'activity, création d'une variante du composant spécifique pour l'"aperçu", plus compacte.</li>
      <li> Ajout de menus déroulants pour filter et rechercher par type d'activité, par leçon, par module, par UUID, ...</li>
      <li> Pour faciliter la duplication d'activités dans une autre page de cours : tickboxes pour sélectionner une ou plusieurs activités et bouton "copier".</li>
    </ul>

    

    <div class=space-y-6> 
    <div  v-for="(activity, index) in activities">
      <USeparator />
        <div class="flex items-center gap-2">
          <h3> UUID :</h3>
          <p> {{ activity.uuid }}</p>
        </div>
        <div class="flex items-center gap-2">
          <h3> Tirée de la page :</h3>
          <p> {{ activity.lessonId }}</p>
        </div>

      <ContentRenderer  :value="activity" />
    </div>
    </div>

  </main>
</template>