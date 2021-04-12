import { Connection } from 'typeorm'
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

/**
 * A shared component for handling the end result of the query.
 */
export function directLoader<V> (relation: RelationMetadata, connection: Connection) {
  return async (ids: readonly any[]): Promise<V[]> => {
    return connection.createQueryBuilder<V>(relation.type, relation.propertyName).whereInIds(ids).getMany()
  }
}
