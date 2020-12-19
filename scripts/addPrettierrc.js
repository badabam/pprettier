const fs = require('fs')
const path = require('path')
const templatePath = path.resolve(__dirname, '../template.json')
const prettierrc = fs.readFileSync(templatePath, { encoding: 'utf8' })

module.exports = function addPrettierrc(filePath) {
  return require('fs')
    .promises.writeFile(filePath, prettierrc)
    .catch(error => console.error('>>>>>>>>', error))
}
