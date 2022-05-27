[@webundsoehne/nestjs-mongo-seeder](../README.md) / MongoDBSeederModule

# Class: MongoDBSeederModule

MongoDBSeederModule provides the interface to run the seeds, any MongoDB connection should be handled by the application itself.

## Table of contents

### Constructors

- [constructor](MongoDBSeederModule.md#constructor)

### Methods

- [register](MongoDBSeederModule.md#register)

## Constructors

### constructor

• **new MongoDBSeederModule**()

## Methods

### register

▸ `Static` **register**(`seeds`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seeds` | `MongoDBSeeds` |

#### Returns

`DynamicModule`

#### Defined in

module/mongodb-seeder.module.ts:13
