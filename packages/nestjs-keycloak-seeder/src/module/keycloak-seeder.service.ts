import { Inject, Injectable, Logger } from '@nestjs/common'

import { KEYCLOAK_SEEDER_SEEDS } from '@constants/injection.constants'
import { KeycloakSeed } from '@interfaces/keycloak-seed'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { KeycloakSeeds } from '@interfaces/keycloak-seed.interface'
import { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'

/**
 * Seeder service to run all the seeds that has been passed to it.
 */
@Injectable()
export class KeycloakSeederService {
  protected readonly logger = new Logger(this.constructor.name)

  constructor (protected readonly keycloak: KeycloakAdminSeederTools, @Inject(KEYCLOAK_SEEDER_SEEDS) protected readonly seeds: KeycloakSeeds) {}

  /**
   * Run all the seeds.
   */
  async init (): Promise<void> {
    await this.keycloak.getClient()

    for (const [name, Seed] of Object.entries(this.seeds)) {
      const seed = new Seed(this.keycloak)

      if (!(seed instanceof KeycloakSeed)) {
        throw new Error(`Seed is not a ${KeycloakSeed.name}: ${name}`)
      }

      this.logger.log(['Running seed: %s', name])

      await seed.run()

      this.logger.log(['Finished seed: %s', name])
    }

    this.logger.log('Finished seeding.')
  }
}
