import { Inject } from '@nestjs/common'

import { MongoDBSeederService } from '@module/mongodb-seeder.service'

/**
 * Injects Keyclaok admin instance initiated to the service.
 */
export function InjectMongoDBSeederService (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(MongoDBSeederService)
}
