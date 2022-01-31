import { Inject } from '@nestjs/common'

import { MicroserviceProviderService } from '../microservice-provider.service'

/**
 * Injects Keyclaok admin instance initiated to the service.
 */
export function InjectMSP (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(MicroserviceProviderService)
}
