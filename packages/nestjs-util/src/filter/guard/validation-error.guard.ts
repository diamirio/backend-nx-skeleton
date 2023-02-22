import type { BadRequestException, ValidationError } from '@nestjs/common'

import type { ClassValidatorException } from '@filter/interface'

export function isValidationError (exception: BadRequestException): exception is ClassValidatorException {
  if (typeof exception === 'object' && !exception.hasOwnProperty('validation')) {
    return false
  } else if (typeof exception !== 'object') {
    return false
  }

  const validatorException = exception as ClassValidatorException
  const messages = validatorException.validation

  // note: 'constraints' is only included on leaves of tree
  const keys: (keyof ValidationError)[] = ['target', 'value', 'property', 'children']

  return messages.every((message) => keys.every((key) => Object.keys(message).includes(key)))
}
