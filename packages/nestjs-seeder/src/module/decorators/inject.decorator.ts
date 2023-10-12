import { Inject } from '@nestjs/common'

import { SeederService } from '@module/seeder.service'

/**
 * Injects SeederService to the service.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectSeederService () {
  return Inject(SeederService)
}
