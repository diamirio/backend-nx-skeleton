@webundsoehne/nestjs-util-microservices

# @webundsoehne/nestjs-util-microservices

## Table of contents

### Classes

- [BaseMessageIndexes](classes/BaseMessageIndexes.md)
- [MicroserviceProviderModule](classes/MicroserviceProviderModule.md)
- [MicroserviceProviderService](classes/MicroserviceProviderService.md)
- [RpcGlobalExceptionFilter](classes/RpcGlobalExceptionFilter.md)
- [TimeoutException](classes/TimeoutException.md)

### Interfaces

- [MicroserviceProviderModuleOptions](interfaces/MicroserviceProviderModuleOptions.md)
- [MicroserviceProviderServiceOptions](interfaces/MicroserviceProviderServiceOptions.md)

### Type Aliases

- [BaseMessageQueueMap](README.md#basemessagequeuemap)
- [BaseMessageQueuePatterns](README.md#basemessagequeuepatterns)
- [EnumKeys](README.md#enumkeys)
- [GetMicroserviceMessageRequestFromMap](README.md#getmicroservicemessagerequestfrommap)
- [GetMicroserviceMessageResponseFromMap](README.md#getmicroservicemessageresponsefrommap)
- [MicroserviceProviderBaseMessage](README.md#microserviceproviderbasemessage)
- [MicroserviceProviderClientOptions](README.md#microserviceproviderclientoptions)
- [MicroserviceProviderMessage](README.md#microserviceprovidermessage)

### Functions

- [InjectMSP](README.md#injectmsp)
- [provideMessageQueueClient](README.md#providemessagequeueclient)

## Type Aliases

### BaseMessageQueueMap

Ƭ **BaseMessageQueueMap**<`T`\>: `Record`<`T`, [`MicroserviceProviderBaseMessage`](README.md#microserviceproviderbasemessage)<[`EnumKeys`](README.md#enumkeys)\>\>

Type of message queue map

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EnumKeys`](README.md#enumkeys) |

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:94

___

### BaseMessageQueuePatterns

Ƭ **BaseMessageQueuePatterns**<`T`\>: `Record`<`T`, [`EnumKeys`](README.md#enumkeys)\>

Type of a message queue patern thingy

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EnumKeys`](README.md#enumkeys) |

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:89

___

### EnumKeys

Ƭ **EnumKeys**: `string` \| `number`

Shorthand for enum keys

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:84

___

### GetMicroserviceMessageRequestFromMap

Ƭ **GetMicroserviceMessageRequestFromMap**<`Event`, `Map`\>: `Event` extends keyof `Map` ? `Map`[`Event`] extends (`request?`: `any`) => `any` ? `Map`[`Event`] extends (`request?`: infer P) => `any` ? `P` : `never` : ``"request"`` extends keyof `Map`[`Event`] ? `Map`[`Event`][``"request"``] : `never` : `never`

Request type of an microservice message.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Event` | extends `string` |
| `Map` | extends `Record`<[`EnumKeys`](README.md#enumkeys), [`MicroserviceProviderMessage`](README.md#microserviceprovidermessage)\> |

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:48

___

### GetMicroserviceMessageResponseFromMap

Ƭ **GetMicroserviceMessageResponseFromMap**<`Event`, `Map`\>: `Event` extends keyof `Map` ? `Map`[`Event`] extends (`request?`: `any`) => `any` ? `Map`[`Event`] extends (`request?`: `any`) => infer P ? `P` : `never` : ``"response"`` extends keyof `Map`[`Event`] ? `Map`[`Event`][``"response"``] : `never` : `never`

Response type of an microservice message.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Event` | extends `string` |
| `Map` | extends `Record`<[`EnumKeys`](README.md#enumkeys), [`MicroserviceProviderMessage`](README.md#microserviceprovidermessage)\> |

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:62

___

### MicroserviceProviderBaseMessage

Ƭ **MicroserviceProviderBaseMessage**<`Pattern`\>: { [K in Pattern]: MicroserviceProviderMessage }

This is the base format which a message queue maps for request responses can be supplied.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Pattern` | extends [`EnumKeys`](README.md#enumkeys) |

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:33

___

### MicroserviceProviderClientOptions

Ƭ **MicroserviceProviderClientOptions**: `RmqOptions`[``"options"``]

Inject options for provider client configuration
Currently only supports options for RMQ

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:27

___

### MicroserviceProviderMessage

Ƭ **MicroserviceProviderMessage**: { `request?`: `any` ; `response?`: `any`  } \| (`request?`: `any`) => `any`

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:37

## Functions

### InjectMSP

▸ **InjectMSP**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects microservice provider service instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/decorators/inject.decorator.ts:8

___

### provideMessageQueueClient

▸ **provideMessageQueueClient**(`queue`, `options?`): `FactoryProvider`<`ClientProxyFactory`\>[]

Provide a message queue client with the supplied names of queues.
Currently only supports RabbitMQ, but can be made generic later on.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queue` | `string` \| `string`[] |  |
| `options?` | `Object` | - |
| `options.deserializer?` | `Deserializer`<`any`, `any`\> | - |
| `options.headers?` | `Record`<`string`, `string`\> | - |
| `options.isGlobalPrefetchCount?` | `boolean` | - |
| `options.maxConnectionAttempts?` | `number` | Maximum number of connection attempts. Applies only to the consumer configuration. -1 === infinite  **`Default`**  -1 |
| `options.noAck?` | `boolean` | - |
| `options.noAssert?` | `boolean` | - |
| `options.persistent?` | `boolean` | - |
| `options.prefetchCount?` | `number` | - |
| `options.queue?` | `string` | - |
| `options.queueOptions?` | `any` | - |
| `options.replyQueue?` | `string` | - |
| `options.serializer?` | `Serializer`<`any`, `any`\> | - |
| `options.socketOptions?` | `any` | - |
| `options.urls?` | `string`[] \| `RmqUrl`[] | - |

#### Returns

`FactoryProvider`<`ClientProxyFactory`\>[]

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/utils/microservice-client.util.ts:13
