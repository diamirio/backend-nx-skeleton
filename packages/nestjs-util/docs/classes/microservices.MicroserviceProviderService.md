[@webundsoehne/nestjs-util](../README.md) / [microservices](../modules/microservices.md) / MicroserviceProviderService

# Class: MicroserviceProviderService<MessageQueues, MessageQueuePatterns, MessageQueueMap\>

[microservices](../modules/microservices.md).MicroserviceProviderService

You have to supply the types for MessageQueue enum, MessageQueuePatterns available for all queues and the map of request response types
that is expanded from MicroserviceProviderBaseMessage

## Type parameters

| Name | Type |
| :------ | :------ |
| `MessageQueues` | extends `string``any` |
| `MessageQueuePatterns` | extends `Record`<`MessageQueues`, `any`\>`any` |
| `MessageQueueMap` | extends `Record`<`MessageQueues`, `any`\>`any` |

## Implements

- `OnApplicationBootstrap`

## Table of contents

### Constructors

- [constructor](microservices.MicroserviceProviderService.md#constructor)

### Properties

- [clients](microservices.MicroserviceProviderService.md#clients)
- [options](microservices.MicroserviceProviderService.md#options)

### Methods

- [emit](microservices.MicroserviceProviderService.md#emit)
- [execute](microservices.MicroserviceProviderService.md#execute)
- [onApplicationBootstrap](microservices.MicroserviceProviderService.md#onapplicationbootstrap)
- [send](microservices.MicroserviceProviderService.md#send)

## Constructors

### constructor

• **new MicroserviceProviderService**<`MessageQueues`, `MessageQueuePatterns`, `MessageQueueMap`\>(`provider`, `names`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MessageQueues` | extends `string``any` |
| `MessageQueuePatterns` | extends `Record`<`MessageQueues`, `any`\>`any` |
| `MessageQueueMap` | extends `Record`<`MessageQueues`, `any`\>`any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `ClientProviderOptions`[] |
| `names` | `MessageQueues`[] |

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.service.ts:27

## Properties

### clients

• `Private` **clients**: `Record`<`MessageQueues`, `ClientProxy`\>

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.service.ts:24

___

### options

• `Private` **options**: `Required`<[`MicroserviceProviderServiceOptions`](../interfaces/microservices.MicroserviceProviderServiceOptions.md)\>

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.service.ts:25

## Methods

### emit

▸ **emit**<`Queue`, `Pattern`, `Payload`, `ReturnValue`\>(`queue`, `pattern`, `payload?`, `options?`): `Promise`<`ReturnValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Queue` | extends `string` |
| `Pattern` | extends `any` |
| `Payload` | extends `any` |
| `ReturnValue` | extends `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `queue` | `Queue` |
| `pattern` | `Pattern` |
| `payload?` | `Payload` |
| `options?` | [`MicroserviceProviderServiceOptions`](../interfaces/microservices.MicroserviceProviderServiceOptions.md) |

#### Returns

`Promise`<`ReturnValue`\>

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.service.ts:60

___

### execute

▸ `Private` **execute**<`Queue`, `Pattern`, `Payload`, `ReturnValue`\>(`command`, `queue`, `pattern`, `payload?`, `options?`): `Promise`<`ReturnValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Queue` | extends `string` |
| `Pattern` | extends `any` |
| `Payload` | extends `any` |
| `ReturnValue` | extends `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | ``"send"`` \| ``"emit"`` |
| `queue` | `Queue` |
| `pattern` | `Pattern` |
| `payload?` | `Payload` |
| `options?` | [`MicroserviceProviderServiceOptions`](../interfaces/microservices.MicroserviceProviderServiceOptions.md) |

#### Returns

`Promise`<`ReturnValue`\>

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.service.ts:74

___

### onApplicationBootstrap

▸ **onApplicationBootstrap**(): `void`

#### Returns

`void`

#### Implementation of

OnApplicationBootstrap.onApplicationBootstrap

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.service.ts:36

___

### send

▸ **send**<`Queue`, `Pattern`, `Payload`, `ReturnValue`\>(`queue`, `pattern`, `payload`, `options?`): `Promise`<`ReturnValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Queue` | extends `string` |
| `Pattern` | extends `any` |
| `Payload` | extends `any` |
| `ReturnValue` | extends `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `queue` | `Queue` |
| `pattern` | `Pattern` |
| `payload` | `Payload` |
| `options?` | [`MicroserviceProviderServiceOptions`](../interfaces/microservices.MicroserviceProviderServiceOptions.md) |

#### Returns

`Promise`<`ReturnValue`\>

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.service.ts:46
