import type { ValidationError } from '@nestjs/common'

export interface ClassValidatorError extends Pick<ValidationError, 'property' | 'constraints'> {}
