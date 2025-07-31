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

    const toggleSubmit = () => {
    // On ne peut voir les explications que si l'activité a été soumise ; mais de toutes façons le bouton pour les afficher n'apparaît que si c'est soumis, passons-nous de la conditionnelle
    //if (submitted.value) {
      submitted.value = !submitted.value
    //}
  }
  /*
  const toggleSubmit = (status:boolean) => {
    // On ne peut voir les explications que si l'activité a été soumise ; mais de toutes façons le bouton pour les afficher n'apparaît que si c'est soumis, passons-nous de la conditionnelle
    //if (submitted.value) {
      submitted.value = status
    //}
  }*/

  const resetActivity = () => {
    // Appel de la fonction de nettoyage spécifique fournie par le composant
    resetHandler()

    // Réinitialisation des états gérés par ce composable
    submitted.value = false
    explained.value = false
  }


  // On expose les états et les fonctions de contrôle
  return {
    submitted,
    explained,
    toggleExplain,
    toggleSubmit,
    resetActivity
  }
}