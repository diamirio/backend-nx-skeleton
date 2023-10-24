import type { DynamicModule } from '@nestjs/common'
import { Module } from '@nestjs/common'

import { SEEDER_SERVICE } from './seeder.constants'
import type { SeederModuleOptions } from './seeder.interface'
import { SeederService } from './seeder.service'
import { SEEDER_SEEDS } from '@constants/injection.constants'
import type { Seeds } from '@interfaces/seeds.interface'

/**
 * SeederModule provides the interface to run the seeds.
 */
@Module({})
export class SeederModule {
  static register (seeds: Seeds, inject?: Pick<DynamicModule, 'imports' | 'providers'>, options?: SeederModuleOptions): DynamicModule {
    const token = options?.token ?? SEEDER_SERVICE

    return {
      module: SeederModule,
      imports: [...inject?.imports ?? []],
      providers: [
        {
          provide: token,
          useClass: SeederService
        },
        {
          provide: SEEDER_SEEDS,
          useValue: seeds
        },
        ...Object.values(seeds),
        ...inject?.providers ?? []
      ],
      exports: [token]
    }
  }
}
