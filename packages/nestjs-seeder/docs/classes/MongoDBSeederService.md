[@webundsoehne/nestjs-mongo-seeder](../README.md) / MongoDBSeederService

# Class: MongoDBSeederService

Seeder service to run all the seeds that has been passed to it.

## Table of contents

### Constructors

- [constructor](MongoDBSeederService.md#constructor)

### Properties

- [logger](MongoDBSeederService.md#logger)
- [seeds](MongoDBSeederService.md#seeds)

### Methods

- [init](MongoDBSeederService.md#init)

## Constructors

### constructor

• **new MongoDBSeederService**(`seeds`)

#### Parameters

| Name    | Type           |
| :------ | :------------- |
| `seeds` | `MongoDBSeeds` |

#### Defined in

module/mongodb-seeder.service.ts:15

## Properties

### logger

• `Protected` `Readonly` **logger**: `Logger`

#### Defined in

module/mongodb-seeder.service.ts:13

---

### seeds

• `Protected` `Readonly` **seeds**: `MongoDBSeeds`

## Methods

### init

▸ **init**(): `Promise`<`void`\>

Run all the seeds.

#### Returns

`Promise`<`void`\>

#### Defined in

module/mongodb-seeder.service.ts:20
