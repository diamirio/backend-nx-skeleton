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

### message

• **message**: `string`

#### Inherited from

RuntimeException.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1041

___

### name

• **name**: `string`

#### Inherited from

RuntimeException.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1040

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

RuntimeException.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1042

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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

node_modules/@types/node/ts4.8/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

RuntimeException.stackTraceLimit

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:13

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

node_modules/@types/node/ts4.8/globals.d.ts:4
