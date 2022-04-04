import type { ArgumentMetadata, ValidationError } from '@nestjs/common'
import { Injectable, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'

import { ClassValidatorException } from '@filter/exception.interface'

@Injectable()
export class ExtendedValidationPipe extends ValidationPipe {
  constructor (options?: ValidationPipeOptions) {
    super({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]): ClassValidatorException => new ClassValidatorException(errors),
      ...options
    })
  }

  async transform (value: any, metadata: ArgumentMetadata): Promise<any> {
    // run transform
    const result = super.transform(value, metadata)

    return result
  }
}
