[@webundsoehne/nestjs-keycloak](../README.md) / KeycloakConnectModule

# Class: KeycloakConnectModule

KeycloakConnectModule provides the Keycloak API to validate user authentication through a backend client. This client is usually a private client with the token authentication flow in Keycloak.

## Table of contents

### Constructors

- [constructor](KeycloakConnectModule.md#constructor)

### Properties

- [keycloakProvider](KeycloakConnectModule.md#keycloakprovider)

### Methods

- [register](KeycloakConnectModule.md#register)

## Constructors

### constructor

• **new KeycloakConnectModule**()

## Properties

### keycloakProvider

▪ `Static` `Protected` **keycloakProvider**: `Provider`<`any`\>

#### Defined in

connect/connect.module.ts:14

## Methods

### register

▸ `Static` **register**(`options`): `DynamicModule`

#### Parameters

| Name      | Type                                                                |
| :-------- | :------------------------------------------------------------------ |
| `options` | [`KeycloakConnectOptions`](../interfaces/KeycloakConnectOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

connect/connect.module.ts:32
