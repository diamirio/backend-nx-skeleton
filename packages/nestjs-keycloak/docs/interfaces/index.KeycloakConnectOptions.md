[@webundsoehne/nestjs-keycloak](../README.md) / [index](../modules/index.md) / KeycloakConnectOptions

# Interface: KeycloakConnectOptions

[index](../modules/index.md).KeycloakConnectOptions

## Table of contents

### Properties

- [auth-server-url](index.KeycloakConnectOptions.md#auth-server-url)
- [bearer-only](index.KeycloakConnectOptions.md#bearer-only)
- [confidential-port](index.KeycloakConnectOptions.md#confidential-port)
- [cookie-key](index.KeycloakConnectOptions.md#cookie-key)
- [credentials](index.KeycloakConnectOptions.md#credentials)
- [exceptionMessages](index.KeycloakConnectOptions.md#exceptionmessages)
- [realm](index.KeycloakConnectOptions.md#realm)
- [resource](index.KeycloakConnectOptions.md#resource)
- [roles](index.KeycloakConnectOptions.md#roles)
- [rolesRequired](index.KeycloakConnectOptions.md#rolesrequired)
- [scopes](index.KeycloakConnectOptions.md#scopes)
- [scopesRequired](index.KeycloakConnectOptions.md#scopesrequired)
- [scopesUnauthorized](index.KeycloakConnectOptions.md#scopesunauthorized)
- [ssl-required](index.KeycloakConnectOptions.md#ssl-required)

## Properties

### auth-server-url

• **auth-server-url**: `string`

#### Defined in

connect/connect.interfaces.ts:8

___

### bearer-only

• **bearer-only**: `boolean`

#### Defined in

connect/connect.interfaces.ts:10

___

### confidential-port

• **confidential-port**: `number`

#### Defined in

connect/connect.interfaces.ts:11

___

### cookie-key

• `Optional` **cookie-key**: `string`

#### Defined in

connect/connect.interfaces.ts:12

___

### credentials

• **credentials**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `secret` | `string` |

#### Defined in

connect/connect.interfaces.ts:5

___

### exceptionMessages

• `Optional` **exceptionMessages**: [`ExceptionMessagesOption`](index.ExceptionMessagesOption.md)

#### Defined in

connect/connect.interfaces.ts:20

___

### realm

• **realm**: `string`

#### Defined in

connect/connect.interfaces.ts:3

___

### resource

• **resource**: `string`

#### Defined in

connect/connect.interfaces.ts:4

___

### roles

• `Optional` **roles**: [`RolesOption`](../modules/index.md#rolesoption)

#### Defined in

connect/connect.interfaces.ts:15

___

### rolesRequired

• `Optional` **rolesRequired**: `boolean`

#### Defined in

connect/connect.interfaces.ts:16

___

### scopes

• `Optional` **scopes**: [`ScopesOption`](../modules/index.md#scopesoption)

#### Defined in

connect/connect.interfaces.ts:17

___

### scopesRequired

• `Optional` **scopesRequired**: `boolean`

#### Defined in

connect/connect.interfaces.ts:18

___

### scopesUnauthorized

• `Optional` **scopesUnauthorized**: `string`[]

#### Defined in

connect/connect.interfaces.ts:19

___

### ssl-required

• **ssl-required**: `string`

#### Defined in

connect/connect.interfaces.ts:9
