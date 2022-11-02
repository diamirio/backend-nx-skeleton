[@webundsoehne/nestjs-seeder](../README.md) / SeederService

# Class: SeederService

Seeder service to run all the seeds that has been passed to it.

## Table of contents

### Constructors

- [constructor](SeederService.md#constructor)

### Properties

- [logger](SeederService.md#logger)
- [moduleRef](SeederService.md#moduleref)
- [seeds](SeederService.md#seeds)

### Methods

- [init](SeederService.md#init)

## Constructors

### constructor

• **new SeederService**(`seeds`, `moduleRef`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `seeds` | `Seeds` |
| `moduleRef` | `ModuleRef` |

#### Defined in

module/seeder.service.ts:15

## Properties

### logger

• `Protected` `Readonly` **logger**: `Logger`

#### Defined in

module/seeder.service.ts:13

___

### moduleRef

• `Private` **moduleRef**: `ModuleRef`

#### Defined in

module/seeder.service.ts:15

___

### seeds

• `Protected` `Readonly` **seeds**: `Seeds`

#### Defined in

module/seeder.service.ts:15

## Methods

### init

▸ **init**(): `Promise`<`void`\>

Run all the seeds.

#### Returns

`Promise`<`void`\>

#### Defined in

module/seeder.service.ts:20
