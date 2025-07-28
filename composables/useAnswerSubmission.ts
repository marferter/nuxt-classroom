import { ref } from 'vue'

// dictionnaire qui permet d'associer chaque type de question à une collection spécifique pour les soumissions
const activities: Record<string, string> = {
  mcq: 'submissions_mcq',
  shortanswer: 'submissions_shortanswer',
  wtp: 'submissions_wtp'
}

export const useAnswerSubmission = () => {
  // Définir tous les états nécessaires à l'intérieur du composable
  const sending = ref(false)
  const sendError = ref<string | null>(null)
  const sendSuccess = ref(false)

  // Récupérer les dépendances Nuxt (plugins, etc.)
  // useNuxtApp nous donne accès à $directus, $readItems, $createItem et autres plugins
  const nuxtApp = useNuxtApp()
  // Le composable useDirectusUser est la manière moderne d'accéder à l'utilisateur
  const user = useDirectusUser()

  // Définir la fonction principale avec les données en paramètres.
  async function submitAnswer(
    type: string, 
    userAnswer: any, 
    extraFields?: Record<string, any>) {
    // Validation de l'utilisateur
    if (!user.value) {
      sendError.value = 'Utilisateur non connecté. Impossible de soumettre la réponse.'
      return
    }

    // Réinitialiser les états avant de commencer
    sending.value = true
    sendError.value = null
    sendSuccess.value = false

    try {
      const collection = activities[type]
      if (!collection) {
        sendError.value = `Type de question inconnu: ${type}`
        sending.value = false
        return
      }
      // Créer le payload dynamiquement pour pouvoir s'adapter à des champs de réponse spécifiques au type de question
      const payload: Record<string, any> = {
        user_answer: userAnswer,
        user_created: user.value.id,
        ...extraFields
      }

      // Utilisation de la dépendance $directus injectée par Nuxt
      await nuxtApp.$directus.request(nuxtApp.$createItem('submissions_mcq', payload))
      sendSuccess.value = true

    } catch (e) {
      // Gestion d'erreur robuste par Copilot
      if (e instanceof Error) {
        sendError.value = e.message
      } else {
        sendError.value = 'Une erreur inattendue est survenue lors de l\'envoi.'
      }
      console.error(e) // Toujours bon de logguer l'erreur complète
    } finally {
      // Cet état est toujours mis à jour, que ça réussisse ou non
      sending.value = false
    }
  }

  // Exposer les états et la fonction pour qu'ils soient utilisables par les composants
  return {
    sending,
    sendError,
    sendSuccess,
    submitAnswer
  }
}
