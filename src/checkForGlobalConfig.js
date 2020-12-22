import { accessSync } from 'fs'
import { homedir } from 'os'

export default function checkForGlobalConfig() {
  const configPath = homedir() + '/.pprettierrc'

  let exists
  try {
    accessSync(configPath)
    exists = true
  } catch (error) {
    exists = false
  }
  return { configPath, exists }
}
