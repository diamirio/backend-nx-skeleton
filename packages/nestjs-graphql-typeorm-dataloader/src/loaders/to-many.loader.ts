import DataLoader from 'dataloader'
import type { Connection } from 'typeorm'
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { directLoader } from './direct.loader'

export class ToManyDataloader<V> extends DataLoader<any, V> {
  constructor (relation: RelationMetadata, connection: Connection) {
    super(directLoader(relation, connection, (entity) => relation.inverseEntityMetadata.primaryColumns[0].getEntityValue(entity)))
  }
}
