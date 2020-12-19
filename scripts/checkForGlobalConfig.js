const fs = require('fs')
module.exports = function checkForGlobalConfig() {
  const homedir = require('os').homedir()
  let exists
  try {
    exists = fs.accessSync(homedir + '/.pprettier')
  } catch (error) {
    exists = false
  }
  return { homedir, exists }
}
