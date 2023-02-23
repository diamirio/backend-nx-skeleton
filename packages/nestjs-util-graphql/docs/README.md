@webundsoehne/nestjs-util-graphql

# @webundsoehne/nestjs-util-graphql

## Table of contents

### Classes

- [GraphQLPreformattedException](classes/GraphQLPreformattedException.md)

### Type Aliases

- [ExtendedGraphQLFormattedError](README.md#extendedgraphqlformattederror)

### Functions

- [GraphQLErrorParser](README.md#graphqlerrorparser)

## Type Aliases

### ExtendedGraphQLFormattedError

Ƭ **ExtendedGraphQLFormattedError**<`T`\>: `Omit`<`GraphQLFormattedError`, `"extensions"`\> & { `extensions`: `T` }

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

packages/nestjs-util-graphql/src/filter/interface/graphql-preformatted-exception.interface.ts:15

## Functions

### GraphQLErrorParser

▸ **GraphQLErrorParser**(`exception`): `GraphQLFormattedError`

#### Parameters

| Name        | Type           |
| :---------- | :------------- |
| `exception` | `GraphQLError` |

#### Returns

`GraphQLFormattedError`

#### Defined in

packages/nestjs-util-graphql/src/filter/graphql-error-parser.ts:7
