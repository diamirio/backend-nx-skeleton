/** biome-ignore-all lint/complexity/useLiteralKeys: access to private properties */
import { rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { MaintenanceService } from './maintenance.service'

jest.mock('node:path', () => {
  return {
    resolve: jest.fn((path: string) => path)
  }
})
jest.mock('node:fs/promises', () => {
  return {
    writeFile: jest.fn(),
    rm: jest.fn()
  }
})

describe('Maintenance Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    MaintenanceService.instance = undefined // reset singleton
  })

  test('should create singleton instance', () => {
    expect(MaintenanceService.instance).toBeUndefined()
    expect(resolve).not.toHaveBeenCalled()

    const service = new MaintenanceService()
    expect(resolve).toHaveBeenCalledTimes(1)
    expect(MaintenanceService.instance).toBeDefined()
    expect(service.message).toEqual('Application is currently down for maintenance')
    expect(resolve).toHaveBeenCalledWith('maintenance.lock')

    new MaintenanceService()
    new MaintenanceService()
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  test('should use constructor options', () => {
    const service = new MaintenanceService({ application: 'mock', lockfilePath: 'mock.lock' })

    expect(resolve).toHaveBeenCalledWith('mock.lock')
    expect(service.message).toEqual('mock is currently down for maintenance')
  })

  test('should enable lock', async () => {
    const service = new MaintenanceService({ application: 'mock', lockfilePath: 'mock.lock' })
    jest.replaceProperty(service as any, 'logger', { log: jest.fn(), debug: jest.fn(), verbose: jest.fn() })
    jest.spyOn(service, 'isEnabled').mockResolvedValue(false)

    expect(service['tasks']).toEqual([])
    await expect(service.enable('mock')).resolves.not.toThrow()

    expect(service['tasks']).toEqual(['mock'])
    expect((service as any).logger.debug).toHaveBeenCalledTimes(1)
    expect((service as any).logger.verbose).toHaveBeenCalledTimes(1)
    expect(writeFile).toHaveBeenCalledWith('mock.lock', '', { encoding: 'utf8' })
    expect((service as any).logger.log).toHaveBeenCalledTimes(1)
  })

  test('should skip if already locked', async () => {
    const service = new MaintenanceService({ application: 'mock', lockfilePath: 'mock.lock' })
    jest.replaceProperty(service as any, 'logger', { log: jest.fn(), debug: jest.fn(), verbose: jest.fn() })
    jest.spyOn(service, 'isEnabled').mockResolvedValue(true)

    expect(service['tasks']).toEqual([])
    await expect(service.enable('mock-2')).resolves.not.toThrow()

    expect(service['tasks']).toEqual(['mock-2'])
    expect((service as any).logger.debug).toHaveBeenCalledTimes(1)
    expect((service as any).logger.verbose).toHaveBeenCalledTimes(1)

    expect(writeFile).not.toHaveBeenCalled()
    expect((service as any).logger.log).not.toHaveBeenCalled()
  })

  test('should disable lock if no tasks left', async () => {
    const service = new MaintenanceService({ application: 'mock', lockfilePath: 'mock.lock' })
    jest.replaceProperty(service as any, 'logger', { log: jest.fn(), debug: jest.fn(), verbose: jest.fn() })
    jest.replaceProperty(service as any, 'tasks', ['mock'])

    expect(service['tasks']).toEqual(['mock'])
    await expect(service.disable('mock-1')).resolves.not.toThrow()

    expect(service['tasks']).toEqual([])
    expect((service as any).logger.verbose).toHaveBeenCalledTimes(1)
    expect(rm).toHaveBeenCalledWith('mock.lock')
    expect((service as any).logger.debug).not.toHaveBeenCalled()
    expect((service as any).logger.log).toHaveBeenCalledTimes(1)
  })

  test('should not disable lock if still tasks left', async () => {
    const service = new MaintenanceService({ application: 'mock', lockfilePath: 'mock.lock' })
    jest.replaceProperty(service as any, 'logger', { log: jest.fn(), debug: jest.fn(), verbose: jest.fn() })
    jest.replaceProperty(service as any, 'tasks', ['mock', 'mock-1', 'mock-2'])

    expect(service['tasks']).toEqual(['mock', 'mock-1', 'mock-2'])
    await expect(service.disable('mock-1')).resolves.not.toThrow()

    expect(service['tasks']).toEqual(['mock', 'mock-2'])
    expect((service as any).logger.verbose).toHaveBeenCalledTimes(1)
    expect(rm).not.toHaveBeenCalled()
    expect((service as any).logger.debug).not.toHaveBeenCalled()
    expect((service as any).logger.log).not.toHaveBeenCalled()
  })
})
