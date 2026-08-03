import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { SwaggerService } from './swagger.service'

vitest.mock(import('@nestjs/swagger'), async (importOriginal) => {
  const original = await importOriginal()

  return {
    ...original,
    // biome-ignore lint/style/useNamingConvention: class override
    SwaggerModule: {
      setup: vitest.fn(),
      createDocument: vitest.fn().mockReturnValue({ openapi: 'mock' })
    }
  } as any
})

describe('SwaggerService', () => {
  afterEach(() => {
    vitest.clearAllMocks()
    vitest.unstubAllEnvs()
  })

  const app = {} as any
  vitest.spyOn(DocumentBuilder.prototype, 'setTitle')
  vitest.spyOn(DocumentBuilder.prototype, 'setDescription')
  vitest.spyOn(DocumentBuilder.prototype, 'setVersion')

  test('should not setup swagger if not enabled in config', () => {
    expect(() => SwaggerService.enable(app, { enabled: false } as any)).not.toThrow()

    expect(DocumentBuilder.prototype.setTitle).not.toHaveBeenCalled()
    expect(SwaggerModule.setup).not.toHaveBeenCalled()
  })

  test('should setup swagger without config', () => {
    vitest.stubEnv('PACKAGE_VERSION', '0.1.2')

    expect(() => SwaggerService.enable(app)).not.toThrow()

    expect(DocumentBuilder.prototype.setTitle).toHaveBeenCalledWith(undefined)
    expect(DocumentBuilder.prototype.setDescription).toHaveBeenCalledWith(undefined)
    expect(DocumentBuilder.prototype.setVersion).toHaveBeenCalledWith('0.1.2')
    expect(SwaggerModule.createDocument).toHaveBeenCalled()
    expect(SwaggerModule.setup).toHaveBeenCalledWith('internal/docs', app, { openapi: 'mock' }, undefined)
  })

  test('should setup swagger with config', () => {
    vitest.stubEnv('PACKAGE_VERSION', '0.1.1')

    expect(() =>
      SwaggerService.enable(
        app,
        {
          enabled: true,
          title: 'MOCK swagger',
          description: 'Lorem ipsum',
          path: 'some/custom/path'
        },
        { apiPath: 'mock' }
      )
    ).not.toThrow()

    expect(DocumentBuilder.prototype.setTitle).toHaveBeenCalledWith('MOCK swagger')
    expect(DocumentBuilder.prototype.setDescription).toHaveBeenCalledWith('Lorem ipsum')
    expect(DocumentBuilder.prototype.setVersion).toHaveBeenCalledWith('0.1.1')
    expect(SwaggerModule.createDocument).toHaveBeenCalled()
    expect(SwaggerModule.setup).toHaveBeenCalledWith('mock/some/custom/path', app, { openapi: 'mock' }, undefined)
  })

  test('should setup swagger with customize function', () => {
    vitest.stubEnv('PACKAGE_VERSION', '0.1.1')
    const customize = vitest.fn().mockImplementation((b) => b)

    expect(() =>
      SwaggerService.enable(
        app,
        {
          enabled: true,
          title: 'MOCK swagger',
          description: 'Lorem ipsum',
          path: 'some/custom/path',
          custom: {
            customSiteTitle: 'MOCK site title'
          }
        },
        { apiPath: 'mock' },
        { customize }
      )
    ).not.toThrow()

    expect(DocumentBuilder.prototype.setTitle).toHaveBeenCalledWith('MOCK swagger')
    expect(DocumentBuilder.prototype.setDescription).toHaveBeenCalledWith('Lorem ipsum')
    expect(DocumentBuilder.prototype.setVersion).toHaveBeenCalledWith('0.1.1')
    expect(customize).toHaveBeenCalled()
    expect(SwaggerModule.createDocument).toHaveBeenCalled()
    expect(SwaggerModule.setup).toHaveBeenCalledWith(
      'mock/some/custom/path',
      app,
      { openapi: 'mock' },
      { customSiteTitle: 'MOCK site title' }
    )
  })
})
