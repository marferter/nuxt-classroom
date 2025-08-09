import { ref } from 'vue'
import type { Submission } from '~/types/directus-schema.ts';

export const useAnswerSubmission = () => {
  // Définir tous les états nécessaires à l'intérieur du composable
  const sending = ref(false)
  const sendError = ref<string | null>(null)
  const sendSuccess = ref(false)

  // Pour accéder aux plugins de Nuxt, dont $directus, $readItems, $createItem et autres
  const nuxtApp = useNuxtApp()
  const user = useDirectusUser()
  const { createItems } = useDirectusItems();

  // Définir la fonction principale avec les données en paramètres.
  async function submitAnswer(
  activityId: string,
  activityTitle: string,
  activityType: Submission['activity_type'],
  answerContent: Record <string,any>
) {
    // Validation de l'utilisateur
    if (!user.value) {
      sendError.value = 'Utilisateur non connecté. Impossible de soumettre la réponse.'
      console.error('Utilisateur non connecté. Impossible de soumettre la réponse.')
      return
    }


    else {console.log(user.value.id)}
  
    // Réinitialiser les états avant de commencer
    sending.value = true
    sendError.value = null
    sendSuccess.value = false

    try {
      //Créer l'objet à soumettre 
      const newSubmission: Omit<Submission, 'id'> = {
        activity_id: activityId,
        activity_title: activityTitle,
        activity_type: activityType,
        content: answerContent,
        user_created: user.value.id
      }

      await createItems({ collection: 'submissions', items: [newSubmission] })

      sendSuccess.value = true
      // AJOUT DU LOG DE SUCCÈS
      console.log(`Réponse envoyée avec succès pour "${activityTitle}"!`, newSubmission);
      }
      
      catch (e) {
        if (e instanceof Error) {
          // Afficher l'erreur complète pour voir les détails
          console.log("ERREUR COMPLÈTE:", JSON.stringify(e, null, 2));
          sendError.value = e.message;
        } else {
          sendError.value = 'Une erreur inattendue est survenue lors de l\'envoi.';
        }
        console.error(e);
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
