import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DefaultSchema {
  @Field({ nullable: true })
  response: string
}