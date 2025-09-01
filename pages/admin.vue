<script setup>
// definePageMeta({
//   requiresAuth: true,          // exige d'être connecté
//   requiredRole: 'admin'        // exige le rôle 'admin'
// })

const {getUsers} = useDirectusUsers()


//Récupérations des listes de pages de cours et d'utilsateurs au chargement de la page, SSR
//Requêtes pour récupérer les données
const {data : students } = await useAsyncData('all-students',() => {
return getUsers({
    params: {
        fields: ['id', 'first_name', 'last_name'],
        filter: { "role": "90b71453-3030-43ca-94f5-d50d3281e714" }
    }
})
})

const {data : lessons} = await useAsyncData('all-lessons', () => {
return  queryCollection('lessons').select('id').all()
})

//Transformation des données pour les listes du Select
const studentItems = computed(() => [
    { label: 'tous.tes', value: 'all' },
    ...(students.value?.map(student => ({
        label: `${student.first_name} ${student.last_name}`,
        value: student.id
    })) ?? [])
])

const lessonItems = computed(() => 
lessons.value?.map( lesson => (lesson.id)
)
)

//Initialisation des variables pour l'item sélectionné
const selectedLesson = ref(null)
const selectedStudent = ref(null)

const {data: activities, refresh: refreshActivities} = await useAsyncData('lesson-activities', () => 
{return queryCollection('activities')
    .where('lessonId','=',selectedLesson.value)
    .select('id','activityTitle','lessonId')
    .all()
},
{watch: [selectedLesson]}
)

const activityItems = computed(() => [
    { label: 'Toutes', value: 'all' },
    ...(activities.value?.map(activity => ({
        label: `${activity.activityTitle}`,
        value: `${activity.id}`
    })) ?? [])
])

const selectedActivityId = ref(null)

const {data: selectedActivities} = await useAsyncData('activity', () => {
    if (selectedActivityId.value === 'all') {
        return queryCollection('activities').where('lessonId','=',selectedLesson.value).all();
    } else {
        return queryCollection('activities').where('id', '=', selectedActivityId.value).all();
    }
}, {watch: [selectedActivityId]});

// const selectedActivity = computed(() => activity.value?.[0] || null)

//Récupération des soumissions avec filtres (réactif); voir comment utiliser le refresh
// const {data: submissions, refresh} = await useAsyncData(

//     watch: [selectedStudent,selectedActivity]
// )
//@update:model-value="onUserSelected"

// const currentSubmissions = computed(() => submissions)

const { getItems } = useDirectusItems()

const {data: submissions, refreshSubmissions} = await useAsyncData('submissions', () => {
    console.log("Filtering submissions for user:", selectedStudent.value);
    console.log("Filtering submissions for activity:", selectedActivity.value.uuid);
    // Récupère tous les uuid des activités sélectionnées
    const activityUuids = Array.isArray(selectedActivities.value)
        ? selectedActivities.value.map(a => a.uuid)
        : selectedActivities.value?.uuid
    return getItems({
        collection: 'submissions',
        params: {
            filter: {
                user_created: selectedStudent.value,
                activity_id: Array.isArray(activityUuids) ? { _in: activityUuids } : activityUuids
            }
        }
    });
}, {watch: [selectedStudent,selectedActivities]}); 


</script>

<template>
    <h1> Ebauche d'une page de révision des soumissions </h1>
<!-- <pre>
    Leçons : {{ lessons }}
</pre>
<pre>
    Etudiant.e.s : {{ students }}
</pre>
<pre> 
    Activités : {{ activities }}
</pre> -->

<!-- <pre> Liste pour sélectionner l'activité : {{ activityItems }}</pre> -->

    <div class="overflow-auto">
        <p> Veuillez sélectionner une leçon : </p>

        <USelect
            v-model="selectedLesson"
            :items="lessonItems"
            icon="i-lucide-notebook"
            placeholder="Leçon"
            class="w-48"
            :ui="{ content: 'min-w-fit' }"
        />
    </div>

    <div>
        <p> Veuillez sélectionner une activité : </p>
        <USelect
        v-model="selectedActivityId"
        :items="activityItems"
        icon="i-lucide-pencil"
        placeholder="Activité"
        class="w-48"
        :ui="{ content: 'min-w-fit' }"
        />
    </div>

    <div>
        <p> Veuillez sélectionner un.e étudiant.e : </p>
    <USelect
        v-model="selectedStudent"
        :items="studentItems"
        icon="i-lucide-user-round-pen"
        placeholder="Étudiant.e"
        class="w-48"
        :ui="{ content: 'min-w-fit' }"
    />
    </div>

    <div>
        <p> Étudiant.e : {{ selectedStudent }} </p>
        
        <div v-for="activity in selectedActivities">
            <p> Activité : {{ activity.uuid }}</p>
            <ContentRenderer  :value="activity" />
        </div>

        <p> {{ activityUuids }}</p>

        <div v-for="submission in submissions">
            <h2> {{ submission.user_created.first_name }}</h2>
            <h3> {{ submission.activity_title }} </h3>
            <pre > {{ submission.content }}</pre>
        </div>
    </div>


</template>