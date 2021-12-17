[@webundsoehne/nestjs-keycloak](../README.md) / KeycloakConnectOptions

# Interface: KeycloakConnectOptions

## Table of contents

### Properties

- [auth-server-url](KeycloakConnectOptions.md#auth-server-url)
- [bearer-only](KeycloakConnectOptions.md#bearer-only)
- [confidential-port](KeycloakConnectOptions.md#confidential-port)
- [cookie-key](KeycloakConnectOptions.md#cookie-key)
- [credentials](KeycloakConnectOptions.md#credentials)
- [exceptionMessages](KeycloakConnectOptions.md#exceptionmessages)
- [realm](KeycloakConnectOptions.md#realm)
- [resource](KeycloakConnectOptions.md#resource)
- [roles](KeycloakConnectOptions.md#roles)
- [rolesRequired](KeycloakConnectOptions.md#rolesrequired)
- [scopes](KeycloakConnectOptions.md#scopes)
- [scopesRequired](KeycloakConnectOptions.md#scopesrequired)
- [scopesUnauthorized](KeycloakConnectOptions.md#scopesunauthorized)
- [ssl-required](KeycloakConnectOptions.md#ssl-required)

## Properties

### auth-server-url

• **auth-server-url**: `string`

#### Defined in

connect/connect.interfaces.ts:8

---

### bearer-only

• **bearer-only**: `boolean`

#### Defined in

connect/connect.interfaces.ts:10

---

### confidential-port

• **confidential-port**: `number`

#### Defined in

connect/connect.interfaces.ts:11

---

### cookie-key

• `Optional` **cookie-key**: `string`

#### Defined in

connect/connect.interfaces.ts:12

---

### credentials

• **credentials**: `Object`

#### Type declaration

| Name     | Type     |
| :------- | :------- |
| `secret` | `string` |

#### Defined in

connect/connect.interfaces.ts:5

---

### exceptionMessages

• `Optional` **exceptionMessages**: [`ExceptionMessagesOption`](ExceptionMessagesOption.md)

#### Defined in

connect/connect.interfaces.ts:20

---

### realm

• **realm**: `string`

#### Defined in

connect/connect.interfaces.ts:3

---

### resource

• **resource**: `string`

#### Defined in

connect/connect.interfaces.ts:4

---

### roles

• `Optional` **roles**: [`RolesOption`](../README.md#rolesoption)

#### Defined in

connect/connect.interfaces.ts:15

---

### rolesRequired

• `Optional` **rolesRequired**: `boolean`

#### Defined in

connect/connect.interfaces.ts:16

---

### scopes

• `Optional` **scopes**: [`ScopesOption`](../README.md#scopesoption)

#### Defined in

connect/connect.interfaces.ts:17

---

### scopesRequired

• `Optional` **scopesRequired**: `boolean`

#### Defined in

connect/connect.interfaces.ts:18

---

### scopesUnauthorized

• `Optional` **scopesUnauthorized**: `string`[]

#### Defined in

connect/connect.interfaces.ts:19

---

### ssl-required

• **ssl-required**: `string`

#### Defined in

connect/connect.interfaces.ts:9
