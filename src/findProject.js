import chalk from 'chalk'
import { resolve } from 'path'
import doesExist from './doesExist'

export default async function findProject(currentDir) {
  let count = 0
  let hasFoundPath = false
  while (count++ < 3 && !hasFoundPath) {
    hasFoundPath = await doesExist(resolve(currentDir, 'package.json'))
    currentDir = resolve(currentDir, '..')
  }
  const message = hasFoundPath
    ? `✓ Project found at "/${currentDir.split('/').pop()}".`
    : '❌ no project found'

  console.log(chalk.cyan(message))

  if (hasFoundPath) {
    return currentDir
  }
  throw new Error('no project found')
}
