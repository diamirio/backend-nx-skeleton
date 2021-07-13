[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / ClassValidatorException

# Class: ClassValidatorException

[index](../modules/index.md).ClassValidatorException

## Hierarchy

- `BadRequestException`

  ↳ **`ClassValidatorException`**

## Table of contents

### Constructors

- [constructor](index.ClassValidatorException.md#constructor)

### Properties

- [message](index.ClassValidatorException.md#message)
- [name](index.ClassValidatorException.md#name)
- [stack](index.ClassValidatorException.md#stack)
- [validation](index.ClassValidatorException.md#validation)
- [prepareStackTrace](index.ClassValidatorException.md#preparestacktrace)
- [stackTraceLimit](index.ClassValidatorException.md#stacktracelimit)

### Methods

- [getResponse](index.ClassValidatorException.md#getresponse)
- [getStatus](index.ClassValidatorException.md#getstatus)
- [initMessage](index.ClassValidatorException.md#initmessage)
- [initName](index.ClassValidatorException.md#initname)
- [captureStackTrace](index.ClassValidatorException.md#capturestacktrace)
- [createBody](index.ClassValidatorException.md#createbody)

## Constructors

### constructor

• **new ClassValidatorException**(`validation`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `validation` | `ValidationError`[] |

#### Overrides

BadRequestException.constructor

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:6

## Properties

### message

• **message**: `string`

#### Inherited from

BadRequestException.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: `string`

#### Inherited from

BadRequestException.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

BadRequestException.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

___

### validation

• **validation**: `ValidationError`[]

#### Defined in

packages/nestjs-util/src/filter/exception.interface.ts:4

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

BadRequestException.prepareStackTrace

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

BadRequestException.stackTraceLimit

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:13

## Methods

### getResponse

▸ **getResponse**(): `string` \| `object`

#### Returns

`string` \| `object`

#### Inherited from

BadRequestException.getResponse

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:40

___

### getStatus

▸ **getStatus**(): `number`

#### Returns

`number`

#### Inherited from

BadRequestException.getStatus

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:41

___

### initMessage

▸ **initMessage**(): `void`

#### Returns

`void`

#### Inherited from

BadRequestException.initMessage

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:38

___

### initName

▸ **initName**(): `void`

#### Returns

`void`

#### Inherited from

BadRequestException.initName

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:39

___

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

BadRequestException.captureStackTrace

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:4

___

### createBody

▸ `Static` **createBody**(`objectOrError`, `description?`, `statusCode?`): `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objectOrError` | `string` \| `object` |
| `description?` | `string` |
| `statusCode?` | `number` |

#### Returns

`object`

#### Inherited from

BadRequestException.createBody

#### Defined in

node_modules/@nestjs/common/exceptions/http.exception.d.ts:42
