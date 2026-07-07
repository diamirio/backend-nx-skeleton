import { InternalModule } from './internal.module'

describe('InternalModule', () => {
  test('should return "empty" module without controller/provider if not enabled', () => {
    const module = InternalModule.forRoot({ enabled: false })

    expect(module.module).toBeDefined()
    expect(module.controllers).toBeUndefined()
    expect(module.providers).toBeUndefined()
    expect(module.exports).toBeUndefined()
  })

  test('should return module with controller/provider if enabled', () => {
    const module = InternalModule.forRoot({ enabled: true })

    expect(module.module).toBeDefined()
    expect(module.controllers).toBeInstanceOf(Array)
    expect(module.providers).toBeInstanceOf(Array)
    expect(module.exports).toBeInstanceOf(Array)
  })
})
