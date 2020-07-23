import { SetMetadata, ValidationPipeOptions, CustomDecorator } from '@nestjs/common'

import { OVERRIDE_VALIDATION } from './validation-override.constants'

export function OverrideValidationOptions (override: ValidationPipeOptions): CustomDecorator<symbol> {
  return SetMetadata(OVERRIDE_VALIDATION, override)
}
