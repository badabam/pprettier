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
  const isPrettierAlreadyInProject = await doesExist(prettierFilePath)

  if (isPrettierAlreadyInProject) {
    exitWithMessage(chalk.cyan(`✓ Nothing to do: .prettierrc already exists.`))
  }

  const { globalConfigExists, globalConfigFilePath } = checkForGlobalConfig()

  const shouldAskUserForInput =
    !globalConfigExists && !options.silent && !options.ignoreGlobalConfig

  const userWantsGlobalConfig =
    shouldAskUserForInput && (await askForUserInput()).wantsGlobalConfig

  if (userWantsGlobalConfig) {
    addGlobalConfig()
  }

  const shouldUseGlobalConfigInProject =
    !options.ignoreGlobalConfig && (globalConfigExists || userWantsGlobalConfig)

  if (shouldUseGlobalConfigInProject) {
    await copyGlobalPrettierrcToProject()
  } else {
    await addDefaultConfigFromTemplateToProject()
  }

  async function addDefaultConfigFromTemplateToProject() {
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

  async function copyGlobalPrettierrcToProject() {
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
  }

  function addGlobalConfig() {
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
}
