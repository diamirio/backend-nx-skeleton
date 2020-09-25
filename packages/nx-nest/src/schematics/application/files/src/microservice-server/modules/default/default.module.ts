import { Module } from '@nestjs/common'

import { DefaultMicrocontroller } from './default.controller'
import { DefaultMicroservice } from './default.service'

@Module({
  imports: [],
  controllers: [ DefaultMicrocontroller ],
  providers: [ DefaultMicroservice ]
})
export class DefaultModule {}
