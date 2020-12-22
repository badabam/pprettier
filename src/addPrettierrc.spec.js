import fs from 'fs'
import addPrettierrc from './addPrettierrc'

global.__dirname = '/some/dir'

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => '{"semi": false}'),
  promises: {
    writeFile: jest.fn(() => Promise.resolve()),
  },
}))

jest.mock('path', () => ({
  resolve: jest.fn(() => '/template/path'),
}))

jest.spyOn(global.console, 'error').mockImplementation(jest.fn())

const target = '/target/file/path.json'
const source = '/source/file/path.json'

describe('addPrettierrc', () => {
  it('reads the sourceFilePath and writes to targetFilePath', () => {
    // run
    addPrettierrc(target, source)

    // check read
    expect(fs.readFileSync).toHaveBeenCalledTimes(1)
    expect(fs.readFileSync).toHaveBeenCalledWith(source, { encoding: 'utf8' })

    // check write
    expect(fs.promises.writeFile).toHaveBeenCalledTimes(1)
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      target,
      '{"semi": false}'
    )
  })

  it('uses the template if sourceFilePath is omitted', async () => {
    addPrettierrc()
    expect(fs.readFileSync).toHaveBeenCalledWith('/template/path', {
      encoding: 'utf8',
    })
  })

  it('logs a writeError to  console.error', async () => {
    fs.promises.writeFile.mockImplementation(() =>
      Promise.reject(new Error('some write error'))
    )
    await addPrettierrc()
    expect(fs.promises.writeFile).rejects.toThrow()
    expect(fs.promises.writeFile).rejects.toThrowError('some write error')
    expect(global.console.error).toHaveBeenCalledWith(
      new Error('some write error')
    )
  })
})
