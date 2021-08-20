import { BaseDocument } from './base-entity'

export class BaseDocumentWithTimestamps extends BaseDocument {
  createdAt!: Date

  updatedAt!: Date
}
