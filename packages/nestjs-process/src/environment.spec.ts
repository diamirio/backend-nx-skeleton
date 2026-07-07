import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'

import { requireNodeEnv, setEnvironmentVariables } from './environment'

vitest.mock(import('node:fs/promises'), () => {
  return {
    readFile: vitest.fn()
  }
})

vitest.mock(import('node:path'), async (importOriginal) => {
  const org = await importOriginal()

  return {
    ...org,
    basename: vitest.fn()
  }
})

describe('environment', () => {
  afterEach(() => {
    vitest.clearAllMocks()
  })

  describe('setEnvironmentVariables', () => {
    beforeEach(() => {
      vitest.unstubAllEnvs()
      delete process.env.PACKAGE_NAME
      delete process.env.PACKAGE_VERSION
      delete process.env.npm_package_name
      delete process.env.npm_package_version
      delete process.title
    })

    test('should pick PACKAGE_NAME & PACKAGE_VERSION env', async () => {
      vitest.stubEnv('PACKAGE_NAME', 'mock_package')
      vitest.stubEnv('PACKAGE_VERSION', '1.0.3-mock')

      await setEnvironmentVariables()

      expect(process.env.PACKAGE_NAME).toEqual('mock_package')
      expect(process.env.PACKAGE_VERSION).toEqual('1.0.3-mock')
      expect(process.title).toEqual('mock_package-1.0.3-mock')
      expect(readFile).not.toHaveBeenCalled()
    })

    test('should pick npm_package_name & npm_package_version env', async () => {
      vitest.stubEnv('npm_package_name', 'mock_package_npm')
      vitest.stubEnv('npm_package_version', '2.3.0-mock')

      await setEnvironmentVariables()

      expect(process.env.PACKAGE_NAME).toEqual('mock_package_npm')
      expect(process.env.PACKAGE_VERSION).toEqual('2.3.0-mock')
      expect(process.title).toEqual('mock_package_npm-2.3.0-mock')
      expect(readFile).not.toHaveBeenCalled()
    })

    test('should pick PACKAGE_NAME & npm_package_version env', async () => {
      vitest.stubEnv('PACKAGE_NAME', 'mock_package_a')
      vitest.stubEnv('npm_package_version', '3.1.8-mock')

      await setEnvironmentVariables()

      expect(process.env.PACKAGE_NAME).toEqual('mock_package_a')
      expect(process.env.PACKAGE_VERSION).toEqual('3.1.8-mock')
      expect(process.title).toEqual('mock_package_a-3.1.8-mock')
      expect(readFile).not.toHaveBeenCalled()
    })

    test('should pick pwd basename ', async () => {
      vitest.mocked(basename).mockReturnValue('mock_basename')
      vitest.stubEnv('PACKAGE_VERSION', '0.1.0')

      await setEnvironmentVariables()

      expect(process.env.PACKAGE_NAME).toEqual('mock_basename')
      expect(process.env.PACKAGE_VERSION).toEqual('0.1.0')
      expect(process.title).toEqual('mock_basename-0.1.0')
      expect(readFile).not.toHaveBeenCalled()
    })

    test('should read package.json as fallback if no env set', async () => {
      vitest.mocked(basename).mockReturnValue('')
      vitest.mocked(readFile).mockResolvedValue(
        JSON.stringify({
          name: 'package_json_name',
          version: '0.1.0-mock'
        })
      )

      await setEnvironmentVariables('package.json')

      expect(process.env.PACKAGE_NAME).toEqual('package_json_name')
      expect(process.env.PACKAGE_VERSION).toEqual('0.1.0-mock')
      expect(process.title).toEqual('package_json_name-0.1.0-mock')
      expect(readFile).toHaveBeenCalledWith('package.json', { encoding: 'utf8' })
    })

    test('should use fallback if nothing found', async () => {
      vitest.mocked(basename).mockReturnValue('')
      vitest.mocked(readFile).mockResolvedValue(JSON.stringify({}))

      await setEnvironmentVariables('package.empty.json')

      expect(process.env.PACKAGE_NAME).toEqual('nestjs')
      expect(process.env.PACKAGE_VERSION).toEqual('0.0.0')
      expect(process.title).toEqual('nestjs-0.0.0')
      expect(readFile).toHaveBeenCalledWith('package.empty.json', { encoding: 'utf8' })
    })
  })

  describe('requireNodeEnv', () => {
    test('should throw default error if NODE_ENV is missing', () => {
      vitest.stubEnv('NODE_ENV', undefined)
      expect(() => requireNodeEnv()).toThrow('NODE_ENV environment variable is not set.')
    })

    test('should throw default error if NODE_ENV is missing', () => {
      vitest.stubEnv('NODE_ENV', undefined)
      expect(() => requireNodeEnv('MOCK error message')).toThrow('MOCK error message')
    })

    test('should not throw if NODE_ENV is set', () => {
      vitest.stubEnv('NODE_ENV', 'develop')
      expect(() => requireNodeEnv()).not.toThrow()
    })
  })
})
