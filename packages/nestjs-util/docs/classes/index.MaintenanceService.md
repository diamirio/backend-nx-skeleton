[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / MaintenanceService

# Class: MaintenanceService

[index](../modules/index.md).MaintenanceService

## Table of contents

### Constructors

- [constructor](index.MaintenanceService.md#constructor)

### Properties

- [lockfile](index.MaintenanceService.md#lockfile)
- [logger](index.MaintenanceService.md#logger)
- [message](index.MaintenanceService.md#message)
- [tasks](index.MaintenanceService.md#tasks)

### Methods

- [disable](index.MaintenanceService.md#disable)
- [enable](index.MaintenanceService.md#enable)
- [isEnabled](index.MaintenanceService.md#isenabled)
- [prepareLockfile](index.MaintenanceService.md#preparelockfile)
- [prepareMessage](index.MaintenanceService.md#preparemessage)
- [throwException](index.MaintenanceService.md#throwexception)

## Constructors

### constructor

• **new MaintenanceService**()

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:16

## Properties

### lockfile

• `Private` `Readonly` **lockfile**: `string`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:13

___

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:12

___

### message

• `Readonly` **message**: `string`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:11

___

### tasks

• `Private` `Readonly` **tasks**: `string`[] = `[]`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:14

## Methods

### disable

▸ **disable**(`task?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `task` | `string` | `'unknown-task'` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:55

___

### enable

▸ **enable**(`task?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `task` | `string` | `'unknown-task'` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:40

___

### isEnabled

▸ **isEnabled**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:70

___

### prepareLockfile

▸ `Private` **prepareLockfile**(`lockfile?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lockfile?` | `string` |

#### Returns

`string`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:36

___

### prepareMessage

▸ `Private` **prepareMessage**(`message?`, `basePath?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |
| `basePath?` | `string` |

#### Returns

`string`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:28

___

### throwException

▸ **throwException**(): `void`

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:80
