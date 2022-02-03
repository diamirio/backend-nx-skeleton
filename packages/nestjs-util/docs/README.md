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
- [LoggerService](classes/LoggerService.md)
- [MaintenanceMiddleware](classes/MaintenanceMiddleware.md)
- [MaintenanceModule](classes/MaintenanceModule.md)
- [MaintenanceService](classes/MaintenanceService.md)
- [SetApiInfoHeaderMiddleware](classes/SetApiInfoHeaderMiddleware.md)

### Interfaces

- [ClassValidatorError](interfaces/ClassValidatorError.md)
- [EnrichedException](interfaces/EnrichedException.md)
- [Request](interfaces/Request.md)

### Functions

- [ConfigParam](README.md#configparam)
- [Configurable](README.md#configurable)
- [InjectConfig](README.md#injectconfig)
- [InjectMaintenanceService](README.md#injectmaintenanceservice)
- [getDuration](README.md#getduration)
- [registerExitListeners](README.md#registerexitlisteners)
- [requireNodeEnv](README.md#requirenodeenv)
- [setEnvironmentVariables](README.md#setenvironmentvariables)

## Functions

### ConfigParam

▸ **ConfigParam**(`path`, `defaultValue?`): `ParameterDecorator`

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `path`          | `string` |
| `defaultValue?` | `any`    |

#### Returns

`ParameterDecorator`

#### Defined in

packages/nestjs-util/src/provider/config/config.decorators.ts:6

---

### Configurable

▸ **Configurable**(): `MethodDecorator`

#### Returns

`MethodDecorator`

#### Defined in

packages/nestjs-util/src/provider/config/config.decorators.ts:25

---

### InjectConfig

▸ **InjectConfig**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

##### Parameters

| Name     | Type                           |
| :------- | :----------------------------- |
| `target` | `Record`<`string`, `unknown`\> |
| `key`    | `string` \| `symbol`           |
| `index?` | `number`                       |

##### Returns

`void`

#### Defined in

packages/nestjs-util/src/provider/config/config.decorators.ts:42

---

### InjectMaintenanceService

▸ **InjectMaintenanceService**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects maintenance service instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Injects maintenance service instance initiated to the service.

##### Parameters

| Name     | Type                           |
| :------- | :----------------------------- |
| `target` | `Record`<`string`, `unknown`\> |
| `key`    | `string` \| `symbol`           |
| `index?` | `number`                       |

##### Returns

`void`

#### Defined in

packages/nestjs-util/src/module/maintenance/decorators/inject.decorator.ts:8

---

### getDuration

▸ **getDuration**(`start`, `finish`): `number`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `start`  | `number` |
| `finish` | `number` |

#### Returns

`number`

#### Defined in

packages/nestjs-util/src/util/index.ts:32

---

### registerExitListeners

▸ **registerExitListeners**(`moduleName?`): `void`

#### Parameters

| Name         | Type     | Default value |
| :----------- | :------- | :------------ |
| `moduleName` | `string` | `'module'`    |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/util/index.ts:13

---

### requireNodeEnv

▸ **requireNodeEnv**(`errorMessage?`): `void`

#### Parameters

| Name           | Type     | Default value                                 |
| :------------- | :------- | :-------------------------------------------- |
| `errorMessage` | `string` | `'NODE_ENV environment variable is not set.'` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/util/index.ts:37

---

### setEnvironmentVariables

▸ **setEnvironmentVariables**(`packageFile?`): `Promise`<`void`\>

#### Parameters

| Name          | Type     | Default value    |
| :------------ | :------- | :--------------- |
| `packageFile` | `string` | `'package.json'` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/nestjs-util/src/util/index.ts:4
