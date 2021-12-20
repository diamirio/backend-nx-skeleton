[@webundsoehne/nestjs-keycloak](../README.md) / [index](../modules/index.md) / KeycloakAdminModule

# Class: KeycloakAdminModule

[index](../modules/index.md).KeycloakAdminModule

KeycloakAdminModule provides the Keycloak client to whole application, where you can perform any modification the Keycloak itself.

## Table of contents

### Constructors

- [constructor](index.KeycloakAdminModule.md#constructor)

### Properties

- [keycloakProvider](index.KeycloakAdminModule.md#keycloakprovider)

### Methods

- [register](index.KeycloakAdminModule.md#register)

## Constructors

### constructor

• **new KeycloakAdminModule**()

## Properties

### keycloakProvider

▪ `Static` `Protected` **keycloakProvider**: `Provider`<`any`\>

#### Defined in

packages/nestjs-keycloak/src/admin/admin.module.ts:14

## Methods

### register

▸ `Static` **register**(`options`): `DynamicModule`

#### Parameters

| Name      | Type                                                                  |
| :-------- | :-------------------------------------------------------------------- |
| `options` | [`KeycloakAdminOptions`](../interfaces/index.KeycloakAdminOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

packages/nestjs-keycloak/src/admin/admin.module.ts:20
