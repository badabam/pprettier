import fs from 'fs'
import doesExist from './doesExist'

jest.mock('fs', () => ({
  promises: {
    access: jest.fn(),
  },
  constants: {
    F_OK: 'F_OK',
  },
}))

describe('doesExist', () => {
  it('calls fs.access with filePath', () => {
    const filePath = 'foo/bar'
    fs.promises.access.mockReturnValue(Promise.resolve())
    expect(doesExist(filePath)).resolves.toBe(true)
    expect(fs.promises.access).toHaveBeenCalledTimes(1)
    expect(fs.promises.access).toHaveBeenCalledWith(filePath, fs.constants.F_OK)
  })

  it('returns a Promise resolving to true if file exists', () => {
    const filePath = 'foo/bar'
    fs.promises.access.mockReturnValue(Promise.resolve())
    expect(doesExist(filePath)).resolves.toBe(true)
  })

  it('returns a Promise resolving to true if file exists', () => {
    const filePath = 'foo/bar'
    fs.promises.access.mockReturnValue(Promise.reject())
    expect(doesExist(filePath)).resolves.toBe(false)
  })
})
