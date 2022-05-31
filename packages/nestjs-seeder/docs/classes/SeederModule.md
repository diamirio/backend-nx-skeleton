[@webundsoehne/nestjs-seeder](../README.md) / SeederModule

# Class: SeederModule

SeederModule provides the interface to run the seeds.

## Table of contents

### Constructors

- [constructor](SeederModule.md#constructor)

### Methods

- [register](SeederModule.md#register)

## Constructors

### constructor

• **new SeederModule**()

## Methods

### register

▸ `Static` **register**(`seeds`, `inject?`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seeds` | `Seeds` |
| `inject?` | `Pick`<`DynamicModule`, ``"imports"`` \| ``"providers"``\> |

#### Returns

`DynamicModule`

#### Defined in

module/seeder.module.ts:13
