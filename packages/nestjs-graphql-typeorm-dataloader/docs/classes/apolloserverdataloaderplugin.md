[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / ApolloServerDataLoaderPlugin

# Class: ApolloServerDataLoaderPlugin

## Implements

- *ApolloServerPlugin*

## Table of contents

### Constructors

- [constructor](apolloserverdataloaderplugin.md#constructor)

### Methods

- [requestDidStart](apolloserverdataloaderplugin.md#requestdidstart)

## Constructors

### constructor

\+ **new ApolloServerDataLoaderPlugin**(`options?`: ApolloServerLoaderPluginOptions): [*ApolloServerDataLoaderPlugin*](apolloserverdataloaderplugin.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | ApolloServerLoaderPluginOptions |

**Returns:** [*ApolloServerDataLoaderPlugin*](apolloserverdataloaderplugin.md)

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/plugins/data-loader.plugin.ts:17

## Methods

### requestDidStart

▸ **requestDidStart**(): *void* \| *GraphQLRequestListener*<BaseContext\>

**Returns:** *void* \| *GraphQLRequestListener*<BaseContext\>

Implementation of: ApolloServerPlugin.requestDidStart

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/plugins/data-loader.plugin.ts:20
