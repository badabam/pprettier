import inquirer from 'inquirer'
import askForUserInput from './askForUserInput'

global.__dirname = '/some/dir'

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}))

jest.spyOn(global.console, 'error').mockImplementation(jest.fn())

describe('askForUserInput', () => {
  it('calls inquirer.prompt with correct options', async () => {
    inquirer.prompt.mockReturnValue(Promise.resolve())
    await askForUserInput()

    // check read
    expect(inquirer.prompt).toHaveBeenCalledTimes(1)

    // firstArgument of first call is an array
    const firstArgument = inquirer.prompt.mock.calls[0][0]
    const firstPrompt = firstArgument[0]
    expect(firstPrompt.message).toMatch(/create.*global.*config/i)
    expect(firstPrompt.name).toBe('wantsGlobalConfig')
    expect(firstPrompt.default).toBe(true)
  })
  it('calls console.error on TtyError', async () => {
    const ttyError = new Error('something went wrong')
    ttyError.isTtyError = true
    inquirer.prompt.mockImplementation(() => Promise.reject(ttyError))
    await askForUserInput()
    expect(global.console.error.mock.calls[0][0]).toMatch(
      'Could not render the question ...'
    )
  })
  it('calls console.error on general error', async () => {
    const normalError = new Error('something went wrong')
    inquirer.prompt.mockImplementation(() => Promise.reject(normalError))
    await askForUserInput()
    expect(global.console.error.mock.calls[0][0]).toMatch(
      'Something went wrong ...'
    )
  })
})
