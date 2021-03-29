import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'

import { Context, DATA_LOADER_CONTEXT_KEY } from '@interfaces/context.interface'
import { Extensions } from '@interfaces/extensions.interface'
import { TYPEORM_DATALOADER_EXTENSION_FIELD } from '@src/constants'
import { ParsedTypeormExtensionInput, TypeormLoaderExtensionInput } from '@src/interfaces/typorm-loader.interface'
import { handleOneToManyWithSelfKey, handleOneToOneNotOwnerWithSelfKey, handleToMany, handleToOne } from '@src/loader-handlers'

export const TypeormLoaderMiddleware: FieldMiddleware = async ({ context, info, source }: MiddlewareContext<any, Context>, next: NextFn) => {
  const extensions = info.parentType.getFields()[info.fieldName].extensions?.[TYPEORM_DATALOADER_EXTENSION_FIELD] as Extensions['TYPEORM_DATALOADER_EXTENSION_FIELD']

  const args = parseExtensionArguments(extensions?.args)

  if (!args) {
    return next()
  }

  if (context?.[DATA_LOADER_CONTEXT_KEY].typeormGetConnection == null) {
    throw new Error('Typeorm connection is not set.')
  }

  const relation = context[DATA_LOADER_CONTEXT_KEY].typeormGetConnection().getMetadata(extensions.target.constructor).findRelationWithPropertyPath(extensions.key.toString())

  if (relation == null) {
    return next()
  }

  if (args?.options?.selfKey && !(relation.isOneToMany || relation.isOneToOneNotOwner)) {
    throw new Error('selfKey option is available only for OneToMany or OneToOneNotOwner.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let handle = (..._args: any[]): Promise<any> => next()
  if (relation.isManyToOne || relation.isOneToOneOwner) {
    handle = handleToOne
  } else if (relation.isOneToMany) {
    handle = args?.options?.selfKey ? handleOneToManyWithSelfKey : handleToMany
  } else if (relation.isOneToOneNotOwner) {
    handle = args?.options?.selfKey ? handleOneToOneNotOwnerWithSelfKey : handleToOne
  } else if (relation.isManyToMany) {
    handle = handleToMany
  }

  return handle(args.keyFunc, source, context, relation)
}

/**
 * Some documentation will go here.
 */
function parseExtensionArguments (input: TypeormLoaderExtensionInput): ParsedTypeormExtensionInput {
  // parse arguments from the type of the overloaded arguments
  const overloadedArgs: ParsedTypeormExtensionInput = { keyFunc: input[0], options: input?.[1] }

  return overloadedArgs
}
