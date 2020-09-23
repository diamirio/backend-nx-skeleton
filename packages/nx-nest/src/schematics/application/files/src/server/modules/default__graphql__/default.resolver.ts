import { Args, Query, Resolver } from '@nestjs/graphql'

import { DefaultSchema } from './default.schema'

@Resolver('Default')
export class DefaultResolver {
  @Query(() => DefaultSchema)
  public hello (
    @Args({
      name: 'name',
      nullable: true,
      defaultValue: 'world'
    })
      name: string
  ): DefaultSchema {
    return { response: `Hello ${name}.` }
  }
}
