const fs = require('fs')

module.exports = function doesExist(filePath) {
  return fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false))
}
