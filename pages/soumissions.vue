<script setup lang="ts">
import { useAnswerSubmission } from '~/composables/useAnswerSubmission'
import type { Submission} from '~/types/directus-schema.ts';
import type {DirectusUser} from 'nuxt-directus'
import type { TableColumn } from '@nuxt/ui'

const {
  getSubmissions,
  fetching,
  fetchError,
  fetchSuccess
} = useAnswerSubmission()

const { getUsers,getUserById } = useDirectusUsers();
const user: DirectusUser = await getUserById({
  id: "4efd82b2-8ad3-4a26-9423-4d05a53b5348",
});

const allUsers = ref<DirectusUser[]>([])
const allLessons = ref([])

// Utilise useAsyncData au top-level pour profiter du SSR et éviter le warning
const { data: fetchedLessons } = await useAsyncData('all-lessons', () => {
  return queryCollection('content')
    .select('id')
    .all()
})
//console.log(fetchedLessons.value)

// Appelle la fonction au montage du composant pour les utilisateurs
onMounted(async () => {
  const fetchedUsers = await getUsers({
    params: {
      fields: ['id','first_name','last_name'],
    },
  });
  
  // Pour garantir que allUsers.value contiendra toujours un tableau
  allUsers.value = Array.isArray(fetchedUsers) ? 
    fetchedUsers : 
      fetchedUsers.data ?? [];
})

const selectUsers = computed(() => {
  return allUsers.value.map(user => ({
    label: `${user.last_name ?? ''} ${user.first_name ?? ''}`,
    id: String(user?.id)
  }))
}
)

const selectedUser = ref<string | undefined>(undefined)

const submissions = ref<Submission[]>([])

const onUserSelected = async () => {
  // Appelle fetchSubmissions avec le filtre sur l'utilisateur sélectionné
  submissions.value = await getSubmissions({ user_created: selectedUser.value })
}

</script>

<template>

  <pre> Leçons {{ fetchedLessons }}</pre>

    <!-- <pre> Utilisateurs {{ selectUsers
  }}</pre> -->

  <USelect
    v-model="selectedUser"
    :items="selectUsers"
    icon="i-lucide-user"
    placeholder="Selectionnez un.e étudiant.e"
    value-key="id"
    class="w-48"
    @update:model-value="onUserSelected"
  />



  <pre> Utilisateur sélectionné : {{ selectedUser }}</pre>

  <!-- <p v-if="user">{{ user.first_name }} {{ user.last_name }} </p>
  <p v-else>Utilisateur non trouvé</p> -->

  <pre>Soumissions de l'utilisateur {{ selectedUser }} : {{ submissions }}</pre>
  <div v-if="fetching">Chargement...</div>
  <div v-else-if="fetchError">Erreur : {{ fetchError }}</div>
  <ul v-else>
    <li v-for="submission in submissions" :key="submission.id">
      Titre : {{ submission.activity_title }} Timestamp : {{ submission.date_created }}
    </li>
  </ul>

  <UTable :data="submissions" class="flex-1" />

</template>