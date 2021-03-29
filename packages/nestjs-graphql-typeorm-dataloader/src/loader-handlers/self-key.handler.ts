import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { handler } from './callback-handler.handler'
import { Context } from '@interfaces/context.interface'
import { SelfKeyFunc } from '@interfaces/typeorm-loader-handler.interface'
import { SelfKeyDataloader } from '@src/loaders'

export async function handleOneToOneNotOwnerWithSelfKey<V> (selfKeyFunc: SelfKeyFunc, parent: any, tgdContext: Context, relation: RelationMetadata): Promise<any> {
  return handler(
    tgdContext,
    relation,
    relation.entityMetadata.primaryColumns,
    (connection) => new SelfKeyDataloader<V>(relation, connection, selfKeyFunc),
    async (dataloader, columns) => {
      return dataloader.load(columns[0].getEntityValue(parent))[0] ?? null
    }
  )
}

export async function handleOneToManyWithSelfKey<V> (selfKeyFunc: SelfKeyFunc, parent: any, tgdContext: Context, relation: RelationMetadata): Promise<any> {
  return handler(
    tgdContext,
    relation,
    relation.entityMetadata.primaryColumns,
    (connection) => new SelfKeyDataloader<V>(relation, connection, selfKeyFunc),
    async (dataloader, columns) => {
      return dataloader.load(columns[0].getEntityValue(parent))
    }
  )
}
