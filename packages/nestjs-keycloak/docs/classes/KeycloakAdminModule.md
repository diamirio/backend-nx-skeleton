[@webundsoehne/nestjs-keycloak](../README.md) / KeycloakAdminModule

# Class: KeycloakAdminModule

KeycloakAdminModule provides the Keycloak client to whole application, where you can perform any
modification the Keycloak itself.

## Table of contents

### Constructors

- [constructor](KeycloakAdminModule.md#constructor)

### Properties

- [keycloakProvider](KeycloakAdminModule.md#keycloakprovider)

### Methods

- [register](KeycloakAdminModule.md#register)

## Constructors

### constructor

• **new KeycloakAdminModule**()

## Properties

### keycloakProvider

▪ `Static` `Protected` **keycloakProvider**: `Provider`<`any`\>

#### Defined in

admin/admin.module.ts:14

## Methods

### register

▸ `Static` **register**(`options`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`KeycloakAdminOptions`](../interfaces/KeycloakAdminOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

admin/admin.module.ts:20
