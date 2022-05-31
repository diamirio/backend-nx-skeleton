import { Inject, Injectable, Logger } from '@nestjs/common'

import { MONGODB_SEEDER_SEEDS } from '@constants/injection.constants'
import { MongoDBSeed } from '@interfaces/mongodb-seed'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { MongoDBSeeds } from '@interfaces/mongodb-seed.interface'

/**
 * Seeder service to run all the seeds that has been passed to it.
 */
@Injectable()
export class MongoDBSeederService {
  protected readonly logger = new Logger(this.constructor.name)

  constructor (@Inject(MONGODB_SEEDER_SEEDS) protected readonly seeds: MongoDBSeeds) {}

  /**
   * Run all the seeds.
   */
  async init (): Promise<void> {
    for (const [name, Seed] of Object.entries(this.seeds)) {
      const seed = Inject(Seed)

      if (!(seed instanceof MongoDBSeed)) {
        throw new Error(`Seed is not a ${MongoDBSeed.name}: ${name}`)
      }

      this.logger.log(`Running seed: ${name}`)

      await seed.run()

      this.logger.log(`Finished seed: ${name}`)
    }

    this.logger.log('Finished seeding.')
  }
}
