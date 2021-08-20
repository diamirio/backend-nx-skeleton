[@webundsoehne/nestjs-util](../README.md) / microservices

# Module: microservices

## Table of contents

### Classes

- [BaseMessageIndexes](../classes/microservices.BaseMessageIndexes.md)
- [MicroserviceProviderModule](../classes/microservices.MicroserviceProviderModule.md)
- [MicroserviceProviderService](../classes/microservices.MicroserviceProviderService.md)
- [RpcGlobalExceptionFilter](../classes/microservices.RpcGlobalExceptionFilter.md)
- [TimeoutException](../classes/microservices.TimeoutException.md)

### Interfaces

- [MicroserviceProviderMessage](../interfaces/microservices.MicroserviceProviderMessage.md)
- [MicroserviceProviderModuleOptions](../interfaces/microservices.MicroserviceProviderModuleOptions.md)
- [MicroserviceProviderServiceOptions](../interfaces/microservices.MicroserviceProviderServiceOptions.md)

### Type aliases

- [BaseMessageQueueMap](microservices.md#basemessagequeuemap)
- [BaseMessageQueuePatterns](microservices.md#basemessagequeuepatterns)
- [EnumKeys](microservices.md#enumkeys)
- [GetMicroserviceMessageRequestFromMap](microservices.md#getmicroservicemessagerequestfrommap)
- [GetMicroserviceMessageResponseFromMap](microservices.md#getmicroservicemessageresponsefrommap)
- [MicroserviceProviderBaseMessage](microservices.md#microserviceproviderbasemessage)
- [MicroserviceProviderClientOptions](microservices.md#microserviceproviderclientoptions)

### Functions

- [provideMessageQueueClient](microservices.md#providemessagequeueclient)

## Type aliases

### BaseMessageQueueMap

Ƭ **BaseMessageQueueMap**<`T`\>: `Record`<`T`, [`MicroserviceProviderBaseMessage`](microservices.md#microserviceproviderbasemessage)<[`EnumKeys`](microservices.md#enumkeys)\>\>

Type of message queue map

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EnumKeys`](microservices.md#enumkeys) |

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.interface.ts:82

___

### BaseMessageQueuePatterns

Ƭ **BaseMessageQueuePatterns**<`T`\>: `Record`<`T`, [`EnumKeys`](microservices.md#enumkeys)\>

Type of a message queue patern thingy

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EnumKeys`](microservices.md#enumkeys) |

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.interface.ts:77

___

### EnumKeys

Ƭ **EnumKeys**: `string` \| `symbol` \| `number`

Shorthand for enum keys

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.interface.ts:72

___

### GetMicroserviceMessageRequestFromMap

Ƭ **GetMicroserviceMessageRequestFromMap**<`Event`, `Map`\>: `Event` extends keyof `Map` ? ``"request"`` extends keyof `Map`[`Event`] ? `Map`[`Event`][``"request"``] : `never` : `never`

Request type of an microservice message.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Event` | extends `string` |
| `Map` | extends `Record`<`string`, [`MicroserviceProviderMessage`](../interfaces/microservices.MicroserviceProviderMessage.md)\> |

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.interface.ts:46

___

### GetMicroserviceMessageResponseFromMap

Ƭ **GetMicroserviceMessageResponseFromMap**<`Event`, `Map`\>: `Event` extends keyof `Map` ? ``"response"`` extends keyof `Map`[`Event`] ? `Map`[`Event`][``"response"``] : `void` : `never`

Response type of an microservice message.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Event` | extends `string` |
| `Map` | extends `Record`<`string`, [`MicroserviceProviderMessage`](../interfaces/microservices.MicroserviceProviderMessage.md)\> |

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.interface.ts:55

___

### MicroserviceProviderBaseMessage

Ƭ **MicroserviceProviderBaseMessage**<`Pattern`\>: { [K in Pattern]: MicroserviceProviderMessage}

This is the base format which a message queue maps for request responses can be supplied.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Pattern` | extends `string` \| `symbol` \| `number` |

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.interface.ts:33

___

### MicroserviceProviderClientOptions

Ƭ **MicroserviceProviderClientOptions**: `RmqOptions`[``"options"``]

Inject options for provider client configuration
Currently only supports options for RMQ

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.interface.ts:27

## Functions

### provideMessageQueueClient

▸ **provideMessageQueueClient**(`queue`, `options?`): `FactoryProvider`<`ClientProxyFactory`\>[]

Provide a message queue client with the supplied names of queues.
Currently only supports RabbitMQ, but can be made generic later on.

#### Parameters

| Name | Type |
| :------ | :------ |
| `queue` | `string` \| `string`[] |
| `options?` | [`MicroserviceProviderClientOptions`](microservices.md#microserviceproviderclientoptions) |

#### Returns

`FactoryProvider`<`ClientProxyFactory`\>[]

#### Defined in

packages/nestjs-util/src/provider/microservice-client/utils/microservice-client.util.ts:13
