import config from 'config'

import { ConfigService } from './config.service'

jest.mock('config', () => {
  return {
    get: (key: string) => {
      return {
        lorem: 'ipsum',
        mock: 'mock'
      }[key]
    },
    has: (key: string) => ['lorem', 'mock'].includes(key),
    util: {
      setModuleDefaults: jest.fn()
    }
  }
})

describe('Config-Service', () => {
  test('should be defined', () => {
    expect(ConfigService).toBeDefined()
  })

  test('should get value', () => {
    expect(ConfigService.get('mock')).toEqual('mock')
  })

  test('should get fallback value', () => {
    expect(ConfigService.get('not_found', 'fallback')).toEqual('fallback')
  })

  test('should return true if key found', () => {
    expect(ConfigService.has('lorem')).toEqual(true)
  })

  test('should return false if key not found', () => {
    expect(ConfigService.has('not_found')).toEqual(false)
  })

  test('should pass data to underlying config', () => {
    const moduleDefaults = jest.spyOn(config.util, 'setModuleDefaults')

    ConfigService.setModuleConfig('module', { config: 'mock' })

    expect(moduleDefaults).toHaveBeenCalledWith('module', { config: 'mock' })
  })
})
