import { Logger } from '@nestjs/common'

import { Retry } from './retry.decorator'

class Mock {
  private i: number = 0

  @Retry({ retry: 2, interval: 5, name: 'none' })
  retryNone() {
    return Promise.resolve('mock')
  }

  @Retry({ retry: 5, interval: 5, name: 'once' })
  retryOnce() {
    return this.i++ === 0 ? Promise.reject(this.i) : Promise.resolve(this.i)
  }

  @Retry({ retry: 6, interval: 5, name: 'fail' })
  retryFail() {
    return Promise.reject(new Error('mock'))
  }
}

describe('Retry decorator', () => {
  let mock: Mock
  let loggerWarn: jest.SpyInstance

  beforeAll(() => {
    loggerWarn = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => jest.fn())

    mock = new Mock()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should not retry', async () => {
    await expect(mock.retryNone()).resolves.toEqual('mock')

    expect(loggerWarn).not.toHaveBeenCalled()
  })

  test('should retry once', async () => {
    await expect(mock.retryOnce()).resolves.toEqual(2)

    expect(loggerWarn).toHaveBeenCalledTimes(1)
  })

  test('should retry until out of retries', async () => {
    await expect(mock.retryFail()).rejects.toThrow('mock')

    expect(loggerWarn).toHaveBeenCalledTimes(5)
  })
})
