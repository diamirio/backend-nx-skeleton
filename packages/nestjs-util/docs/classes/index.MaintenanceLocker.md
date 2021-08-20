[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / MaintenanceLocker

# Class: MaintenanceLocker

[index](../modules/index.md).MaintenanceLocker

## Implements

- `ILocker`

## Table of contents

### Constructors

- [constructor](index.MaintenanceLocker.md#constructor)

### Properties

- [key](index.MaintenanceLocker.md#key)
- [logger](index.MaintenanceLocker.md#logger)
- [maintenance](index.MaintenanceLocker.md#maintenance)

### Methods

- [init](index.MaintenanceLocker.md#init)
- [release](index.MaintenanceLocker.md#release)
- [tryLock](index.MaintenanceLocker.md#trylock)

## Constructors

### constructor

• **new MaintenanceLocker**()

## Properties

### key

• `Private` **key**: `string`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.locker.ts:10

___

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.locker.ts:8

___

### maintenance

• `Private` `Readonly` **maintenance**: [`MaintenanceService`](index.MaintenanceService.md)

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.locker.ts:9

## Methods

### init

▸ **init**(`key`, `config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `config` | `IScheduleConfig` |

#### Returns

`void`

#### Implementation of

ILocker.init

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.locker.ts:12

___

### release

▸ **release**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

ILocker.release

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.locker.ts:18

___

### tryLock

▸ **tryLock**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

ILocker.tryLock

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.locker.ts:22
