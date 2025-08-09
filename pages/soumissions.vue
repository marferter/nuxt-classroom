<script setup lang="ts">
import { useAnswerSubmission } from '~/composables/useAnswerSubmission'
import type { Submission} from '~/types/directus-schema.ts';
import type {DirectusUser} from 'nuxt-directus'
import type { TableColumn } from '@nuxt/ui'

const {
  fetchSubmissions,
  fetching,
  fetchError,
  fetchSuccess
} = useAnswerSubmission()

const { getUsers,getUserById } = useDirectusUsers();
const user: DirectusUser = await getUserById({
  id: "4efd82b2-8ad3-4a26-9423-4d05a53b5348",
});

const users = ref<DirectusUser[]>([])

// Appelle la fonction au montage du composant
onMounted(async () => {
  const result = await getUsers({
    params: {
      fields: ['id','first_name','last_name'],
    },
  });
  
// Pour garantir que users.value contiendra toujours un tableau ; si result est un tableau, on l'utilise tel quel ; sinon, si data n'est pas null ou undefined, on prend result.data ; sinon le tableau vide (nullish coalescing) ; tout ça parce que la doc dit : In case Metadata are requested by global search querys: {"data":[...] "meta":{...}}
  users.value = Array.isArray(result) ? 
    result : 
      result.data ?? [];
})

const selectUsers = computed(() => {
  return users.value.map(user => ({
    label: `${user.last_name ?? ''} ${user.first_name ?? ''}`,
    id: String(user?.id)
  }))
}
)

const selectedUser = ref<string | undefined>(undefined)

const submissions = ref<Submission[]>([])

const onUserSelected = async () => {
  // Appelle fetchSubmissions avec le filtre sur l'utilisateur sélectionné
  submissions.value = await fetchSubmissions({ user_created: selectedUser.value })
}

//const columns: TableColumn<Submission>[]
</script>

<template>

    <pre> Utilisateurs {{ selectUsers
  }}</pre>

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