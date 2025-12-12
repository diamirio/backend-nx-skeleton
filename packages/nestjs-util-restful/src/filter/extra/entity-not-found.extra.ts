import { HttpStatus } from '@nestjs/common'
import type { EntityNotFoundError } from 'typeorm'

import { AbstractExceptionFilter } from '../abstract-exception.filter'
import type { AbstractError, AbstractErrorOptions } from '../interface'

export class EntityNotFoundExtra extends AbstractExceptionFilter<EntityNotFoundError> {
  defaultOptions(): AbstractErrorOptions {
    return {
      logging: true,
      printStack: false
    }
  }

  errorCode(): number {
    return HttpStatus.NOT_FOUND
  }

  payload(exception: EntityNotFoundError): AbstractError {
    let entityClass: string

    if (typeof exception.entityClass === 'string') {
      entityClass = exception.entityClass
    } else {
      entityClass = (exception.entityClass as { name: string }).name ?? 'Entity'
    }

    return { message: `${entityClass} not found` }
  }
}
