import { BadRequestException, Catch } from '@nestjs/common'

import { AbstractExceptionFilter } from './abstract-exception.filter'
import type { AbstractError, AbstractErrorOptions } from './interface'

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends AbstractExceptionFilter<BadRequestException> {
  defaultOptions(): AbstractErrorOptions {
    return {
      logging: true,
      printStack: false
    }
  }

  payload(exception: BadRequestException): AbstractError {
    const message = (exception.getResponse() as any).message ?? exception.message

    if (Array.isArray(message)) {
      return {
        message: message[0],
        messages: message
      }
    }

    return { message }
  }

  protected formatLogMessage(exception: BadRequestException): string {
    const errors = (exception.getResponse() as any)?.message ?? exception.message
    let messages = ''

    if (Array.isArray(errors)) {
      messages = `\n- ${errors.join('- \n')}`
    }

    return `[${exception.name}] ${exception.message}${messages}`
  }
}
