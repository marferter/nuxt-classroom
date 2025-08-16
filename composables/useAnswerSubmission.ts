import { ref } from 'vue'
import type { Submission, SubmissionFilters } from '~/types/directus-schema.ts';

export const useAnswerSubmission = () => {
  // États pour la soumission
  const sending = ref(false)
  const sendError = ref<string | null>(null)
  const sendSuccess = ref(false)

  // États pour la récupération
  const fetching = ref(false)
  const fetchError = ref<string | null>(null)
  const fetchSuccess = ref(false)

  // Plugins Nuxt/Directus
  const nuxtApp = useNuxtApp()
  const user = useDirectusUser()
  const { createItems } = useDirectusItems()
  const { getItems } = useDirectusItems()

  // Fonction de soumission
  async function submitAnswer(
    activityId: string,
    activityTitle: string,
    activityType: Submission['activity_type'],
    answerContent: Record<string, any>
  ) {
    if (!user.value) {
      sendError.value = 'Utilisateur non connecté. Impossible de soumettre la réponse.'
      console.error('Utilisateur non connecté. Impossible de soumettre la réponse.')
      return
    }

    sending.value = true
    sendError.value = null
    sendSuccess.value = false

    try {
      const newSubmission: Omit<Submission, 'id'> = {
        activity_id: activityId,
        activity_title: activityTitle,
        activity_type: activityType,
        content: answerContent,
        user_created: user.value.id
      }

      await createItems({ collection: 'submissions', items: [newSubmission] })

      sendSuccess.value = true
      console.log(`Réponse envoyée avec succès pour "${activityTitle}"!`, newSubmission);
    } catch (e) {
      if (e instanceof Error) {
        console.log("ERREUR COMPLÈTE:", JSON.stringify(e, null, 2));
        sendError.value = e.message;
      } else {
        sendError.value = 'Une erreur inattendue est survenue lors de l\'envoi.';
      }
      console.error(e);
    } finally {
      sending.value = false
    }
  }

  // Fonction de récupération
  async function getSubmissions(filters: SubmissionFilters): Promise<Submission[]> {
    fetching.value = true
    fetchError.value = null
    fetchSuccess.value = false

    try {
      const items = await getItems<Submission>({
        collection: 'submissions',
        params: {
          filter: filters
        }
      })
      fetchSuccess.value = true
      return items
    } catch (e) {
      if (e instanceof Error) {
        console.log("ERREUR COMPLÈTE:", JSON.stringify(e, null, 2));
        fetchError.value = e.message;
      } else {
        fetchError.value = 'Une erreur inattendue est survenue lors de la récupération.';
      }
      console.error(e);
      return []
    } finally {
      fetching.value = false
    }
  }

  // Exposer les états et fonctions
  return {
    sending,
    sendError,
    sendSuccess,
    submitAnswer,
    fetching,
    fetchError,
    fetchSuccess,
    getSubmissions
  }
}


