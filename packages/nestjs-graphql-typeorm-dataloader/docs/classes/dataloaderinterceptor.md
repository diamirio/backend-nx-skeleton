[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / DataLoaderInterceptor

# Class: DataLoaderInterceptor

## Implements

- *NestInterceptor*

## Table of contents

### Constructors

- [constructor](dataloaderinterceptor.md#constructor)

### Methods

- [intercept](dataloaderinterceptor.md#intercept)

## Constructors

### constructor

\+ **new DataLoaderInterceptor**(`options?`: ApolloServerLoaderPluginOptions): [*DataLoaderInterceptor*](dataloaderinterceptor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | ApolloServerLoaderPluginOptions |

**Returns:** [*DataLoaderInterceptor*](dataloaderinterceptor.md)

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/interceptors/data-loader.interceptor.ts:13

## Methods

### intercept

▸ **intercept**(`context`: ExecutionContext, `next`: *CallHandler*<any\>): *Observable*<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | ExecutionContext |
| `next` | *CallHandler*<any\> |

**Returns:** *Observable*<any\>

Implementation of: NestInterceptor.intercept

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/interceptors/data-loader.interceptor.ts:16
