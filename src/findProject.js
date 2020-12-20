import chalk from 'chalk'
import { resolve } from 'path'
import doesExist from './doesExist'

export default async function findProject(currentDir) {
  let count = 0
  while (
    count++ < 3 &&
    !(await doesExist(resolve(currentDir, 'package.json')))
  ) {
    currentDir = resolve(currentDir, '..')
  }
  console.log(
    chalk.cyan(`✓ Project found at "/${currentDir.split('/').pop()}".`)
  )
  return currentDir
}
