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

  const prettierDirectory = await findProject(process.cwd())
  const prettierFilePath = path.resolve(prettierDirectory, '.prettierrc')
  const prettierAlreadyInProject = await doesExist(prettierFilePath)

  if (prettierAlreadyInProject) {
    exitWithMessage(chalk.cyan(`✓ Nothing to do: .prettierrc already exists.`))
  }

  const { globalConfigExists, globalConfigFilePath } = checkForGlobalConfig()

  const shouldAskUserForInput =
    !globalConfigExists && !options.silent && !options.ignoreGlobalConfig

  const userWantsGlobalConfig =
    shouldAskUserForInput && (await askForUserInput()).wantsGlobalConfig

  if (userWantsGlobalConfig) {
    addPrettierrc(globalConfigFilePath)
      .then(() => {
        console.log(
          '✓ Created a global .pprettierrc. Edit it to change your defaults.'
        )
      })
      .catch(error => {
        console.error('❌ Could not create global config', error)
      })
  }

  const shouldCopyGlobalConfig =
    !options.ignoreGlobalConfig && (globalConfigExists || userWantsGlobalConfig)

  if (shouldCopyGlobalConfig) {
    try {
      await addPrettierrc({
        targetFilePath: prettierFilePath,
        sourceFilePath: globalConfigFilePath,
      })
      exitWithMessage(
        `✓ Created a .prettierrc based on your global config file.\n`,
        prettierFilePath
      )
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  } else {
    try {
      await addPrettierrc({ targetFilePath: prettierFilePath })
      exitWithMessage(
        `✓ Created a .prettierrc in "${prettierDirectory}".\n`,
        prettierFilePath
      )
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}
