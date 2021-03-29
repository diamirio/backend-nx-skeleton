import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'
import DataLoader from 'dataloader'
import Container from 'typedi'

import { DATA_LOADER_CONTEXT_KEY } from '@constants/context.constants'
import { CUSTOM_DATALOADER_EXTENSION_FIELD } from '@constants/extension-field.constants'
import { Context } from '@interfaces/context.interface'
import { Extensions } from '@interfaces/extensions.interface'

/**
 * This middleware checks and processes for the subfields of a parent entity that should be resolved by the data loader.
 * It will automatically run the function that is embedded inside the DATA_LOADER extension field.
 */
export const CustomLoaderMiddleware: FieldMiddleware = async ({ context, info }: MiddlewareContext<any, Context>, next: NextFn) => {
  const extensions = info.parentType.getFields()[info.fieldName].extensions?.[CUSTOM_DATALOADER_EXTENSION_FIELD] as Extensions['CUSTOM_DATALOADER_EXTENSION_FIELD']

  const args = extensions?.args

  if (!args) {
    return next()
  }

  const serviceId = `${DATA_LOADER_CONTEXT_KEY}#${extensions.target.constructor.name}#${extensions.key.toString()}`

  const { requestId } = context[DATA_LOADER_CONTEXT_KEY]

  const container = Container.of(requestId)
  if (!container.has(serviceId)) {
    container.set(serviceId, new DataLoader((keys) => args.batchLoadFn(keys, { context }), args?.options))
  }

  const dataloader = container.get(serviceId)

  return (await next())(dataloader)
}
