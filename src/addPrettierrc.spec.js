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
    addPrettierrc({ targetFilePath: target, sourceFilePath: source })

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
    addPrettierrc({ targetFilePath: target })
    expect(fs.readFileSync).toHaveBeenCalledWith('/template/path', {
      encoding: 'utf8',
    })
  })

  it('returns a promise', async () => {
    fs.promises.writeFile.mockImplementation(() => Promise.resolve())
    await expect(addPrettierrc()).toBeInstanceOf(Promise)
  })
})
