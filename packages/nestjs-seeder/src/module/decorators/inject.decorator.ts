import { Inject } from '@nestjs/common'

import { SEEDER_SERVICE } from '../seeder.constants'

/**
 * Injects SeederService to the service.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectSeederService (token?: string | symbol) {
  return Inject(token ?? SEEDER_SERVICE)
}
