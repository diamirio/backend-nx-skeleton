import { Logger } from '@nestjs/common'

/**
 * A singular seed that should be extended from.
 */
export abstract class Seed {
  protected logger: Logger = new Logger(this.constructor.name)

  abstract run (): Promise<void>
}
