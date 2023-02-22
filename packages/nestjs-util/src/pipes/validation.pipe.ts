import type { ArgumentMetadata, ValidationError } from '@nestjs/common'
import { Injectable, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'

import { ClassValidatorException } from '@filter'

@Injectable()
export class ExtendedValidationPipe extends ValidationPipe {
  constructor (options?: ValidationPipeOptions) {
    super({
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
