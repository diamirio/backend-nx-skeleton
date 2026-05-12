import { Logger } from '@nestjs/common'

import { useRetry } from './use-retry'

describe('Use retry', () => {
  let loggerWarn: jest.SpyInstance

  beforeAll(() => {
    loggerWarn = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => jest.fn())
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(useRetry).toBeDefined()
  })

  test('should not retry', async () => {
    const fn = jest.fn().mockResolvedValue('mock')

    await expect(useRetry(fn, { retry: 2, interval: 5, name: 'none' })).resolves.toEqual('mock')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(loggerWarn).not.toHaveBeenCalled()
  })

  test('should retry once', async () => {
    let i = 0
    const fn = jest.fn().mockImplementation(() => {
      return i++ === 0 ? Promise.reject(i) : Promise.resolve(i)
    })

    await expect(useRetry(fn, { retry: 5, interval: 5, name: 'once' })).resolves.toEqual(2)

    expect(fn).toHaveBeenCalledTimes(2)
    expect(loggerWarn).toHaveBeenCalledTimes(1)
  })

  test('should retry until out of retries', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('mock'))

    await expect(useRetry(fn, { retry: 3, interval: 5, name: 'fail' })).rejects.toThrow('mock')

    expect(fn).toHaveBeenCalledTimes(3)
    expect(loggerWarn).toHaveBeenCalledTimes(2)
  })
})
