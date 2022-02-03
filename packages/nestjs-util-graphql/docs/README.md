@webundsoehne/nestjs-util-graphql

# @webundsoehne/nestjs-util-graphql

## Table of contents

### Classes

- [GraphQLPreformattedException](classes/GraphQLPreformattedException.md)

### Type aliases

- [ExtendedGraphQLFormattedError](README.md#extendedgraphqlformattederror)

### Functions

- [GraphQLErrorParser](README.md#graphqlerrorparser)

## Type aliases

### ExtendedGraphQLFormattedError

Ƭ **ExtendedGraphQLFormattedError**<`T`\>: `Omit`<`GraphQLFormattedError`, `"extensions"`\> & { `extensions`: `T` }

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

packages/nestjs-util-graphql/src/filter/graphql-exception.interface.ts:15

## Functions

### GraphQLErrorParser

▸ **GraphQLErrorParser**(`exception`): `GraphQLFormattedError`<`EnrichedException`\>

#### Parameters

| Name        | Type           |
| :---------- | :------------- |
| `exception` | `GraphQLError` |

#### Returns

`GraphQLFormattedError`<`EnrichedException`\>

#### Defined in

packages/nestjs-util-graphql/src/filter/graphql-error-parser.ts:10
