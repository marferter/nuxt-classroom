import { promises as fs } from 'fs'
import path from 'path'

/**
 * @param ast Un tableau représentant l'AST (body.value de Nuxt Content).
 * @param parentFileId Chemin ou identifiant du fichier parent.
 * Fonction qui prend l'AST et l'id du fichier parent, recherche les blocs dans l'AST dont le tag commence par "activity-", et fabrique pour chacun de ces blocs un fichier JSON dans la collection "activities" ; l'objet JSON aura les propriétés : 
 * uuid : lu dans les props du bloc activité (attribué dans la page leçon), 
 * lessonId : identifiant de la leçon d'où est extraite l'activité (path) (passé en argument à la fonction extractActivities par le hook qui l'appelle )
 * activityTitle : titre de l'activité, lu dans les props du bloc activité (attribué dans la page leçon)
 * body : contenu de l'activité lu dans le bloc de l'AST.
 */
export async function extractActivities(ast: unknown[], parentFileId: string): Promise<void> {
  for (const block of ast) {
    if (!Array.isArray(block) || block.length < 2) continue;

    const tag = block[0];
    const props = block[1];

    if (
      typeof tag === 'string' &&
      tag.startsWith('activity-') &&
      props &&
      typeof props === 'object' &&
      typeof (props as any).uuid === 'string'
    ) {
      const uuid = (props as any).uuid;
      const title = typeof (props as any).title === 'string' ? (props as any).title : '';
      const activityFilePath = path.join(
        process.cwd(),
        'content',
        'activities',
        `${uuid}.json`
      );

      // On crée toujours un nouvel objet, sans merger avec l'ancien
      const activityObj = {
        uuid: uuid,
        lessonId: parentFileId,
        activityTitle: title,
        body: {
          type: 'minimal',
          value: [block]
        }
      };

      // On écrase le fichier à chaque appel
      await fs.writeFile(activityFilePath, JSON.stringify(activityObj, null, 2), 'utf8');
    }
  }
}