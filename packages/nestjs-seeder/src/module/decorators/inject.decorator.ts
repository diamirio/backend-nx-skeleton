import { Inject } from '@nestjs/common'

import { SeederService } from '@module/seeder.service'

/**
 * Injects SeederService to the service.
 */
export function InjectSeederService (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(SeederService)
}
