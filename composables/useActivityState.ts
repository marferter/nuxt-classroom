import { ref } from 'vue'

// La fonction de "reset" spécifique à chaque composant est passée en argument.
export const useActivityState = (resetHandler: () => void) => {

  const submitted = ref(false)
  const explained = ref(false)

  const toggleExplain = () => {
    // On ne peut voir les explications que si l'activité a été soumise ; mais de toutes façons le bouton pour les afficher n'apparaît que si c'est soumis, passons-nous de la conditionnelle
    //if (submitted.value) {
      explained.value = !explained.value
    //}
  }

  const resetActivity = () => {
    // Appel de la fonction de nettoyage spécifique fournie par le composant
    resetHandler()

    // Réinitialisation des états gérés par ce composable
    submitted.value = false
    explained.value = false
  }

  const handleActivityCycle = () => {
    // Inverse l'état de soumission
    submitted.value = !submitted.value

    if (submitted.value === false) {
      // Si on est revenu à l'état "non soumis", on déclenche le reset complet.
      resetActivity()
    }
    // Si on est passé à "soumis", le composant parent s'occupera de l'envoi des données avec un watch ; ce composable n'a pas besoin de connaître la logique d'envoi.
  }

  // On expose les états et les fonctions de contrôle
  return {
    submitted,
    explained,
    toggleExplain,
    handleActivityCycle
  }
}