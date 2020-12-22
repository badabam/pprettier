import fs from 'fs'
import { resolve } from 'path'

const templatePath = resolve(__dirname, '../template.json')

export default function addPrettierrc(
  targetFilePath,
  sourceFilePath = templatePath
) {
  const prettierrc = fs.readFileSync(sourceFilePath, { encoding: 'utf8' })
  return fs.promises
    .writeFile(targetFilePath, prettierrc)
    .catch(error => console.error(error))
}
