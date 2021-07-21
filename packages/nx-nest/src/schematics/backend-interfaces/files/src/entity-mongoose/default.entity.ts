import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { BaseDocumentWithTimestamps } from './util'

@Schema({ timestamps: true })
export class DefaultMongooseEntity extends BaseDocumentWithTimestamps {
  @Prop()
  dummy: string
}

export const DefaultMongooseSchema = SchemaFactory.createForClass(DefaultMongooseEntity)
