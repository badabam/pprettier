import fs from 'fs'
import { homedir } from 'os'
import checkForGlobalConfig from './checkForGlobalConfig'

jest.mock('fs', () => ({
  accessSync: jest.fn(),
}))

jest.mock('os', () => ({
  homedir: jest.fn(),
}))

describe('checkForGlobalConfig', () => {
  it('returns an object with configPath and exists', () => {
    homedir.mockReturnValue('/Users/foo')
    expect(checkForGlobalConfig()).toEqual({
      globalConfigFilePath: '/Users/foo/.pprettierrc',
      globalConfigExists: true,
    })
  })

  it('calls accessSync with correct path', () => {
    checkForGlobalConfig()
    expect(fs.accessSync).toHaveBeenCalledTimes(1)
    expect(fs.accessSync).toHaveBeenCalledWith('/Users/foo/.pprettierrc')
  })

  it('returns false for exists, if nothing is found', () => {
    fs.accessSync.mockImplementation(() => {
      throw new Error('not found')
    })
    const { globalConfigExists } = checkForGlobalConfig()
    expect(globalConfigExists).toBe(false)
  })
})
