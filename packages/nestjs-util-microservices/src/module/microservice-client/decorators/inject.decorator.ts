import { Inject } from '@nestjs/common'

import { MicroserviceProviderService } from '../microservice-provider.service'

/**
 * Injects microservice provider service instance initiated to the service.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectMSP () {
  return Inject(MicroserviceProviderService)
}
