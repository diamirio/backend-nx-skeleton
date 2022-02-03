import type { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { handler } from './callback-handler.handler'
import type { Context } from '@interfaces/context.interface'
import type { SelfKeyFunc } from '@interfaces/typeorm-loader-handler.interface'
import { SelfKeyDataloader } from '@loaders/self-key.loader'

export async function handleOneToOneNotOwnerWithSelfKey<V> (selfKeyFunc: SelfKeyFunc, parent: any, context: Context, relation: RelationMetadata): Promise<any> {
  return handler(
    context,
    relation,
    relation.entityMetadata.primaryColumns,
    (connection) => new SelfKeyDataloader<V>(relation, connection, selfKeyFunc),
    async (dataloader, columns) => {
      return (dataloader as any).load(columns[0].getEntityValue(parent))[0] ?? null
    }
  )
}

export async function handleOneToManyWithSelfKey<V> (selfKeyFunc: SelfKeyFunc, parent: any, context: Context, relation: RelationMetadata): Promise<any> {
  return handler(
    context,
    relation,
    relation.entityMetadata.primaryColumns,
    (connection) => new SelfKeyDataloader<V>(relation, connection, selfKeyFunc),
    async (dataloader, columns) => {
      return dataloader.load(columns[0].getEntityValue(parent))
    }
  )
}
