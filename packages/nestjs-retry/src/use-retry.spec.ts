import { Logger } from '@nestjs/common'

import { useRetry } from './use-retry'

describe('Use retry', () => {
  let loggerWarn: ReturnType<typeof vitest.spyOn>

  beforeAll(() => {
    loggerWarn = vitest.spyOn(Logger.prototype, 'warn').mockImplementation(() => vitest.fn())
  })

  beforeEach(() => {
    vitest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(useRetry).toBeDefined()
  })

  test('should not retry', async () => {
    const fn = vitest.fn().mockResolvedValue('mock')

    await expect(useRetry(fn, { retry: 2, interval: 5, name: 'none' })).resolves.toEqual('mock')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(loggerWarn).not.toHaveBeenCalled()
  })

  test('should retry once', async () => {
    let i = 0
    const fn = vitest.fn().mockImplementation(() => {
      return i++ === 0 ? Promise.reject(i) : Promise.resolve(i)
    })

    await expect(useRetry(fn, { retry: 5, interval: 5, name: 'once' })).resolves.toEqual(2)

    expect(fn).toHaveBeenCalledTimes(2)
    expect(loggerWarn).toHaveBeenCalledTimes(1)
  })

  test('should retry until out of retries', async () => {
    const fn = vitest.fn().mockRejectedValue(new Error('mock'))

    await expect(useRetry(fn, { retry: 3, interval: 5, name: 'fail' })).rejects.toThrow('mock')

    expect(fn).toHaveBeenCalledTimes(3)
    expect(loggerWarn).toHaveBeenCalledTimes(2)
  })
})
