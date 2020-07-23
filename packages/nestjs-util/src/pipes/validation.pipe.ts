import { ValidationPipe, ValidationError, ValidationPipeOptions, Injectable, ArgumentMetadata } from '@nestjs/common'

import { ClassValidatorException } from '../filter/exception.interface'
import { OVERRIDE_VALIDATION } from './../decorator/validation-override/validation-override.constants'

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
    // get the override decorator
    const options = Reflect.getMetadata(OVERRIDE_VALIDATION, metadata)

    // store original options
    let originOptions: ValidationPipeOptions
    if (options) {
      originOptions = Object.assign({}, this.validatorOptions)
      this.validatorOptions = Object.assign(this.validatorOptions, options)
    }

    // run transform
    const result = super.transform(value, metadata)

    // rollback to original options
    if (originOptions) {
      this.validatorOptions = originOptions
    }

    return result
  }
}
