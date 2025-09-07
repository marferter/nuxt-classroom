export default defineNuxtRouteMiddleware((to) => {
  const user = useDirectusUser();
  // N’active PAS la redirection si on est déjà sur /login !
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login');
  }
});

// export default defineNuxtRouteMiddleware(async (to) => {
//   // Récupère le token Directus depuis le cookie
//   const { token } = useDirectusToken()

//   // Si pas de token et la page exige l'auth, on redirige
//   if (!token.value && to.meta.requiresAuth) {
//     return navigateTo('/login')
//   }

//   // Récupère l'utilisateur Directus
//   const user = useDirectusUser()

//   // Si l'utilisateur n'est pas chargé (par exemple, le token a expiré)
//   if (!user.value) {
//     return navigateTo('/login')
//   }

//   // Si la route exige l'authentification, on peut faire des vérifications supplémentaires
//   if (to.meta.requiresAuth) {
//     const allowedRoleIds = ['313ecea3-56fe-48d1-b98c-4aaac0f5c2c8', '90b71453-3030-43ca-94f5-d50d3281e714']
//     if (!allowedRoleIds.includes(user.value.role?.id)) {
//       return navigateTo('/unauthorized')
//     }
//     return // L'utilisateur est autorisé
//   }

//   // Si la route n'exige pas l'authentification, rien à faire
//   return
// });