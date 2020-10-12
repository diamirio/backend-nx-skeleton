import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getDatabaseOptions } from '../util/database'
import { MigrationTask } from './migration.task'

@Module({
  imports: [TypeOrmModule.forRoot(getDatabaseOptions())],
  providers: [MigrationTask],
  exports: [MigrationTask]
})
export class MigrationModule {}
