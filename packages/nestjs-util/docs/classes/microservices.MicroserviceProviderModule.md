[@webundsoehne/nestjs-util](../README.md) / [microservices](../modules/microservices.md) / MicroserviceProviderModule

# Class: MicroserviceProviderModule

[microservices](../modules/microservices.md).MicroserviceProviderModule

## Table of contents

### Constructors

- [constructor](microservices.MicroserviceProviderModule.md#constructor)

### Methods

- [forRoot](microservices.MicroserviceProviderModule.md#forroot)

## Constructors

### constructor

• **new MicroserviceProviderModule**()

## Methods

### forRoot

▸ `Static` **forRoot**(`options`): `DynamicModule`

Provides a message queue client and a service to the whole application.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MicroserviceProviderModuleOptions`](../interfaces/microservices.MicroserviceProviderModuleOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

packages/nestjs-util/src/provider/microservice-client/microservice-provider.module.ts:15
