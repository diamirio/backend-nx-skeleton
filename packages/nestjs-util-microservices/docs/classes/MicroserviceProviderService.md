[@webundsoehne/nestjs-util-microservices](../README.md) / MicroserviceProviderService

# Class: MicroserviceProviderService<MessageQueues, MessageQueuePatterns, MessageQueueMap\>

You have to supply the types for MessageQueue enum, MessageQueuePatterns available for all queues and the map of request response types
that is expanded from MicroserviceProviderBaseMessage

## Type parameters

| Name | Type |
| :------ | :------ |
| `MessageQueues` | extends `string` = `any` |
| `MessageQueuePatterns` | extends `Record`<`MessageQueues`, `any`\> = `any` |
| `MessageQueueMap` | extends `Record`<`MessageQueues`, `any`\> = `any` |

## Implements

- `OnApplicationBootstrap`

## Table of contents

### Constructors

- [constructor](MicroserviceProviderService.md#constructor)

### Properties

- [clients](MicroserviceProviderService.md#clients)
- [names](MicroserviceProviderService.md#names)
- [options](MicroserviceProviderService.md#options)
- [provider](MicroserviceProviderService.md#provider)

### Methods

- [emit](MicroserviceProviderService.md#emit)
- [execute](MicroserviceProviderService.md#execute)
- [onApplicationBootstrap](MicroserviceProviderService.md#onapplicationbootstrap)
- [raw](MicroserviceProviderService.md#raw)
- [send](MicroserviceProviderService.md#send)

## Constructors

### constructor

• **new MicroserviceProviderService**<`MessageQueues`, `MessageQueuePatterns`, `MessageQueueMap`\>(`provider`, `names`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MessageQueues` | extends `string` = `any` |
| `MessageQueuePatterns` | extends `Record`<`MessageQueues`, `any`\> = `any` |
| `MessageQueueMap` | extends `Record`<`MessageQueues`, `any`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `ClientProviderOptions`[] |
| `names` | `MessageQueues`[] |

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:25

## Properties

### clients

• `Private` **clients**: `Record`<`MessageQueues`, `ClientProxy`\>

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:22

___

### names

• `Private` `Readonly` **names**: `MessageQueues`[]

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:25

___

### options

• `Private` **options**: `Required`<[`MicroserviceProviderServiceOptions`](../interfaces/MicroserviceProviderServiceOptions.md)\>

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:23

___

### provider

• `Private` `Readonly` **provider**: `ClientProviderOptions`[]

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:25

## Methods

### emit

▸ **emit**<`Queue`, `Pattern`, `Payload`, `ReturnValue`\>(`queue`, `pattern`, `payload?`, `options?`): `Promise`<`ReturnValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Queue` | extends `string` |
| `Pattern` | extends `any` |
| `Payload` | `Payload` |
| `ReturnValue` | `ReturnValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `queue` | `Queue` |
| `pattern` | `Pattern` |
| `payload?` | `Payload` |
| `options?` | [`MicroserviceProviderServiceOptions`](../interfaces/MicroserviceProviderServiceOptions.md) |

#### Returns

`Promise`<`ReturnValue`\>

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:55

___

### execute

▸ `Private` **execute**<`Queue`, `Pattern`, `Payload`, `ReturnValue`\>(`command`, `queue`, `pattern`, `payload?`, `options?`): `Promise`<`ReturnValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Queue` | extends `string` |
| `Pattern` | extends `any` |
| `Payload` | `Payload` |
| `ReturnValue` | `ReturnValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | ``"send"`` \| ``"emit"`` |
| `queue` | `Queue` |
| `pattern` | `Pattern` |
| `payload?` | `Payload` |
| `options?` | [`MicroserviceProviderServiceOptions`](../interfaces/MicroserviceProviderServiceOptions.md) |

#### Returns

`Promise`<`ReturnValue`\>

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:86

___

### onApplicationBootstrap

▸ **onApplicationBootstrap**(): `void`

#### Returns

`void`

#### Implementation of

OnApplicationBootstrap.onApplicationBootstrap

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:35

___

### raw

▸ **raw**<`Queue`, `Pattern`, `Payload`, `ReturnValue`\>(`queue`, `pattern`, `payload?`, `options?`): `Observable`<`ReturnValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Queue` | extends `string` |
| `Pattern` | extends `any` |
| `Payload` | `Payload` |
| `ReturnValue` | `ReturnValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `queue` | `Queue` |
| `pattern` | `Pattern` |
| `payload?` | `Payload` |
| `options?` | [`MicroserviceProviderServiceOptions`](../interfaces/MicroserviceProviderServiceOptions.md) |

#### Returns

`Observable`<`ReturnValue`\>

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:64

___

### send

▸ **send**<`Queue`, `Pattern`, `Payload`, `ReturnValue`\>(`queue`, `pattern`, `payload`, `options?`): `Promise`<`ReturnValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Queue` | extends `string` |
| `Pattern` | extends `any` |
| `Payload` | `Payload` |
| `ReturnValue` | `ReturnValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `queue` | `Queue` |
| `pattern` | `Pattern` |
| `payload` | `Payload` |
| `options?` | [`MicroserviceProviderServiceOptions`](../interfaces/MicroserviceProviderServiceOptions.md) |

#### Returns

`Promise`<`ReturnValue`\>

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.service.ts:46
