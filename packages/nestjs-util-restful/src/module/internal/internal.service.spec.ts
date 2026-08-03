import fs from 'node:fs/promises'

import { InternalService } from './internal.service'

vitest.mock(import('node:fs/promises'), () => {
  return {
    default: {
      stat: vitest.fn()
    }
  } as any
})

describe('InternalService', () => {
  afterEach(() => {
    vitest.clearAllMocks()
    vitest.unstubAllEnvs()
  })

  describe('default config', () => {
    const service = new InternalService()

    test('should be defined', () => {
      expect(service).toBeDefined()
    })

    test('should return api-status', async () => {
      const statDate = new Date()

      vitest.stubEnv('PACKAGE_VERSION', '0.2.1')
      vitest.mocked(fs.stat).mockResolvedValue({ mtime: statDate } as any)

      await expect(service.checkApiStatus()).resolves.toEqual({
        apiVersion: '0.2.1',
        lastUpdate: statDate.toISOString()
      })
    })
  })

  describe('config to not include last-update', () => {
    const service = new InternalService({ enabled: true, includeLastUpdate: false })

    test('should be defined', () => {
      expect(service).toBeDefined()
    })

    test('should return api-status', async () => {
      vitest.stubEnv('PACKAGE_VERSION', '0.2.2')

      expect(fs.stat).not.toHaveBeenCalled()
      await expect(service.checkApiStatus()).resolves.toEqual({
        apiVersion: '0.2.2',
        lastUpdate: undefined
      })
    })
  })
})
