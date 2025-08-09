// Vos collections personnalisées
// export interface Article {
//   id: string;
//   status: string;
//   title: string;
//   content: string;
//   date_created?: string;
//   date_updated?: string;
//   author?: string | DirectusUser;
//   image?: string | DirectusFile;
//   // Autres champs spécifiques
// }



// Vos collections personnalisées
export interface Submission {
  id: string;
  user_created?: string ;
  //user_created?: string | DirectusUser ;
  date_created?: string;
  activity_id: string;
  activity_title: string;
  activity_type: 'mcq' | 'mcqu'| 'shortAnswer' | 'wtp' ;
  content: Record<string, unknown> | string;
  date_updated?: string;
  // Autres champs spécifiques
}

