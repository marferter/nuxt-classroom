import { promises as fs } from 'fs'
import path from 'path'

/**
 * Extrait tous les UUIDs des blocs ayant un tag "activity-..." dans l'AST fourni.
 * @param ast Un tableau représentant l'AST (body.value de Nuxt Content).
 * @returns Un tableau de strings représentant les UUIDs trouvés.
 */
export function extractActivityUuids(ast: unknown[]): string[] {
  const uuids: string[] = [];
  for (const block of ast) {
    // On suppose que le bloc est un tableau [tag, props, ...]
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
      uuids.push((props as any).uuid);
    }
  }
  return uuids;
}

/**
 * Fonction avancée qui prend l'AST et l'id du fichier parent.
 * @param ast Un tableau représentant l'AST (body.value de Nuxt Content).
 * @param parentFileId Chemin ou identifiant du fichier parent.
 */
export async function extractActivityUuidsWithFile(ast: unknown[], parentFileId: string): Promise<void> {
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