import inquirer from 'inquirer'

/**
 * @returns {Object} An answers object
 */
export default function askForUserInput() {
  return inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Do you want me to create a global config?',
        name: 'wantsGlobalConfig',
        default: true,
      },
    ])
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.error(
          'Could not render the question ... please create an issue for pprettier on Github.'
        )
      } else {
        // Something else went wrong
        console.error(
          'Something went wrong ... please create an issue for pprettier on Github.'
        )
      }
    })
}
