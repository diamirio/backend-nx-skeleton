import { Logger } from '@nestjs/common'

/**
 * A singular seed that should be extended from, for seeding MongoDB.
 */
export abstract class MongoDBSeed {
  protected logger: Logger = new Logger(this.constructor.name)

  abstract run (): Promise<void>
}
