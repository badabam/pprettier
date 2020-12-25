import printPrettierrcSync from './printPrettierrcSync.js'
import exitWithMessage from './exitWithMessage'

jest.mock('./printPrettierrcSync', () => jest.fn())
jest.spyOn(console, 'log').mockImplementation(jest.fn())
jest.spyOn(process, 'exit').mockImplementation(jest.fn())

describe('exitWithMessage', () => {
  const message = 'foo'
  const prettierPath = 'bar'

  it('sends message to console.log', async () => {
    exitWithMessage(message, prettierPath)
    expect(global.console.log).toHaveBeenCalledWith(message)
  })

  it('calls printPrettierrcSync with prettierPath', () => {
    exitWithMessage(message, prettierPath)
    expect(printPrettierrcSync).toHaveBeenCalledWith(prettierPath)
  })

  it('exits the process with 0', () => {
    exitWithMessage(message, prettierPath)
    expect(global.process.exit).toHaveBeenCalledWith(0)
  })
})
