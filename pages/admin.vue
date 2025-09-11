<script setup>

const {getUsers} = useDirectusUsers()
const { getItems } = useDirectusItems()

// Auth Middleware : page résevée au rôle teacher
definePageMeta({
    middleware: [
        function (to, from) {
            const user = useDirectusUser()
            if (user.value.role !== 'e901035a-903b-4b1b-aa14-c6520e352ed5') {
                return navigateTo('/forbidden')
            }
        }
    ],
})


//Récupération de la liste des utilisateurs
const {data : students } = await useAsyncData('all-students',() => {
return getUsers(
    {params : 
        {
            fields : ['id','first_name', 'last_name'],
            filter : {role: "90b71453-3030-43ca-94f5-d50d3281e714"}
        }
    }
)
})

//Transformation des données pour les listes du Select
const studentItems = computed(() => 
students.value?.map( student => ({
    label: `${student.first_name} ${student.last_name}`,
    value: student.id
}))
)


//Initialisation de la variables pour l'item sélectionné
const selectedStudent = ref(null)

//Récupération de la liste des leçons
const {data : lessons} = await useAsyncData('all-lessons', () => {
return  queryCollection('lessons').select('id').all()
})

//Transformation des données pour les listes du Select
const lessonItems = computed(() => 
lessons.value?.map( lesson => (lesson.id)
)
)

//Initialisation de la variable pour l'item sélectionné
const selectedLesson = ref(null)


//Récupération de la liste des activités sur la page sélectionnée
const {data: activities, refresh: refreshActivities} = await useAsyncData('lesson-activities', () => 
{return queryCollection('activities')
    .where('lessonId','=',selectedLesson.value)
    .select('id','activityTitle','lessonId')
    .all()
},
{watch: [selectedLesson]}
)

//Transformation des données pour les listes du Select
const activityItems = computed(() =>
activities.value?.map( activity => ({
    label: `${activity.activityTitle}`,
    value: `${activity.id}`
}))
)

//Initialisation de la variable pour l'item sélectionné
const selectedActivityId = ref(null)


//Récupération de l'activité sélectionnée
const {data: activity} = await useAsyncData('activity', () => 
{return queryCollection('activities').where('id','=',selectedActivityId.value).all()
},
{watch: [selectedActivityId]}
)

const selectedActivity = computed(() => activity.value?.[0] || null)


//Récupération des soumissions de l'utilsateur et de l'activité sélectionnés
const {data: submissions, refreshSubmissions} = await useAsyncData('submissions', () => {
    console.log("Filtering submissions for user:", selectedStudent.value);
    console.log("Filtering submissions for activity:", selectedActivity.value.uuid);
    return getItems({
        collection: 'submissions',
        params: {
            filter: {
                user_created: selectedStudent.value,
                activity_id: selectedActivity.value.uuid
            },
            sort: '-date_created' 
        }
    });
}, {watch: [selectedStudent,selectedActivity]}); 


</script>

<template>
    <h1> Ebauche d'une page de révision des soumissions </h1>

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

        <div v-for="submission in submissions">
            <USeparator/>
            <h3> Date de soumission : {{ submission.date_created }} </h3 >
            <pre > {{ submission.content }}</pre>
        </div>

        <ContentRenderer v-if="selectedActivity" :value="selectedActivity" />
        
    </div>

</template>