import { accessSync } from 'fs'

export default function checkForGlobalConfig() {
  const configPath = require('os').homedir() + '/.pprettierrc'

  let exists
  try {
    accessSync(configPath)
    exists = true
  } catch (error) {
    exists = false
  }
  return { configPath, exists }
}
