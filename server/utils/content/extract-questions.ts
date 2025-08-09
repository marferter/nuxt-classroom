//tentavie pour le hook pas retenue

/**
 * Parses the AST of a content file to find all UUIDs from <Activity...> components.
 * @param file - The file object from the Nuxt Content hook, we only need its body.
 */

type AstNode = {
  type: string;
  [key: string]: any;
}

export const extractAndProcessUuids = (file: { body: unknown }) => {
  // Affiche le body brut pour debug
  console.dir(file.body, { depth: null });

  // Cast the body to our local AstNode type to safely access its properties.
  const bodyAsAst = file.body as AstNode;

  if (!bodyAsAst.children) {
    return; // Exit if there's no content to parse
  }

  const uuids: string[] = [];

  // Iterate over the children of the AST root
  for (const block of bodyAsAst.children) {
    // Check if the node is a component (element) with the right tag and props
    if (
      block.type === 'element' &&
      block.tagName?.toLowerCase().startsWith('activity') &&
      typeof block.props?.uuid === 'string'
    ) {
      uuids.push(block.props.uuid);
    }
  }

  if (uuids.length > 0) {
    console.dir('Found activity UUIDs:', uuids);
    
    // Here you can add the logic to fetch data from Directus
    // For example:
    // const items = await $directus.getItems(...)
    // file.activities = items 
    // This adds the fetched data back to the document's front-matter.
  }
};


