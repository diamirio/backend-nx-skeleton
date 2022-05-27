[@webundsoehne/nestjs-mongo-seeder](../README.md) / MongoDBSeederService

# Class: MongoDBSeederService

Seeder service to run all the seeds that has been passed to it.

## Table of contents

### Constructors

- [constructor](MongoDBSeederService.md#constructor)

### Properties

- [connection](MongoDBSeederService.md#connection)
- [logger](MongoDBSeederService.md#logger)
- [seeds](MongoDBSeederService.md#seeds)

### Methods

- [init](MongoDBSeederService.md#init)

## Constructors

### constructor

• **new MongoDBSeederService**(`connection`, `seeds`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `seeds` | `MongoDBSeeds` |

#### Defined in

module/mongodb-seeder.service.ts:17

## Properties

### connection

• `Protected` `Readonly` **connection**: `Connection`

___

### logger

• `Protected` `Readonly` **logger**: `Logger`

#### Defined in

module/mongodb-seeder.service.ts:15

___

### seeds

• `Protected` `Readonly` **seeds**: `MongoDBSeeds`

## Methods

### init

▸ **init**(): `Promise`<`void`\>

Run all the seeds.

#### Returns

`Promise`<`void`\>

#### Defined in

module/mongodb-seeder.service.ts:22
