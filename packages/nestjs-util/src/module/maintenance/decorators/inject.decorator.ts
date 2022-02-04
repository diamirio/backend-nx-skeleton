import { Inject } from '@nestjs/common'

import { MaintenanceService } from '../maintenance.service'

/**
 * Injects maintenance service instance initiated to the service.
 */
export function InjectMaintenanceService (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(MaintenanceService)
}
