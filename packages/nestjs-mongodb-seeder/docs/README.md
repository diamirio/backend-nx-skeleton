@webundsoehne/nestjs-mongo-seeder

# @webundsoehne/nestjs-mongo-seeder

## Table of contents

### Classes

- [MongoDBSeed](classes/MongoDBSeed.md)
- [MongoDBSeederModule](classes/MongoDBSeederModule.md)
- [MongoDBSeederService](classes/MongoDBSeederService.md)

### Variables

- [MONGODB\_SEEDER\_SEEDS](README.md#mongodb_seeder_seeds)

### Functions

- [InjectMongoDBSeederService](README.md#injectmongodbseederservice)

## Variables

### MONGODB\_SEEDER\_SEEDS

• `Const` **MONGODB\_SEEDER\_SEEDS**: typeof [`MONGODB_SEEDER_SEEDS`](README.md#mongodb_seeder_seeds)

#### Defined in

constants/injection.constants.ts:1

## Functions

### InjectMongoDBSeederService

▸ **InjectMongoDBSeederService**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok admin instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Injects Keyclaok admin instance initiated to the service.

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

module/decorators/inject.decorator.ts:8
