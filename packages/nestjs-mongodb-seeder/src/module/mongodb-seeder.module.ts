import type { DynamicModule } from '@nestjs/common'
import { Module } from '@nestjs/common'

import { MongoDBSeederService } from './mongodb-seeder.service'
import { MONGODB_SEEDER_SEEDS } from '@constants/injection.constants'
import type { MongoDBSeeds } from '@interfaces/mongodb-seed.interface'

/**
 * MongoDBSeederModule provides the interface to run the seeds, any MongoDB connection should be handled by the application itself.
 */
@Module({})
export class MongoDBSeederModule {
  static register (seeds: MongoDBSeeds, inject?: Pick<DynamicModule, 'imports' | 'providers'>): DynamicModule {
    return {
      module: MongoDBSeederModule,
      imports: [...inject?.imports ?? []],
      providers: [
        MongoDBSeederService,
        {
          provide: MONGODB_SEEDER_SEEDS,
          useValue: seeds
        },
        ...Object.values(seeds),
        ...inject?.providers ?? []
      ],
      exports: [MongoDBSeederService]
    }
  }
}
