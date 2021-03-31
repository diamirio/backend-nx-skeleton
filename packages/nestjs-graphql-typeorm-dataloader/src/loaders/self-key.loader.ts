import DataLoader from 'dataloader'
import { groupBy } from 'lodash'
import type { Connection } from 'typeorm'
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { SelfKeyFunc } from '@interfaces/typeorm-loader-handler.interface'

/**
 * A common loader for loading entities by their own key.
 */
export class SelfKeyDataloader<V> extends DataLoader<any, V[]> {
  constructor (relation: RelationMetadata, connection: Connection, selfKeyFunc: SelfKeyFunc) {
    super(async (ids) => {
      const columns = relation.inverseRelation?.joinColumns

      if (!columns || columns.length === 0) {
        throw new Error(`No relational columns has been found for: ${relation.propertyName}`)
      }

      let query = connection.createQueryBuilder<V>(relation.type, relation.propertyName)

      await Promise.all(
        columns.map((column) => {
          const key = `${relation.propertyName}_${column.propertyName}`

          query = query.andWhere(`${relation.propertyName}.${column.propertyPath} IN (:...${key})`, { [key]: ids })
        })
      )

      const entities = groupBy(await query.getMany(), selfKeyFunc)

      return ids.map((id) => entities[id] ?? [])
    })
  }
}
