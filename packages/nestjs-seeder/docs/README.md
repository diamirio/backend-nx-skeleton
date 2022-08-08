@webundsoehne/nestjs-seeder

# @webundsoehne/nestjs-seeder

## Table of contents

### Classes

- [Seed](classes/Seed.md)
- [SeederModule](classes/SeederModule.md)
- [SeederService](classes/SeederService.md)

### Variables

- [SEEDER\_SEEDS](README.md#seeder_seeds)

### Functions

- [InjectSeederService](README.md#injectseederservice)

## Variables

### SEEDER\_SEEDS

• `Const` **SEEDER\_SEEDS**: typeof [`SEEDER_SEEDS`](README.md#seeder_seeds)

#### Defined in

constants/injection.constants.ts:1

## Functions

### InjectSeederService

▸ **InjectSeederService**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects SeederService to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

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
