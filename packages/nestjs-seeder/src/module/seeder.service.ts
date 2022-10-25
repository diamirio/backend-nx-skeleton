import { Inject, Injectable, Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'

import { SEEDER_SEEDS } from '@constants/injection.constants'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Seeds } from '@interfaces/seeds.interface'

/**
 * Seeder service to run all the seeds that has been passed to it.
 */
@Injectable()
export class SeederService {
  protected readonly logger = new Logger(this.constructor.name)

  constructor (@Inject(SEEDER_SEEDS) protected readonly seeds: Seeds, private moduleRef: ModuleRef) {}

  /**
   * Run all the seeds.
   */
  async init (): Promise<void> {
    for (const [name, Seed] of Object.entries(this.seeds)) {
      const seed = this.moduleRef.get(Seed)

      this.logger.log(['Running seed: %s', name])

      await seed.run()

      this.logger.log(['Finished seed: %s', name])
    }

    this.logger.log('Finished seeding.')
  }
}
