import DataLoader from 'dataloader'
import Container from 'typedi'
import type { Connection } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

import { DATA_LOADER_CONTEXT_KEY } from '@constants/context.constants'
import { Context } from '@interfaces/context.interface'

export async function handler<V> (
  context: Context,
  relation: RelationMetadata,
  columns: ColumnMetadata[],
  newDataloader: (connection: Connection) => DataLoader<any, V>,
  callback: (dataloader: DataLoader<any, V>, columns: ColumnMetadata[]) => Promise<any>
): Promise<any> {
  if (context[DATA_LOADER_CONTEXT_KEY].typeormGetConnection == null) {
    throw new Error('Typeorm connection is not available.')
  }

  if (columns.length !== 1) {
    throw new Error('Loading by multiple columns as foreign key is not supported.')
  }

  const serviceId = `${DATA_LOADER_CONTEXT_KEY}#${relation.entityMetadata.tableName}#${relation.propertyName}`

  const container = Container.of(context[DATA_LOADER_CONTEXT_KEY].requestId)
  if (!container.has(serviceId)) {
    container.set(serviceId, newDataloader(context[DATA_LOADER_CONTEXT_KEY].typeormGetConnection()))
  }

  return callback(container.get<DataLoader<any, any>>(serviceId), columns)
}
