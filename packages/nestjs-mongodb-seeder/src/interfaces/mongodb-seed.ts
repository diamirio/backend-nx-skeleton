import { Logger } from '@nestjs/common'
import type { Connection } from 'mongoose'

/**
 * A singular seed that should be extended from, for seeding MongoDB.
 */
export abstract class MongoDBSeed {
  protected logger: Logger = new Logger(this.constructor.name)

  constructor (protected client: Connection) {}

  abstract run (): Promise<void>
}
