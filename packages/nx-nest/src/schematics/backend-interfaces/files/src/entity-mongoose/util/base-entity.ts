import { Document } from 'mongoose'

export class BaseDocument extends Document<string, any> {
  id!: string
}

export class BaseDocumentWithTimestamps extends BaseDocument {
  createdAt!: Date

  updatedAt!: Date
}
