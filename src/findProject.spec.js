import doesExist from './doesExist'
import findProject from './findProject'

const currentDir = '/some/path'

jest.mock('chalk', () => ({
  cyan: jest.fn(x => x),
}))

jest.mock('path', () => ({
  resolve: jest.fn(() => currentDir + '/package.json'),
}))

jest.mock('./doesExist.js')

jest.spyOn(global.console, 'log').mockImplementation(jest.fn())

describe('findProject', () => {
  it('calls doesExist once with a path, if it resolves to true', async () => {
    doesExist.mockReturnValue(Promise.resolve(true))
    await findProject(currentDir)
    expect(doesExist).toHaveBeenCalledTimes(1)
  })

  it('calls doesExist 2 times with a path, if it resolves to true the second time', async () => {
    doesExist
      .mockReturnValueOnce(Promise.resolve(false))
      .mockReturnValueOnce(Promise.resolve(true))
    await findProject(currentDir)
    expect(doesExist).toHaveBeenCalledTimes(2)
  })

  it('tries doesExist 3 times with a path, then throws', async () => {
    doesExist.mockReturnValue(Promise.resolve(false))
    try {
      await findProject(currentDir)
    } catch (error) {
      expect(error).toEqual(new Error('no project found'))
    }
    expect(doesExist).toHaveBeenCalledTimes(3)
  })

  it('rejects if doesExist always resolves to false', async () => {
    doesExist.mockReturnValue(Promise.resolve(false))
    await expect(findProject(currentDir)).rejects.toThrow()
    expect(global.console.log.mock.calls[0][0]).toMatch(/no.*project.*found/i)
  })

  it('returns a promise that resolves to path with the package.json', async () => {
    doesExist.mockReturnValue(Promise.resolve(true))
    await expect(findProject(currentDir)).resolves.toEqual(
      currentDir + '/package.json'
    )
    expect(global.console.log.mock.calls[0][0]).toMatch(/project.*found/i)
  })
})
