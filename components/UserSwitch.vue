<script setup>
    const { user } = defineProps({
  user: Object // voir si je peux trouver le type des user directus
})

    const value = ref(user ? user.email : '')

    const {getUsers} = useDirectusUsers()
    const { logout, login } = useDirectusAuth()
    const toast = useToast()

    //Récupération des users "test"
    const {data : users } = await useAsyncData('all-test-users',() => {
        return getUsers({
            params: {
                fields: ['id', 'first_name', 'role', 'email'],
                filter: { "last_name": "Test" }
            }
        })
    })



    //tableau des users trié par prénom (par Copilot)
    const userItems = computed(() =>
        // On utilise l'optional chaining `?.` au cas où `users.value` serait `null` ou `undefined`
        users.value
            ?.slice() // .slice() sans argument est une autre façon de créer une copie
            .sort((a, b) => a.first_name.localeCompare(b.first_name))
            .map(user => ({
                label: `${user.first_name}`,
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

    <URadioGroup
        v-model="value"
        :items="userItems"
        color="primary"
        variant="card"
        size="xs"
        orientation="horizontal"
        indicator="hidden"
        class="[&_p]:text-sm [&_p]:mb-0"
    />


    <!-- <p> Valeur de la sélection : {{ value }} </p> -->
</template>
        <!-- class="w-full flex justify-evenly"  -->