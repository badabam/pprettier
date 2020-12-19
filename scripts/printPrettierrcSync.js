const fs = require('fs')

module.exports = function printPrettierrcSync(filePath) {
  console.log(fs.readFileSync(filePath, { encoding: 'utf-8' }))
}
