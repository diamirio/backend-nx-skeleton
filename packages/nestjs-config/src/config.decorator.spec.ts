import config from 'config'

import { ConfigParam, Configurable } from './config.decorators'

vitest.mock(import('config'), async () => {
  return {
    default: {
      get: (key: string) => {
        return {
          lorem: 'ipsum',
          mock: 'mock',
          array: [1, 2, 3, 4, 5]
        }[key]
      },
      has: (key: string) => ['lorem', 'mock', 'array'].includes(key),
      util: {
        setModuleDefaults: vitest.fn()
      }
    }
  }
})

class MockService {
  @Configurable()
  getMock(@ConfigParam('mock') mock?: string) {
    return mock
  }

  @Configurable()
  getArray(@ConfigParam('array') arr?: number[]) {
    return arr
  }

  @Configurable()
  getFallback(@ConfigParam('not_found', 'fallback') fallback?: string) {
    return fallback
  }

  // @ConfigParam() does not work without @Configurable()
  faulty(@ConfigParam('mock') mock?: string) {
    return mock
  }
}

describe('config decorator', () => {
  let service: MockService
  let configGet: ReturnType<typeof vitest.spyOn>

  beforeAll(() => {
    service = new MockService()
    configGet = vitest.spyOn(config, 'get')
  })

  beforeEach(() => {
    vitest.clearAllMocks()
  })

  test('should return parameters values from the config', () => {
    expect(service.getMock()).toEqual('mock')
    expect(service.getArray()).toEqual([1, 2, 3, 4, 5])
    expect(service.getFallback()).toEqual('fallback')
    expect(service.faulty()).toBeUndefined()

    expect(configGet).toHaveBeenCalled()
  })

  test('should return manual parameters without accessing the config', () => {
    expect(service.getMock('lorem')).toEqual('lorem')
    expect(service.getArray([10, 11])).toEqual([10, 11])
    expect(service.faulty('example')).toEqual('example')

    expect(configGet).not.toHaveBeenCalled()
  })
})
