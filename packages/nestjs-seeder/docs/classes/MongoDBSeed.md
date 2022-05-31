[@webundsoehne/nestjs-mongo-seeder](../README.md) / MongoDBSeed

# Class: MongoDBSeed

A singular seed that should be extended from, for seeding MongoDB.

## Table of contents

### Constructors

- [constructor](MongoDBSeed.md#constructor)

### Properties

- [client](MongoDBSeed.md#client)
- [logger](MongoDBSeed.md#logger)

### Methods

- [run](MongoDBSeed.md#run)

## Constructors

### constructor

• **new MongoDBSeed**(`client`)

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `client` | `Connection` |

#### Defined in

interfaces/mongodb-seed.ts:10

## Properties

### client

• `Protected` **client**: `Connection`

---

### logger

• `Protected` **logger**: `Logger`

#### Defined in

interfaces/mongodb-seed.ts:8

## Methods

### run

▸ `Abstract` **run**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

interfaces/mongodb-seed.ts:12
