[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / DataLoaderInterceptor

# Class: DataLoaderInterceptor

## Implements

- _NestInterceptor_

## Table of contents

### Constructors

- [constructor](dataloaderinterceptor.md#constructor)

### Methods

- [intercept](dataloaderinterceptor.md#intercept)

## Constructors

### constructor

\+ **new DataLoaderInterceptor**(`options?`: ApolloServerLoaderPluginOptions): [_DataLoaderInterceptor_](dataloaderinterceptor.md)

#### Parameters:

| Name       | Type                            |
| :--------- | :------------------------------ |
| `options?` | ApolloServerLoaderPluginOptions |

**Returns:** [_DataLoaderInterceptor_](dataloaderinterceptor.md)

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/interceptors/data-loader.interceptor.ts:13

## Methods

### intercept

▸ **intercept**(`context`: ExecutionContext, `next`: _CallHandler_<any\>): _Observable_<any\>

#### Parameters:

| Name      | Type                |
| :-------- | :------------------ |
| `context` | ExecutionContext    |
| `next`    | _CallHandler_<any\> |

**Returns:** _Observable_<any\>

Implementation of: void

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/interceptors/data-loader.interceptor.ts:16
