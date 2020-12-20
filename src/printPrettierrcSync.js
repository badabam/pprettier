const chalk = require('chalk')
const fs = require('fs')

module.exports = function printPrettierrcSync(filePath) {
  console.log(
    chalk.cyan('\nYour .prettierrc:\n'),
    chalk.white(fs.readFileSync(filePath, { encoding: 'utf-8' }))
  )
}
