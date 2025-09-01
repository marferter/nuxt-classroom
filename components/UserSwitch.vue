<script setup>

    const { user } = defineProps({
  user: Object // ou type précis
})

    const value = ref(user ? user.email : '')

    const {getUsers} = useDirectusUsers()
    const { logout, login } = useDirectusAuth()
    const toast = useToast()

    const {data : users } = await useAsyncData('all-test-users',() => {
        return getUsers({
            params: {
                fields: ['id', 'first_name', 'last_name', 'role', 'email'],
                filter: { "last_name": "Test" }
            }
        })
    })

    // const userItems = computed(() => 
    //     users.value?.map( user => ({
    //         label: `${user.first_name} ${user.last_name}`,
    //         description: user.role,
    //         value: user.id
    //     }))
    // )

    //tableau des users trié par prénom de Copilot
    const userItems = computed(() =>
        // On utilise l'optional chaining `?.` au cas où `users.value` serait `null` ou `undefined`
        users.value
            ?.slice() // .slice() sans argument est une autre façon de créer une copie
            .sort((a, b) => a.first_name.localeCompare(b.first_name))
            .map(user => ({
                label: `${user.first_name} ${user.last_name}`,
                // description: `${user.role}`,
                value: `${user.email}`
            })) || [] // Si users.value est `null`, on retourne un tableau vide
    )

    const loginError = ref('')

    const emit = defineEmits(['userChanged'])

    async function onSelect(newValue) {
        logout()
        console.log('logout')
        try {
            await login({
                email: newValue, 
                password: '1234'
            })
            toast.add({ title: 'Succès', description: 'Connexion réussie', color: 'success' })
            console.log('User :', user.id)
            // Redirige l'utilisateur après connexion (par exemple vers la page d’accueil)
            //router.push('/')
        } catch (e) {
            loginError.value = 'Erreur de login'
        }
    }

    watch(value, (newValue, oldValue) => {
        console.log(`La sélection a changé !`);
        console.log('Nouvelle valeur :', newValue);
        console.log('Ancienne valeur :', oldValue);

        if (newValue) {
            onSelect(newValue)
        }
    })

</script>

<template>
    <!-- <p>Utilisateur connecté : {{ user ? user.first_name : 'aucun' }}</p> -->
    <!-- <p>{{ users }}</p>
    <p>{{ userItems }}</p> -->


    <URadioGroup
        v-model="value"
        :items="userItems"
        color="primary"
        variant="card"
        size="xs"
        orientation="horizontal"
        indicator="hidden"
        class="w-full flex justify-evenly"
    />


    <!-- <p> Valeur de la sélection : {{ value }} </p> -->
</template>