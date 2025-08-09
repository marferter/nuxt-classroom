import type {DirectusUser} from 'nuxt-directus'

// Vos collections personnalisées
export interface Submission {
  id: string;
  user_created?: string | DirectusUser ;
  date_created?: string;
  activity_id: string;
  activity_title: string;
  activity_type: 'mcq' | 'mcqu'| 'shortAnswer' | 'wtp' ;
  content: Record<string, unknown> | string;
  date_updated?: string;
  // Autres champs spécifiques
}

export type SubmissionFilters = {
  [K in keyof Submission]?: {
    _eq?: Submission[K]
    _in?: Submission[K][]
    // Ajoute d'autres opérateurs Directus si besoin (_contains, _null, etc.)
  } | Submission[K]
}