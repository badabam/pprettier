import path from 'path'
import addPrettierrc from './addPrettierrc'
import checkForGlobalConfig from './checkForGlobalConfig'
import doesExist from './doesExist'
import findProject from './findProject'
import getOptions from './getOptions'
import printPrettierrcSync from './printPrettierrcSync'

export async function pprettier(args) {
  const targetDir = await findProject(process.cwd())
  const targetFilePath = path.resolve(targetDir, '.prettierrc')

  const options = getOptions(args)
  options.silent && goSilent()

  const localConfigExists = await doesExist(targetFilePath)

  localConfigExists
    ? exitWithMessage('.prettierrc already exists')
    : await createLocalConfig(targetFilePath, targetDir)

  /**
   * Local functions
   */

  function goSilent() {
    console.log = () => {}
  }

  function exitWithMessage(message) {
    console.log(message)
    printPrettierrcSync(targetFilePath)
    process.exit(0)
  }

  async function createLocalConfig() {
    const { configPath, exists } = checkForGlobalConfig()
    const copyGlobalConfig = exists && !options.ignoreGlobalConfig

    try {
      copyGlobalConfig
        ? await addPrettierrc(targetFilePath, configPath)
        : await addPrettierrc(targetFilePath)
      exitWithMessage(`Created a .prettierrc in "${targetDir}":\n`)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}
