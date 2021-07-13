[@webundsoehne/nestjs-util](../README.md) / [microservices](../modules/microservices.md) / TimeoutException

# Class: TimeoutException

[microservices](../modules/microservices.md).TimeoutException

A timeout exception for message queue internally.

## Hierarchy

- `RuntimeException`

  ↳ **`TimeoutException`**

## Table of contents

### Constructors

- [constructor](microservices.TimeoutException.md#constructor)

### Properties

- [message](microservices.TimeoutException.md#message)
- [name](microservices.TimeoutException.md#name)
- [stack](microservices.TimeoutException.md#stack)
- [prepareStackTrace](microservices.TimeoutException.md#preparestacktrace)
- [stackTraceLimit](microservices.TimeoutException.md#stacktracelimit)

### Methods

- [what](microservices.TimeoutException.md#what)
- [captureStackTrace](microservices.TimeoutException.md#capturestacktrace)

## Constructors

### constructor

• **new TimeoutException**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Overrides

RuntimeException.constructor

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.interface.ts:64

## Properties

### message

• **message**: `string`

#### Inherited from

RuntimeException.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: `string`

#### Inherited from

RuntimeException.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

RuntimeException.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

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

RuntimeException.prepareStackTrace

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

RuntimeException.stackTraceLimit

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:13

## Methods

### what

▸ **what**(): `string`

#### Returns

`string`

#### Inherited from

RuntimeException.what

#### Defined in

node_modules/@nestjs/core/errors/exceptions/runtime.exception.d.ts:3

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

RuntimeException.captureStackTrace

#### Defined in

packages/nestjs-util/node_modules/@types/node/globals.d.ts:4
