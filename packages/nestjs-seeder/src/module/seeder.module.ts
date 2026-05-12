import type { DynamicModule } from '@nestjs/common'
import { Module } from '@nestjs/common'

import { SEEDER_SEEDS } from '../constants'
import type { Seeds } from '../interfaces/seeds.interface'
import { SeederService } from './seeder.service'

/**
 * SeederModule provides the interface to run the seeds.
 */
@Module({})
export class SeederModule {
  static register(seeds: Seeds, inject?: Pick<DynamicModule, 'imports' | 'providers'>): DynamicModule {
    return {
      module: SeederModule,
      imports: [...(inject?.imports ?? [])],
      providers: [
        SeederService,
        {
          provide: SEEDER_SEEDS,
          useValue: seeds
        },
        ...Object.values(seeds),
        ...(inject?.providers ?? [])
      ],
      exports: [SeederService]
    }
  }
}
