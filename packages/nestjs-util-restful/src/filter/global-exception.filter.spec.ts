/** biome-ignore-all lint/complexity/useLiteralKeys: override private fields for tests */
import type { ArgumentsHost } from '@nestjs/common'
import { HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import { ProblemJsonFormatter } from './formatter/problem-json.formatter'
import { GlobalExceptionFilter } from './global-exception.filter'

const t = <T>(obj: unknown): T => obj as T

describe('Global-Exception filter', () => {
  const reply = vitest.fn()

  const httpAdapterHost = {
    httpAdapter: {
      reply,
      setHeader: vitest.fn()
    }
  }
  const argumentHost = {
    switchToHttp: () => ({
      getResponse: vitest.fn()
    })
  }
  const filter = new GlobalExceptionFilter(t<HttpAdapterHost>(httpAdapterHost))

  const errorLog = vitest.spyOn((filter as any).logger, 'error').mockImplementation(vitest.fn())

  afterEach(() => {
    vitest.clearAllMocks()
    reply.mockClear()
  })

  test('should be defined', () => {
    expect(filter).toBeDefined()
  })

  describe('Default options', () => {
    test('should catch and format NotFoundException', async () => {
      await filter.catch(new NotFoundException('MOCK Not Found'), t<ArgumentsHost>(argumentHost))

      expect(errorLog).toHaveBeenCalledOnce()
      expect(reply).toHaveBeenCalledOnce()

      expect(errorLog.mock.lastCall[0]).toEqual('NotFoundException: MOCK Not Found')
      expect(reply.mock.lastCall[1]).toMatchObject({
        message: 'MOCK Not Found',
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found'
      })
      expect(reply.mock.lastCall[2]).toBe(HttpStatus.NOT_FOUND)
    })

    test('should catch and format InternalServerErrorException', async () => {
      await filter.catch(new InternalServerErrorException('MOCK Internal'), t<ArgumentsHost>(argumentHost))

      expect(errorLog).toHaveBeenCalledOnce()
      expect(reply).toHaveBeenCalledOnce()

      expect(errorLog.mock.lastCall[0]).toEqual('InternalServerErrorException: MOCK Internal')
      expect(reply.mock.lastCall[1]).toMatchObject({
        message: 'MOCK Internal',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      })
      expect(reply.mock.lastCall[2]).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    })

    test('should catch and format general error with default status-code', async () => {
      await filter.catch(new Error('unexpected failure'), t<ArgumentsHost>(argumentHost))

      expect(errorLog).toHaveBeenCalledOnce()
      expect(reply).toHaveBeenCalledOnce()

      expect(errorLog.mock.lastCall[0]).toEqual('Error: unexpected failure')
      expect(reply.mock.lastCall[1]).toMatchObject({
        message: 'unexpected failure',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error'
      })
      expect(reply.mock.lastCall[2]).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    })

    test('should pass service data to guard', async () => {
      const exception: any = new Error('msp error')

      exception.service = 'mock_service'
      exception.statusCode = HttpStatus.BAD_REQUEST

      await filter.catch(exception, t<ArgumentsHost>(argumentHost))

      expect(errorLog).toHaveBeenCalledOnce()
      expect(reply).toHaveBeenCalledOnce()

      expect(errorLog.mock.lastCall[0]).toEqual('[mock_service] msp error')
      expect(reply.mock.lastCall[1]).toMatchObject({
        message: 'msp error',
        service: 'mock_service',
        statusCode: HttpStatus.BAD_REQUEST
      })
      expect(reply.mock.lastCall[2]).toBe(HttpStatus.BAD_REQUEST)
    })

    test('should print cause beside error', async () => {
      await filter.catch(
        new InternalServerErrorException('MOCK Internal', { cause: new Error('MOCK cause') }),
        t<ArgumentsHost>(argumentHost)
      )

      expect(errorLog).toHaveBeenCalledTimes(2)
      expect(reply).toHaveBeenCalledOnce()

      expect(errorLog.mock.calls[0][0]).toEqual('InternalServerErrorException: MOCK Internal')
      expect(errorLog.mock.calls[1][0]).toEqual('Caused by: MOCK cause')
      expect(reply.mock.lastCall[1]).toMatchObject({
        message: 'MOCK Internal',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      })
      expect(reply.mock.lastCall[2]).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    })
  })

  describe('Custom options', () => {
    afterEach(() => {
      filter['options'] = filter.defaultOptions()
      t<any>(filter)['formatter'] = undefined
    })

    test('should not log error', async () => {
      filter['options'].logging = false

      await filter.catch(new NotFoundException('MOCK Not Found'), t<ArgumentsHost>(argumentHost))

      expect(errorLog).not.toHaveBeenCalled()
      expect(reply).toHaveBeenCalled()
    })

    test('should use custom formatter', async () => {
      t<any>(filter)['formatter'] = {
        getContentType: () => 'plain/text',
        format: ({ message }) => message.toUpperCase()
      }

      await filter.catch(new NotFoundException('mock not-found'), t<ArgumentsHost>(argumentHost))

      expect(errorLog).toHaveBeenCalled()
      expect(reply).toHaveBeenCalled()

      expect(errorLog.mock.lastCall[0]).toEqual('NotFoundException: mock not-found')
      expect(reply.mock.lastCall[1]).toEqual('MOCK NOT-FOUND')
    })

    test('should use custom formatter and log format', async () => {
      t<any>(filter)['formatter'] = {
        getContentType: () => 'plain/text',
        format: ({ message }) => message.toLowerCase()
      }
      filter.formatLogMessage = ({ message }) => message.toUpperCase()

      await filter.catch(new NotFoundException('MOCK not-found'), t<ArgumentsHost>(argumentHost))

      expect(errorLog).toHaveBeenCalled()
      expect(reply).toHaveBeenCalled()

      expect(errorLog.mock.lastCall[0]).toEqual('MOCK NOT-FOUND')
      expect(reply.mock.lastCall[1]).toEqual('mock not-found')
    })

    test('should use problem+json formatter', async () => {
      t<any>(filter)['formatter'] = new ProblemJsonFormatter()

      await filter.catch(new NotFoundException('mock not-found'), t<ArgumentsHost>(argumentHost))

      expect(reply).toHaveBeenCalled()

      expect(reply.mock.lastCall[1]).toMatchObject({
        type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404',
        title: 'mock not-found',
        status: 404,
        error: 'Not Found'
      })
    })
  })
})
