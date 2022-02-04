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
- [initMessage](ClassValidatorException.md#initmessage)
- [initName](ClassValidatorException.md#initname)
- [captureStackTrace](ClassValidatorException.md#capturestacktrace)
- [createBody](ClassValidatorException.md#createbody)

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

packages/nestjs-util/src/filter/exception.interface.ts:7

## Properties

### cause

• `Optional` **cause**: `Error`

#### Inherited from

BadRequestException.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:26

---

### message

• **message**: `string`

#### Inherited from

BadRequestException.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

---

### name

• **name**: `string`

#### Inherited from

BadRequestException.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

BadRequestException.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

---

### validation

• **validation**: `ValidationError`[]

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:5

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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

node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

BadRequestException.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### getResponse

▸ **getResponse**(): `string` \| `object`

#### Returns

`string` \| `object`

#### Inherited from

BadRequestException.getResponse

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:40

---

### getStatus

▸ **getStatus**(): `number`

#### Returns

`number`

#### Inherited from

BadRequestException.getStatus

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:41

---

### initMessage

▸ **initMessage**(): `void`

#### Returns

`void`

#### Inherited from

BadRequestException.initMessage

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:38

---

### initName

▸ **initName**(): `void`

#### Returns

`void`

#### Inherited from

BadRequestException.initName

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:39

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

node_modules/@types/node/globals.d.ts:4

---

### createBody

▸ `Static` **createBody**(`objectOrError`, `description?`, `statusCode?`): `object`

#### Parameters

| Name            | Type                 |
| :-------------- | :------------------- |
| `objectOrError` | `string` \| `object` |
| `description?`  | `string`             |
| `statusCode?`   | `number`             |

#### Returns

`object`

#### Inherited from

BadRequestException.createBody

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:42
