[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / ApolloServerDataLoaderPlugin

# Class: ApolloServerDataLoaderPlugin

## Implements

- `ApolloServerPlugin`

## Table of contents

### Constructors

- [constructor](ApolloServerDataLoaderPlugin.md#constructor)

### Methods

- [requestDidStart](ApolloServerDataLoaderPlugin.md#requestdidstart)

## Constructors

### constructor

• **new ApolloServerDataLoaderPlugin**(`options?`)

#### Parameters

| Name       | Type                              |
| :--------- | :-------------------------------- |
| `options?` | `ApolloServerLoaderPluginOptions` |

#### Defined in

packages/nestjs-graphql-typeorm-dataloader/src/plugins/data-loader.plugin.ts:18

## Methods

### requestDidStart

▸ **requestDidStart**(): `Promise`<`GraphQLRequestListener`<`BaseContext`\>\>

#### Returns

`Promise`<`GraphQLRequestListener`<`BaseContext`\>\>

#### Implementation of

ApolloServerPlugin.requestDidStart

#### Defined in

packages/nestjs-graphql-typeorm-dataloader/src/plugins/data-loader.plugin.ts:21
