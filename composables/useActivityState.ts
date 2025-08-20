import { ref } from 'vue'

// La fonction de "reset" spécifique à chaque composant est passée en argument.
export const useActivityState = (resetHandler: () => void) => {

  const submitted = ref(false)
  const explained = ref(false)

  const toggleExplain = () => {
      explained.value = !explained.value
  }

  const toggleSubmit = () => {
      submitted.value = !submitted.value
  }

  const resetActivity = () => {
    // Appel de la fonction de nettoyage spécifique fournie par le composant
    resetHandler()

    submitted.value = false
    explained.value = false
  }

  return {
    submitted,
    explained,
    toggleExplain,
    toggleSubmit,
    resetActivity
  }
}