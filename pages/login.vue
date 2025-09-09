<script setup lang="ts">
import * as z from 'zod'
import {ref, reactive} from 'vue'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  email: z.string().email('Email non valide'),
  password: z.string().min(4, 'Votre mot de passe a au moins 4 caractères.')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const { login } = useDirectusAuth()
const toast = useToast()
const router = useRouter()
const loginError = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
    await login({
        email: event.data.email, 
        password: event.data.password
    })
    toast.add({ title: 'Succès', description: 'Connexion réussie', color: 'success' })
    // Redirige l'utilisateur après connexion (par exemple vers la page d’accueil)
    router.push('/')
  } catch (e) {
    loginError.value = 'Identifiants incorrects. Veuillez réessayer.'
  }
}

const { token } = useDirectusToken();
console.log(token.value);


</script>

<template>
    <div class="flex justify-center">
        <UCard class="w-128 mt-16">
            <h1 class="text-center"> Login </h1>
            <p class="text-center"> Veuillez vous identifier.</p>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField
                    class="mt-4"
                    label="Identifiant"
                    name="email"
                >
                    <UInput placeholder="Veuillez entrer votre adresse e-mail."
                    v-model="state.email"
                    class="w-full" />
                </UFormField>

                <UFormField 
                    class="mt-3"
                    label="Mot de passe"
                    name="password"
                >
                    <UInput placeholder="Veuillez entrer votre mot de passe"
                    v-model="state.password"
                    class="w-full" />
                </UFormField>

                <div class="flex justify-center">
                <UButton class="mt-7" type="submit"> Se connecter </UButton>
                </div>

                <div>
                    <div v-if="loginError" class="bg-red-100 rounded border border-red-200 p-2 text-red-700">
                        {{ loginError }}
                    </div>
                </div>
            </UForm>
            <p class="text-neutral-500 text-sm"> Vous pouvez aussi vous loguer à l'aide du "user switch" au bas de l'écran, puis poursuivre vers l'accueil en cliquant sur le logo !</p>
        </UCard>
    </div>
</template>