import { map, timer } from 'rxjs'

import { RequestProfilerInterceptor } from './request-profiler.interceptor'

describe('request-profiler', () => {
  afterEach(() => {
    vitest.clearAllMocks()
  })

  const service = new RequestProfilerInterceptor()

  const getRequest = vitest.fn()
  const getResponse = vitest.fn()
  const context = {
    switchToHttp: () => ({
      getRequest,
      getResponse
    })
  } as any
  const next = {
    handle: () => timer(250).pipe(map(() => ({ data: 'mock' })))
  }

  const log = vitest.fn()
  vitest.spyOn(service as any, 'logger', 'get').mockReturnValue({ log })

  test('should be defined', () => {
    expect(service).toBeDefined()
  })

  test('should print request details - 200', async () => {
    vitest.useFakeTimers()

    getRequest.mockReturnValue({ raw: { url: '/mock', method: 'GET' } })
    getResponse.mockReturnValue({ raw: { statusCode: 200 } })

    service.intercept(context, next).subscribe({
      next: (data) => {
        expect(data).toEqual({ data: 'mock' })
      }
    })

    await vitest.runAllTimersAsync()

    expect(log).toHaveBeenCalledWith('GET /mock starting...')
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/GET \/mock finished - 200 - took: \d\.\d+ sec/))
  })

  test('should print request details - 404', async () => {
    vitest.useFakeTimers()

    getRequest.mockReturnValue({ raw: { url: '/mocking', method: 'DELETE' } })
    getResponse.mockReturnValue({ raw: { statusCode: 404 } })

    service.intercept(context, next).subscribe({
      next: (data) => {
        expect(data).toEqual({ data: 'mock' })
      }
    })

    await vitest.runAllTimersAsync()

    expect(log).toHaveBeenCalledWith('DELETE /mocking starting...')
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/DELETE \/mocking finished - 404 - took: \d\.\d+ sec/))
  })
})
