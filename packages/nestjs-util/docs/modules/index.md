[@webundsoehne/nestjs-util](../README.md) / index

# Module: index

## Table of contents

### Classes

- [BadRequestExceptionFilter](../classes/index.BadRequestExceptionFilter.md)
- [CacheLifetimeHelperInterceptor](../classes/index.CacheLifetimeHelperInterceptor.md)
- [ClassValidatorException](../classes/index.ClassValidatorException.md)
- [ConfigService](../classes/index.ConfigService.md)
- [EnrichedExceptionError](../classes/index.EnrichedExceptionError.md)
- [ExtendedValidationPipe](../classes/index.ExtendedValidationPipe.md)
- [GlobalExceptionFilter](../classes/index.GlobalExceptionFilter.md)
- [InternalModule](../classes/index.InternalModule.md)
- [LoggerService](../classes/index.LoggerService.md)
- [MaintenanceLocker](../classes/index.MaintenanceLocker.md)
- [MaintenanceMiddleware](../classes/index.MaintenanceMiddleware.md)
- [MaintenanceModule](../classes/index.MaintenanceModule.md)
- [MaintenanceService](../classes/index.MaintenanceService.md)
- [RequestProfilerInterceptor](../classes/index.RequestProfilerInterceptor.md)
- [SetApiInfoHeaderMiddleware](../classes/index.SetApiInfoHeaderMiddleware.md)
- [SwaggerService](../classes/index.SwaggerService.md)

### Interfaces

- [AnyObject](../interfaces/index.AnyObject.md)
- [CacheLifetimeOptions](../interfaces/index.CacheLifetimeOptions.md)
- [ClassValidatorError](../interfaces/index.ClassValidatorError.md)
- [EnrichedException](../interfaces/index.EnrichedException.md)
- [Request](../interfaces/index.Request.md)

### Functions

- [ConfigParam](index.md#configparam)
- [Configurable](index.md#configurable)
- [InjectConfig](index.md#injectconfig)
- [getDuration](index.md#getduration)
- [registerExitListeners](index.md#registerexitlisteners)
- [requireNodeEnv](index.md#requirenodeenv)
- [setEnvironmentVariables](index.md#setenvironmentvariables)

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

packages/nestjs-util/src/provider/config/config.decorators.ts:41

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

packages/nestjs-util/src/util/index.ts:31

___

### registerExitListeners

▸ **registerExitListeners**(`moduleName?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `moduleName` | `string` | `'module'` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/util/index.ts:13

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

packages/nestjs-util/src/util/index.ts:36

___

### setEnvironmentVariables

▸ **setEnvironmentVariables**(`packageFile?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `packageFile` | `string` | `'package.json'` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/nestjs-util/src/util/index.ts:4
