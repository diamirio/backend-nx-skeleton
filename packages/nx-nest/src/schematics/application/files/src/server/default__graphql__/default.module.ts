import { Module } from '@nestjs/common'

import { DefaultResolver } from './default.resolver'

@Module({
  providers: [ DefaultResolver ]
})
export class DefaultModule {}
