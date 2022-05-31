import type { DynamicModule } from '@nestjs/common'
import { Module } from '@nestjs/common'

import { SeederService } from './seeder.service'
import { SEEDER_SEEDS } from '@constants/injection.constants'
import type { Seeds } from '@interfaces/seeds.interface'

/**
 * SeederModule provides the interface to run the seeds.
 */
@Module({})
export class SeederModule {
  static register (seeds: Seeds, inject?: Pick<DynamicModule, 'imports' | 'providers'>): DynamicModule {
    return {
      module: SeederModule,
      imports: [...inject?.imports ?? []],
      providers: [
        SeederService,
        {
          provide: SEEDER_SEEDS,
          useValue: seeds
        },
        ...Object.values(seeds),
        ...inject?.providers ?? []
      ],
      exports: [SeederService]
    }
  }
}
