const path = require('path')
const doesExist = require('./doesExist')

module.exports = async function findProject(currentDir) {
  let count = 0
  while (
    count++ < 3 &&
    !(await doesExist(path.resolve(currentDir, 'package.json')))
  ) {
    currentDir = path.resolve(currentDir, '..')
  }
  console.log('package.json found at', currentDir)
  return currentDir
}
