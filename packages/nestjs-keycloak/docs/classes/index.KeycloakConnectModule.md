[@webundsoehne/nestjs-keycloak](../README.md) / [index](../modules/index.md) / KeycloakConnectModule

# Class: KeycloakConnectModule

[index](../modules/index.md).KeycloakConnectModule

KeycloakConnectModule provides the Keycloak API to validate user authentication through a backend client. This client is usually a private client with the token authentication flow in Keycloak.

## Table of contents

### Constructors

- [constructor](index.KeycloakConnectModule.md#constructor)

### Properties

- [keycloakProvider](index.KeycloakConnectModule.md#keycloakprovider)

### Methods

- [register](index.KeycloakConnectModule.md#register)

## Constructors

### constructor

• **new KeycloakConnectModule**()

## Properties

### keycloakProvider

▪ `Static` `Protected` **keycloakProvider**: `Provider`<`any`\>

#### Defined in

packages/nestjs-keycloak/src/connect/connect.module.ts:14

## Methods

### register

▸ `Static` **register**(`options`): `DynamicModule`

#### Parameters

| Name      | Type                                                                      |
| :-------- | :------------------------------------------------------------------------ |
| `options` | [`KeycloakConnectOptions`](../interfaces/index.KeycloakConnectOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

packages/nestjs-keycloak/src/connect/connect.module.ts:32
