[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / ApolloServerDataLoaderPlugin

# Class: ApolloServerDataLoaderPlugin

## Implements

- _ApolloServerPlugin_

## Table of contents

### Constructors

- [constructor](apolloserverdataloaderplugin.md#constructor)

### Methods

- [requestDidStart](apolloserverdataloaderplugin.md#requestdidstart)

## Constructors

### constructor

\+ **new ApolloServerDataLoaderPlugin**(`options?`: ApolloServerLoaderPluginOptions): [_ApolloServerDataLoaderPlugin_](apolloserverdataloaderplugin.md)

#### Parameters:

| Name       | Type                            |
| :--------- | :------------------------------ |
| `options?` | ApolloServerLoaderPluginOptions |

**Returns:** [_ApolloServerDataLoaderPlugin_](apolloserverdataloaderplugin.md)

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/plugins/data-loader.plugin.ts:17

## Methods

### requestDidStart

▸ **requestDidStart**(): _void_ \| _GraphQLRequestListener_<BaseContext\>

**Returns:** _void_ \| _GraphQLRequestListener_<BaseContext\>

Implementation of: void

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/plugins/data-loader.plugin.ts:20
