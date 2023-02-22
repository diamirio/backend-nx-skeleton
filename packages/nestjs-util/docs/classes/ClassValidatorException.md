[@webundsoehne/nestjs-util](../README.md) / ClassValidatorException

# Class: ClassValidatorException

## Hierarchy

- `BadRequestException`

  ↳ **`ClassValidatorException`**

## Table of contents

### Constructors

- [constructor](ClassValidatorException.md#constructor)

### Properties

- [cause](ClassValidatorException.md#cause)
- [message](ClassValidatorException.md#message)
- [name](ClassValidatorException.md#name)
- [stack](ClassValidatorException.md#stack)
- [validation](ClassValidatorException.md#validation)
- [prepareStackTrace](ClassValidatorException.md#preparestacktrace)
- [stackTraceLimit](ClassValidatorException.md#stacktracelimit)

### Methods

- [getResponse](ClassValidatorException.md#getresponse)
- [getStatus](ClassValidatorException.md#getstatus)
- [initCause](ClassValidatorException.md#initcause)
- [initMessage](ClassValidatorException.md#initmessage)
- [initName](ClassValidatorException.md#initname)
- [captureStackTrace](ClassValidatorException.md#capturestacktrace)
- [createBody](ClassValidatorException.md#createbody)
- [extractDescriptionAndOptionsFrom](ClassValidatorException.md#extractdescriptionandoptionsfrom)
- [getDescriptionFrom](ClassValidatorException.md#getdescriptionfrom)
- [getHttpExceptionOptionsFrom](ClassValidatorException.md#gethttpexceptionoptionsfrom)

## Constructors

### constructor

• **new ClassValidatorException**(`validation`)

#### Parameters

| Name         | Type                |
| :----------- | :------------------ |
| `validation` | `ValidationError`[] |

#### Overrides

BadRequestException.constructor

#### Defined in

packages/nestjs-util/src/filter/interface/class-validator-exception.interface.ts:7

## Properties

### cause

• **cause**: `Error`

#### Inherited from

BadRequestException.cause

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:58

---

### message

• **message**: `string`

#### Inherited from

BadRequestException.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1041

---

### name

• **name**: `string`

#### Inherited from

BadRequestException.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1040

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

BadRequestException.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1042

---

### validation

• **validation**: `ValidationError`[]

#### Defined in

packages/nestjs-util/src/filter/interface/class-validator-exception.interface.ts:5

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

BadRequestException.prepareStackTrace

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

BadRequestException.stackTraceLimit

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:13

## Methods

### getResponse

▸ **getResponse**(): `string` \| `object`

#### Returns

`string` \| `object`

#### Inherited from

BadRequestException.getResponse

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:69

---

### getStatus

▸ **getStatus**(): `number`

#### Returns

`number`

#### Inherited from

BadRequestException.getStatus

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:70

---

### initCause

▸ **initCause**(): `void`

Configures error chaining support

See:

- https://nodejs.org/en/blog/release/v16.9.0/#error-cause
- https://github.com/microsoft/TypeScript/issues/45167

#### Returns

`void`

#### Inherited from

BadRequestException.initCause

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:66

---

### initMessage

▸ **initMessage**(): `void`

#### Returns

`void`

#### Inherited from

BadRequestException.initMessage

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:67

---

### initName

▸ **initName**(): `void`

#### Returns

`void`

#### Inherited from

BadRequestException.initName

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:68

---

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

BadRequestException.captureStackTrace

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:4

---

### createBody

▸ `Static` **createBody**(`objectOrErrorMessage`, `description?`, `statusCode?`): `object`

#### Parameters

| Name                   | Type                 |
| :--------------------- | :------------------- |
| `objectOrErrorMessage` | `string` \| `object` |
| `description?`         | `string`             |
| `statusCode?`          | `number`             |

#### Returns

`object`

#### Inherited from

BadRequestException.createBody

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:71

---

### extractDescriptionAndOptionsFrom

▸ `Static` **extractDescriptionAndOptionsFrom**(`descriptionOrOptions`): `DescriptionAndOptions`

Utility method used to extract the error description and httpExceptionOptions from the given argument. This is used by inheriting classes to correctly parse both options.

#### Parameters

| Name                   | Type                               |
| :--------------------- | :--------------------------------- |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`DescriptionAndOptions`

the error description and the httpExceptionOptions as an object.

#### Inherited from

BadRequestException.extractDescriptionAndOptionsFrom

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:79

---

### getDescriptionFrom

▸ `Static` **getDescriptionFrom**(`descriptionOrOptions`): `string`

#### Parameters

| Name                   | Type                               |
| :--------------------- | :--------------------------------- |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`string`

#### Inherited from

BadRequestException.getDescriptionFrom

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:72

---

### getHttpExceptionOptionsFrom

▸ `Static` **getHttpExceptionOptionsFrom**(`descriptionOrOptions`): `HttpExceptionOptions`

#### Parameters

| Name                   | Type                               |
| :--------------------- | :--------------------------------- |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`HttpExceptionOptions`

#### Inherited from

BadRequestException.getHttpExceptionOptionsFrom

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:73
