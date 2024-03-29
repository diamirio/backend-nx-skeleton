[@webundsoehne/nestjs-util](../README.md) / MaintenanceService

# Class: MaintenanceService

## Table of contents

### Constructors

- [constructor](MaintenanceService.md#constructor)

### Properties

- [lockfile](MaintenanceService.md#lockfile)
- [logger](MaintenanceService.md#logger)
- [message](MaintenanceService.md#message)
- [tasks](MaintenanceService.md#tasks)
- [instance](MaintenanceService.md#instance)

### Methods

- [disable](MaintenanceService.md#disable)
- [enable](MaintenanceService.md#enable)
- [isEnabled](MaintenanceService.md#isenabled)
- [prepareLockfile](MaintenanceService.md#preparelockfile)
- [prepareMessage](MaintenanceService.md#preparemessage)
- [throwException](MaintenanceService.md#throwexception)

## Constructors

### constructor

• **new MaintenanceService**()

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:15

## Properties

### lockfile

• `Private` `Readonly` **lockfile**: `string`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:12

___

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:11

___

### message

• `Readonly` **message**: `string`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:10

___

### tasks

• `Private` `Readonly` **tasks**: `string`[] = `[]`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:13

___

### instance

▪ `Static` **instance**: [`MaintenanceService`](MaintenanceService.md)

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:9

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

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:42

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

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:26

___

### isEnabled

▸ **isEnabled**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:57

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

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:76

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

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:71

___

### throwException

▸ **throwException**(): `void`

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/module/maintenance/maintenance.service.ts:67
