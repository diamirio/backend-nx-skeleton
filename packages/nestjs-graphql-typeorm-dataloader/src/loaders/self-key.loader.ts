import DataLoader from 'dataloader'
import { groupBy } from 'lodash'
import type { Connection } from 'typeorm'
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { SelfKeyFunc } from '@interfaces/typeorm-loader-handler.interface'

export class SelfKeyDataloader<V> extends DataLoader<any, V[]> {
  constructor (relation: RelationMetadata, connection: Connection, selfKeyFunc: SelfKeyFunc) {
    super(async (ids) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const columns = relation.inverseRelation!.joinColumns
      const k = `${relation.propertyName}_${columns[0].propertyName}`
      const entities = groupBy(
        await connection
          .createQueryBuilder<V>(relation.type, relation.propertyName)
          .where(`${relation.propertyName}.${columns[0].propertyPath} IN (:...${k})`, { k: ids })
          .getMany(),
        selfKeyFunc
      )

      return ids.map((id) => entities[id] ?? [])
    })
  }
}
