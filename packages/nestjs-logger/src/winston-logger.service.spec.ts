/** biome-ignore-all lint/complexity/useLiteralKeys: we need access to private properties */
/** biome-ignore-all lint/style/useNamingConvention: winston transport names */
import { createLogger, transports } from 'winston'

import { JsonFormat } from './format/json.format'
import { LogLevel } from './logger.constants'
import { WinstonLogger } from './winston-logger.service'

jest.mock('winston', () => {
  const winston = jest.requireActual('winston')

  return {
    ...winston,
    createLogger: jest.fn(),
    transports: {
      Console: jest.fn()
    }
  }
})

describe('Winston Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should use default logger constructor', () => {
    const logger = new WinstonLogger()

    expect(logger).toBeDefined()
    expect(logger['context']).toBeUndefined()
    expect(logger['options']).toEqual({ context: undefined, logLevel: LogLevel.debug })

    expect(createLogger).toHaveBeenCalledWith({
      level: LogLevel.debug,
      silent: false,
      transports: expect.any(Array)
    })
  })

  test('should use given context in logger constructor', () => {
    const logger = new WinstonLogger('MOCK_CONTEXT')

    expect(logger).toBeDefined()
    expect(logger['context']).toEqual('MOCK_CONTEXT')
    expect(logger['options']).toEqual({ context: 'MOCK_CONTEXT', logLevel: LogLevel.debug })

    expect(createLogger).toHaveBeenCalledWith({
      level: LogLevel.debug,
      silent: false,
      transports: expect.any(Array)
    })
  })

  test('should use given options in logger constructor', () => {
    const logger = new WinstonLogger({ context: 'MOCK_CONTEXT', logLevel: LogLevel.warn })

    expect(logger).toBeDefined()
    expect(logger['context']).toEqual('MOCK_CONTEXT')
    expect(logger['options']).toEqual({ context: 'MOCK_CONTEXT', logLevel: LogLevel.warn })

    expect(createLogger).toHaveBeenCalledWith({
      level: LogLevel.warn,
      silent: false,
      transports: expect.any(Array)
    })
  })

  test('should use context string over options in logger constructor', () => {
    const logger = new WinstonLogger('CONTEXT', { context: 'MOCK_CONTEXT', logLevel: LogLevel.info })

    expect(logger).toBeDefined()
    expect(logger['context']).toEqual('CONTEXT')
    expect(logger['options']).toEqual({ context: 'CONTEXT', logLevel: LogLevel.info })

    expect(createLogger).toHaveBeenCalledWith({
      level: LogLevel.info,
      silent: false,
      transports: expect.any(Array)
    })
  })

  test('should use format passed in options in logger constructor', () => {
    const logger = new WinstonLogger('JSON', { context: 'MOCK_CONTEXT', format: JsonFormat })

    expect(logger).toBeDefined()
    expect(logger['context']).toEqual('JSON')
    expect(logger['options']).toEqual({ context: 'JSON', logLevel: LogLevel.debug, format: JsonFormat })

    expect(createLogger).toHaveBeenCalledWith({
      level: LogLevel.debug,
      silent: false,
      transports: expect.any(Array)
    })
    expect(transports.Console).toHaveBeenCalledWith({ format: JsonFormat })
  })

  test('should create silent logger constructor', () => {
    const logger = new WinstonLogger('CONTEXT', { context: 'MOCK_CONTEXT', logLevel: LogLevel.none })

    expect(logger).toBeDefined()
    expect(logger['context']).toEqual('CONTEXT')
    expect(logger['options']).toEqual({ context: 'CONTEXT', logLevel: LogLevel.none })

    expect(createLogger).toHaveBeenCalledWith({
      level: LogLevel.none,
      silent: true,
      transports: expect.any(Array)
    })
  })

  test('should override default transporter in logger constructor', () => {
    const logger = new WinstonLogger('CONTEXT', {
      context: 'MOCK_CONTEXT',
      logLevel: LogLevel.warn,
      transports: ['MOCK'] as any
    })

    expect(logger).toBeDefined()
    expect(logger['context']).toEqual('CONTEXT')
    expect(logger['options']).toEqual({ context: 'CONTEXT', logLevel: LogLevel.warn, transports: ['MOCK'] as any })

    expect(createLogger).toHaveBeenCalledWith({
      level: LogLevel.warn,
      silent: false,
      transports: ['MOCK']
    })
  })
})
