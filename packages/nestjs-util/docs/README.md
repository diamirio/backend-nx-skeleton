@webundsoehne/nestjs-util

# @webundsoehne/nestjs-util

## Table of contents

### Classes

- [BadRequestExceptionFilter](classes/BadRequestExceptionFilter.md)
- [ClassValidatorException](classes/ClassValidatorException.md)
- [ConfigService](classes/ConfigService.md)
- [EnrichedExceptionError](classes/EnrichedExceptionError.md)
- [ExtendedValidationPipe](classes/ExtendedValidationPipe.md)
- [GlobalExceptionFilter](classes/GlobalExceptionFilter.md)
- [GlobalSentryExceptionFilter](classes/GlobalSentryExceptionFilter.md)
- [LoggerService](classes/LoggerService.md)
- [MaintenanceMiddleware](classes/MaintenanceMiddleware.md)
- [MaintenanceModule](classes/MaintenanceModule.md)
- [MaintenanceService](classes/MaintenanceService.md)
- [SetApiInfoHeaderMiddleware](classes/SetApiInfoHeaderMiddleware.md)

### Interfaces

- [ClassValidatorError](interfaces/ClassValidatorError.md)
- [EnrichedException](interfaces/EnrichedException.md)
- [Request](interfaces/Request.md)
- [UseRetryOptions](interfaces/UseRetryOptions.md)

### Functions

- [ConfigParam](README.md#configparam)
- [Configurable](README.md#configurable)
- [InjectConfig](README.md#injectconfig)
- [InjectMaintenanceService](README.md#injectmaintenanceservice)
- [Retry](README.md#retry)
- [UseMaintenanceLocker](README.md#usemaintenancelocker)
- [getDuration](README.md#getduration)
- [registerExitListeners](README.md#registerexitlisteners)
- [requireNodeEnv](README.md#requirenodeenv)
- [setEnvironmentVariables](README.md#setenvironmentvariables)
- [useRetry](README.md#useretry)

## Functions

### ConfigParam

▸ **ConfigParam**(`path`, `defaultValue?`): `ParameterDecorator`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `defaultValue?` | `any` |

#### Returns

`ParameterDecorator`

#### Defined in

packages/nestjs-util/src/provider/config/config.decorators.ts:6

___

### Configurable

▸ **Configurable**(): `MethodDecorator`

#### Returns

`MethodDecorator`

#### Defined in

packages/nestjs-util/src/provider/config/config.decorators.ts:25

___

### InjectConfig

▸ **InjectConfig**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

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

packages/nestjs-util/src/provider/config/config.decorators.ts:42

___

### InjectMaintenanceService

▸ **InjectMaintenanceService**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects maintenance service instance initiated to the service.

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

packages/nestjs-util/src/module/maintenance/decorators/inject.decorator.ts:8

___

### Retry

▸ **Retry**(`options`): `MethodDecorator`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`UseRetryOptions`](interfaces/UseRetryOptions.md) |

#### Returns

`MethodDecorator`

#### Defined in

packages/nestjs-util/src/decorator/retry.decorator.ts:4

___

### UseMaintenanceLocker

▸ **UseMaintenanceLocker**(): `MethodDecorator`

#### Returns

`MethodDecorator`

#### Defined in

packages/nestjs-util/src/module/maintenance/decorators/locker.decorator.ts:4

___

### getDuration

▸ **getDuration**(`start`, `finish`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `finish` | `number` |

#### Returns

`number`

#### Defined in

packages/nestjs-util/src/util/time.ts:1

___

### registerExitListeners

▸ **registerExitListeners**(`name?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `'module'` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/util/process.ts:3

___

### requireNodeEnv

▸ **requireNodeEnv**(`errorMessage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `errorMessage` | `string` | `'NODE_ENV environment variable is not set.'` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/util/environment.ts:22

___

### setEnvironmentVariables

▸ **setEnvironmentVariables**(`packageFile?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `packageFile` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/nestjs-util/src/util/environment.ts:4

___

### useRetry

▸ **useRetry**<`T`\>(`callback`, `options?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `T` |
| `options?` | [`UseRetryOptions`](interfaces/UseRetryOptions.md) |

#### Returns

`Promise`<`T`\>

#### Defined in

packages/nestjs-util/src/util/use-retry.ts:5
