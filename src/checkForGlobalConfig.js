import { accessSync } from 'fs'
import { homedir } from 'os'

export default function checkForGlobalConfig() {
  const globalConfigFilePath = homedir() + '/.pprettierrc'

  let exists
  try {
    accessSync(globalConfigFilePath)
    exists = true
  } catch (error) {
    exists = false
  }
  return { globalConfigFilePath, globalConfigExists: exists }
}
