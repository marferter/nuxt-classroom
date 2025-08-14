<script setup>
const {getUsers} = useDirectusUsers()
//Récupérations des listes de pages de cours et d'utilsateurs au chargement de la page, SSR

//Requêtes pour récupérer les données
const {data : students } = await useAsyncData('all-students',() => {
return getUsers(
    {params : 
        {fields : ['id','first_name', 'last_name']}
    //     {filter : {"role": "90b71453-3030-43ca-94f5-d50d3281e714"}}
    }
)
})

const {data : lessons} = await useAsyncData('all-lessons', () => {
return  queryCollection('content').select('id').all()
})

//Transformation des données pour les listes du Select
const studentItems = computed(() => 
students.value?.map( student => ({
    label: `${student.first_name} ${student.last_name}`,
    value: student.id
}))
)

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
const activityItems = computed(() =>
activities.value?.map( activity => ({
    label: `${activity.activityTitle}`,
    value: `${activity.id}`
}))
)

const selectedActivityId = ref(null)

const {data: activity} = await useAsyncData('activity', () => 
{return queryCollection('activities').where('id','=',selectedActivityId.value).all()
},
{watch: [selectedActivityId]}
)

const selectedActivity = computed(() => activity.value?.[0] || null)

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
    return getItems({
        collection: 'submissions',
        params: {
            filter: {
                user_created: selectedStudent.value,
                activity_id: selectedActivity.value.uuid
            }
        }
    });
}, {watch: [selectedStudent,selectedActivity]}); 


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
    <div>
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
        <p> Activité : {{ selectedActivityId }}</p>

        <ContentRenderer v-if="selectedActivity" :value="selectedActivity" />
        <pre v-for="submission in submissions"> {{ submission.content }}</pre>
    </div>

</template>