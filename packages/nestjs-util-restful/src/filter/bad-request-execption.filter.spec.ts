import { BadRequestException } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import { BadRequestExceptionFilter } from './bad-request-exception.filter'

const t = <T>(obj: unknown): T => obj as T

describe('Bad-Request-Exception filter', () => {
  const reply = vitest.fn()

  const httpAdapterHost = {
    httpAdapter: {
      reply,
      setHeader: vitest.fn()
    }
  }
  const filter = new BadRequestExceptionFilter(t<HttpAdapterHost>(httpAdapterHost))
  const exception = new BadRequestException({
    message: ['Property a missing', 'Property b invalid', 'Property c missing']
  })

  test('should be defined', () => {
    expect(filter).toBeDefined()
  })

  test('should handle validation error array', () => {
    expect(filter.payload(exception)).toEqual({
      message: 'Property a missing',
      messages: ['Property a missing', 'Property b invalid', 'Property c missing']
    })
  })

  test('should log array values', () => {
    expect((filter as any).formatLogMessage(exception)).toEqual(
      '[BadRequestException] Bad Request Exception\n- Property a missing\n- Property b invalid\n- Property c missing'
    )
  })
})
