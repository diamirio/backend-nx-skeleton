[@webundsoehne/nestjs-util-microservices](../README.md) / MicroserviceProviderModuleOptions

# Interface: MicroserviceProviderModuleOptions

## Table of contents

### Properties

- [clientOptions](MicroserviceProviderModuleOptions.md#clientoptions)
- [disableService](MicroserviceProviderModuleOptions.md#disableservice)
- [name](MicroserviceProviderModuleOptions.md#name)
- [provider](MicroserviceProviderModuleOptions.md#provider)
- [queue](MicroserviceProviderModuleOptions.md#queue)

## Properties

### clientOptions

• `Optional` **clientOptions**: `Object`

client options, if you dont want to use default config.js key of messageQueue.clientOptions

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `deserializer?` | `Deserializer`<`any`, `any`\> | - |
| `headers?` | `Record`<`string`, `string`\> | - |
| `isGlobalPrefetchCount?` | `boolean` | - |
| `maxConnectionAttempts?` | `number` | Maximum number of connection attempts. Applies only to the consumer configuration. -1 === infinite  **`Default`**  -1 |
| `noAck?` | `boolean` | - |
| `noAssert?` | `boolean` | - |
| `persistent?` | `boolean` | - |
| `prefetchCount?` | `number` | - |
| `queue?` | `string` | - |
| `queueOptions?` | `any` | - |
| `replyQueue?` | `string` | - |
| `serializer?` | `Serializer`<`any`, `any`\> | - |
| `socketOptions?` | `any` | - |
| `urls?` | `string`[] \| `RmqUrl`[] | - |

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:13

___

### disableService

• `Optional` **disableService**: `boolean`

disable service itself, just provide the client

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:15

___

### name

• `Optional` **name**: `string` \| `symbol`

give a inject token of your desire

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:7

___

### provider

• `Optional` **provider**: (`queue?`: `string`[]) => `FactoryProvider`<`ClientProxyFactory`\>[]

#### Type declaration

▸ (`queue?`): `FactoryProvider`<`ClientProxyFactory`\>[]

if you want to override the default provider

##### Parameters

| Name | Type |
| :------ | :------ |
| `queue?` | `string`[] |

##### Returns

`FactoryProvider`<`ClientProxyFactory`\>[]

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:11

___

### queue

• **queue**: `string`[]

queue names as string, will be autogenerated with the client module

#### Defined in

packages/nestjs-util-microservices/src/module/microservice-client/microservice-provider.interface.ts:9
