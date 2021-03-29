import { Dictionary, keyBy } from 'lodash'
import { Connection } from 'typeorm'
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

export function directLoader<V> (relation: RelationMetadata, connection: Connection, grouper: string | ((entity: V) => any)) {
  return async (ids: readonly any[]): Promise<any> => {
    const entities = keyBy(await connection.createQueryBuilder<V>(relation.type, relation.propertyName).whereInIds(ids).getMany(), grouper) as Dictionary<V>

    return ids.map((id) => entities[id])
  }
}
