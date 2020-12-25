import chalk from 'chalk'
import path from 'path'
import addPrettierrc from './addPrettierrc'
import askForUserInput from './askForUserInput'
import checkForGlobalConfig from './checkForGlobalConfig'
import doesExist from './doesExist'
import exitWithMessage from './exitWithMessage'
import findProject from './findProject'
import getOptions from './getOptions'

export async function pprettier(args) {
  const options = getOptions(args)
  if (options.silent) {
    console.log = () => {}
  }

  const targetDir = await findProject(process.cwd())
  const targetFilePath = path.resolve(targetDir, '.prettierrc')
  const localConfigExists = await doesExist(targetFilePath)

  if (localConfigExists) {
    exitWithMessage(chalk.cyan(`✓ Nothing to do: .prettierrc already exists.`))
  }

  const {
    exists: globalConfigExists,
    configPath: globalConfigFilePath,
  } = checkForGlobalConfig()

  const shouldAskUserForInput =
    !globalConfigExists && !options.silent && !options.ignoreGlobalConfig

  const userWantsGlobalConfig =
    shouldAskUserForInput && (await askForUserInput()).wantsGlobalConfig

  if (userWantsGlobalConfig) {
    await addPrettierrc(globalConfigFilePath)
    console.log(
      '✓ Created a global .pprettierrc. Edit it to change your defaults.'
    )
  }

  const shouldCopyGlobalConfig =
    !options.ignoreGlobalConfig && (globalConfigExists || userWantsGlobalConfig)

  if (shouldCopyGlobalConfig) {
    try {
      await addPrettierrc(targetFilePath, globalConfigFilePath)
      exitWithMessage(
        `✓ Created a .prettierrc based on your global config file.\n`,
        targetFilePath
      )
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  } else {
    try {
      await addPrettierrc(targetFilePath)
      exitWithMessage(
        `✓ Created a .prettierrc in "${targetDir}".\n`,
        targetFilePath
      )
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }

  /**
   * Local functions
   */
}
