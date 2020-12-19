import { promises, constants } from 'fs'

export default function doesExist(filePath) {
  return promises
    .access(filePath, constants.F_OK)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false))
}
