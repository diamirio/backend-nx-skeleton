import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { handler } from './callback-handler.handler'
import { Context } from '@interfaces/context.interface'
import { ForeignKeyFunc } from '@interfaces/typeorm-loader-handler.interface'
import { ToOneDataloader } from '@src/loaders'

export async function handleToOne<V> (foreignKeyFunc: ForeignKeyFunc, parent: any, tgdContext: Context, relation: RelationMetadata): Promise<any> {
  return handler(
    tgdContext,
    relation,
    relation.inverseEntityMetadata.primaryColumns,
    (connection) => new ToOneDataloader<V>(relation, connection),
    async (dataloader) => {
      const fk = foreignKeyFunc(parent)
      return fk != null ? dataloader.load(fk) : null
    }
  )
}
