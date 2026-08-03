import { SetApiInfoHeaderMiddleware } from './info-header'

describe('info-header', () => {
  const middleware = new SetApiInfoHeaderMiddleware()

  const response = {
    setHeader: vitest.fn()
  }

  test('should set response header', () => {
    vitest.stubEnv('PACKAGE_NAME', 'info_header_mock')
    vitest.stubEnv('PACKAGE_VERSION', '3.8.1')

    expect(() => middleware.use(null as never, response, vitest.fn())).not.toThrow()

    expect(response.setHeader).toHaveBeenCalledWith('X-Api-Name', 'info_header_mock')
    expect(response.setHeader).toHaveBeenCalledWith('X-Api-Version', '3.8.1')
  })
})
