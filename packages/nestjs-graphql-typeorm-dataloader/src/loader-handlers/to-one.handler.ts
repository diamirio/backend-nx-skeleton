import type { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { handler } from './callback-handler.handler'
import type { Context } from '@interfaces/context.interface'
import type { ForeignKeyFunc } from '@interfaces/typeorm-loader-handler.interface'
import { ToOneDataloader } from '@loaders/to-one.loader'

export async function handleToOne<V> (foreignKeyFunc: ForeignKeyFunc, parent: any, context: Context, relation: RelationMetadata): Promise<any> {
  return handler(
    context,
    relation,
    relation.inverseEntityMetadata.primaryColumns,
    (connection) => new ToOneDataloader<V>(relation, connection),
    async (dataloader) => {
      const fk = foreignKeyFunc(parent)

      return fk != null ? dataloader.load(fk) : null
    }
  )
}
