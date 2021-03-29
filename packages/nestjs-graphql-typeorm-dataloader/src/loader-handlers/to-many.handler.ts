import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { handler } from './callback-handler.handler'
import { Context } from '@interfaces/context.interface'
import { ForeignKeyFunc } from '@interfaces/typeorm-loader-handler.interface'
import { ToManyDataloader } from '@src/loaders'

export async function handleToMany<V> (foreignKeyFunc: ForeignKeyFunc, parent: any, tgdContext: Context, relation: RelationMetadata): Promise<any> {
  return handler(
    tgdContext,
    relation,
    relation.inverseEntityMetadata.primaryColumns,
    (connection) => new ToManyDataloader<V>(relation, connection),
    async (dataloader) => {
      return dataloader.loadMany(foreignKeyFunc(parent))
    }
  )
}
