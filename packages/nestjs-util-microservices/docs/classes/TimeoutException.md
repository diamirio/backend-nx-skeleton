[@webundsoehne/nestjs-util-microservices](../README.md) / TimeoutException

# Class: TimeoutException

A timeout exception for message queue internally.

## Hierarchy

- `RuntimeException`

  ↳ **`TimeoutException`**

## Table of contents

### Constructors

- [constructor](TimeoutException.md#constructor)

### Properties

- [cause](TimeoutException.md#cause)
- [message](TimeoutException.md#message)
- [name](TimeoutException.md#name)
- [stack](TimeoutException.md#stack)
- [prepareStackTrace](TimeoutException.md#preparestacktrace)
- [stackTraceLimit](TimeoutException.md#stacktracelimit)

### Methods

- [what](TimeoutException.md#what)
- [captureStackTrace](TimeoutException.md#capturestacktrace)

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

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:76

## Properties

### cause

• `Optional` **cause**: `Error`

#### Inherited from

RuntimeException.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### message

• **message**: `string`

#### Inherited from

RuntimeException.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

RuntimeException.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

RuntimeException.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

RuntimeException.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

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

node_modules/@types/node/globals.d.ts:4
