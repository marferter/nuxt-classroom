// filepath: scripts/extract-questions.js
import { glob } from 'glob'
import { promises as fs } from 'fs'
import path from 'path'

// --- Configuration ---
const sourceDir = 'content' // Le dossier où se trouvent vos leçons
const destDir = 'content/questions' // Le dossier où les questions extraites seront sauvegardées
// ---------------------

async function extractActivities() {
  console.log('Starting activity extraction...')

  // Créer le dossier de destination s'il n'existe pas
  await fs.mkdir(destDir, { recursive: true })

  // Trouver tous les fichiers .md dans le dossier source, en ignorant le dossier de destination
  const files = await glob(`${sourceDir}/**/*.md`, {
    ignore: `${destDir}/**`,
  })

  let extractedCount = 0

  for (const file of files) {
    console.log(`Processing ${file}...`)
    const content = await fs.readFile(file, 'utf-8')

    // Regex pour trouver les blocs MDC commençant par "Activity"
    // Cette regex capture le nom du composant, le frontmatter et le contenu du slot
    const activityRegex = /::(Activity\w+)\s*---([\s\S]*?)---\s*([\s\S]*?)::/g

    let match
    while ((match = activityRegex.exec(content)) !== null) {
      const [fullBlock, componentName, frontmatter, slotContent] = match

      // Extraire l'UUID du frontmatter pour le nom de fichier
      const uuidMatch = frontmatter.match(/uuid:\s*([a-f0-9-]+)/)
      if (!uuidMatch) {
        console.warn(`  -> Found an activity in ${file} without a UUID. Skipping.`)
        continue
      }

      const uuid = uuidMatch[1]
      const newFileName = `${uuid}.md`
      const newFilePath = path.join(destDir, newFileName)

      // Écrire le bloc complet dans un nouveau fichier
      await fs.writeFile(newFilePath, fullBlock.trim())
      console.log(`  -> Extracted ${componentName} (${uuid}) to ${newFilePath}`)
      extractedCount++
    }
  }

  console.log(`\nExtraction complete. Extracted ${extractedCount} activities.`)
}

extractActivities().catch(console.error)