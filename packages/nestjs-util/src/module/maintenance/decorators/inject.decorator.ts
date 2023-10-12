import { Inject } from '@nestjs/common'

import { MaintenanceService } from '../maintenance.service'

/**
 * Injects maintenance service instance initiated to the service.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectMaintenanceService () {
  return Inject(MaintenanceService)
}
