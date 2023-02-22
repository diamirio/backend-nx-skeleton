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
- [UseRetryOptions](interfaces/UseRetryOptions.md)

### Type Aliases

- [Request](README.md#request)
- [Response](README.md#response)

### Functions

- [ConfigParam](README.md#configparam)
- [Configurable](README.md#configurable)
- [InjectConfig](README.md#injectconfig)
- [InjectMaintenanceService](README.md#injectmaintenanceservice)
- [Retry](README.md#retry)
- [UseMaintenanceLocker](README.md#usemaintenancelocker)
- [getDuration](README.md#getduration)
- [isEnrichedException](README.md#isenrichedexception)
- [isExpressRequest](README.md#isexpressrequest)
- [isExpressResponse](README.md#isexpressresponse)
- [isFastifyRequest](README.md#isfastifyrequest)
- [isFastifyResponse](README.md#isfastifyresponse)
- [isHttpException](README.md#ishttpexception)
- [isResponse](README.md#isresponse)
- [isValidationError](README.md#isvalidationerror)
- [registerExitListeners](README.md#registerexitlisteners)
- [requireNodeEnv](README.md#requirenodeenv)
- [setEnvironmentVariables](README.md#setenvironmentvariables)
- [useRetry](README.md#useretry)

## Type Aliases

### Request

Ƭ **Request**: `BaseRequest` & `RequestExtensions`

#### Defined in

packages/nestjs-util/src/interface/request.interface.ts:10

---

### Response

Ƭ **Response**: `FastifyReply` \| `ExpressResponse`

#### Defined in

packages/nestjs-util/src/interface/response.interface.ts:4

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

### Retry

▸ **Retry**(`options`): `MethodDecorator`

#### Parameters

| Name      | Type                                               |
| :-------- | :------------------------------------------------- |
| `options` | [`UseRetryOptions`](interfaces/UseRetryOptions.md) |

#### Returns

`MethodDecorator`

#### Defined in

packages/nestjs-util/src/decorator/retry.decorator.ts:4

---

### UseMaintenanceLocker

▸ **UseMaintenanceLocker**(): `MethodDecorator`

#### Returns

`MethodDecorator`

#### Defined in

packages/nestjs-util/src/module/maintenance/decorators/locker.decorator.ts:4

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

packages/nestjs-util/src/util/time.ts:1

---

### isEnrichedException

▸ **isEnrichedException**(`exception`): exception is EnrichedExceptionError

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `exception` | `unknown` |

#### Returns

exception is EnrichedExceptionError

#### Defined in

packages/nestjs-util/src/filter/guard/enriched-exception.guard.ts:3

---

### isExpressRequest

▸ **isExpressRequest**(`response`): response is Request<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `response` | `unknown` |

#### Returns

response is Request<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

packages/nestjs-util/src/util/guards/is-request.guard.ts:12

---

### isExpressResponse

▸ **isExpressResponse**(`response`): response is Response<any, Record<string, any\>\>

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `response` | `unknown` |

#### Returns

response is Response<any, Record<string, any\>\>

#### Defined in

packages/nestjs-util/src/util/guards/is-response.guard.ts:22

---

### isFastifyRequest

▸ **isFastifyRequest**(`response`): response is FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface\>\>

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `response` | `unknown` |

#### Returns

response is FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface\>\>

#### Defined in

packages/nestjs-util/src/util/guards/is-request.guard.ts:4

---

### isFastifyResponse

▸ **isFastifyResponse**(`response`): response is FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage\>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown\>

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `response` | `unknown` |

#### Returns

response is FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage\>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown\>

#### Defined in

packages/nestjs-util/src/util/guards/is-response.guard.ts:14

---

### isHttpException

▸ **isHttpException**(`exception`): exception is HttpException

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `exception` | `unknown` |

#### Returns

exception is HttpException

#### Defined in

packages/nestjs-util/src/filter/guard/http-exception.guard.ts:3

---

### isResponse

▸ **isResponse**(`response`): response is Response

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `response` | `unknown` |

#### Returns

response is Response

#### Defined in

packages/nestjs-util/src/util/guards/is-response.guard.ts:6

---

### isValidationError

▸ **isValidationError**(`exception`): exception is ClassValidatorException

#### Parameters

| Name        | Type                  |
| :---------- | :-------------------- |
| `exception` | `BadRequestException` |

#### Returns

exception is ClassValidatorException

#### Defined in

packages/nestjs-util/src/filter/guard/validation-error.guard.ts:5

---

### registerExitListeners

▸ **registerExitListeners**(`name?`): `void`

#### Parameters

| Name   | Type     | Default value |
| :----- | :------- | :------------ |
| `name` | `string` | `'module'`    |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/util/process.ts:3

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

packages/nestjs-util/src/util/environment.ts:22

---

### setEnvironmentVariables

▸ **setEnvironmentVariables**(`packageFile?`): `Promise`<`void`\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `packageFile` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/nestjs-util/src/util/environment.ts:4

---

### useRetry

▸ **useRetry**<`T`\>(`callback`, `options?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type                                               |
| :--------- | :------------------------------------------------- |
| `callback` | () => `T`                                          |
| `options?` | [`UseRetryOptions`](interfaces/UseRetryOptions.md) |

#### Returns

`Promise`<`T`\>

#### Defined in

packages/nestjs-util/src/util/use-retry.ts:5
