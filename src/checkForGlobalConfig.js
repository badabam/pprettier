import { accessSync } from 'fs'

export default function checkForGlobalConfig() {
  const configPath = require('os').homedir() + '/.pprettierrc'

  let exists
  try {
    exists = accessSync(configPath)
  } catch (error) {
    exists = false
  }
  return { configPath, exists }
}
