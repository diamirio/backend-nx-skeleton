import { Logger } from '@nestjs/common'

import { registerExitListeners } from './process'

// vitest.mock(import('@nestjs/common'), async (importOriginal) => {
//   return {
//     ...importOriginal,
//     // biome-ignore lint/style/useNamingConvention: class override
//     Logger: vitest.fn(class {
//       log = vitest.fn()
//       debug = vitest.fn()
//       verbose = vitest.fn()
//     }) as any
//   }
// })

describe('process', () => {
  const listeners = {}

  beforeAll(() => {
    vitest.stubGlobal('process', {
      ...process,
      on: vitest.fn().mockImplementation((signal, listener) => {
        listeners[signal] = listener
      }),
      emit: vitest.fn().mockImplementation((signal) => {
        listeners[signal]()
      }),
      exit: vitest.fn()
    })

    vitest.spyOn(Logger.prototype, 'debug').mockImplementation(vitest.fn())
    vitest.spyOn(Logger.prototype, 'verbose').mockImplementation(vitest.fn())
    vitest.spyOn(Logger.prototype, 'log').mockImplementation(vitest.fn())
  })

  afterAll(() => {
    vitest.unstubAllGlobals()
  })

  test('should register exit-listener', () => {
    expect(() => registerExitListeners('mock')).not.toThrow()

    expect(process.on).toHaveBeenCalledWith('SIGTERM', expect.any(Function))
    expect(process.on).toHaveBeenCalledWith('SIGINT', expect.any(Function))
    expect(process.on).toHaveBeenCalledWith('exit', expect.any(Function))

    expect(Logger.prototype.debug).toHaveBeenCalledWith('Exit listeners registered.')
  })

  test('should trigger exit via SIGTERM', () => {
    process.emit('SIGTERM')

    expect(process.exit).toHaveBeenCalled()
    expect(Logger.prototype.verbose).toHaveBeenCalledWith('---- mock exiting via SIGTERM ----')
  })

  test('should trigger exit via SIGINT', () => {
    process.emit('SIGINT')

    expect(process.exit).toHaveBeenCalled()
    expect(Logger.prototype.verbose).toHaveBeenCalledWith('---- mock exiting via SIGINT ----')
  })
})
