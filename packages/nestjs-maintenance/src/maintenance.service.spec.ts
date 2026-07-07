import { rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { vitest } from 'vitest'

import { MaintenanceService } from './maintenance.service'

vitest.mock(import('node:path'), () => {
  return {
    resolve: vitest.fn((path: string) => path)
  }
})
vitest.mock(import('node:fs/promises'), () => {
  return {
    access: vitest.fn(),
    writeFile: vitest.fn(),
    rm: vitest.fn()
  }
})

describe('Maintenance Service', () => {
  beforeEach(() => {
    vitest.clearAllMocks()
  })

  test('should use constructor options', () => {
    const service = new MaintenanceService({ application: 'mock', lockfilePath: 'mock.lock' })

    expect(resolve).toHaveBeenCalledWith('mock.lock')
    expect(service.message).toEqual('mock is currently down for maintenance')
  })

  test('should enable lock', async () => {
    const service = new MaintenanceService({ application: 'mock', lockfilePath: 'mock.lock' })

    vitest.spyOn(service as any, 'logger', 'get').mockReturnValue({
      debug: vitest.fn(),
      verbose: vitest.fn(),
      log: vitest.fn()
    })
    vitest.spyOn(service, 'isEnabled').mockResolvedValue(false)

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

    vitest.spyOn(service as any, 'logger', 'get').mockReturnValue({
      debug: vitest.fn(),
      verbose: vitest.fn(),
      log: vitest.fn()
    })
    vitest.spyOn(service, 'isEnabled').mockResolvedValue(true)

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

    vitest.spyOn(service as any, 'logger', 'get').mockReturnValue({
      debug: vitest.fn(),
      verbose: vitest.fn(),
      log: vitest.fn()
    })
    vitest.spyOn(service as any, 'tasks', 'get').mockReturnValue(['mock'])

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

    vitest.spyOn(service as any, 'logger', 'get').mockReturnValue({
      debug: vitest.fn(),
      verbose: vitest.fn(),
      log: vitest.fn()
    })
    vitest.spyOn(service as any, 'tasks', 'get').mockReturnValue(['mock', 'mock-1', 'mock-2'])

    expect(service['tasks']).toEqual(['mock', 'mock-1', 'mock-2'])
    await expect(service.disable('mock-1')).resolves.not.toThrow()

    expect(service['tasks']).toEqual(['mock', 'mock-2'])
    expect((service as any).logger.verbose).toHaveBeenCalledTimes(1)
    expect(rm).not.toHaveBeenCalled()
    expect((service as any).logger.debug).not.toHaveBeenCalled()
    expect((service as any).logger.log).not.toHaveBeenCalled()
  })
})
