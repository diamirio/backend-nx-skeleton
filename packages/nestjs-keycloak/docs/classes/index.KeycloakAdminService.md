[@webundsoehne/nestjs-keycloak](../README.md) / [index](../modules/index.md) / KeycloakAdminService

# Class: KeycloakAdminService

[index](../modules/index.md).KeycloakAdminService

KeycloakAdminService manages the Keycloak RESTFUL API client.

## Table of contents

### Constructors

- [constructor](index.KeycloakAdminService.md#constructor)

### Properties

- [keycloakAdminClient](index.KeycloakAdminService.md#keycloakadminclient)
- [logger](index.KeycloakAdminService.md#logger)

### Accessors

- [client](index.KeycloakAdminService.md#client)

### Methods

- [createClient](index.KeycloakAdminService.md#createclient)
- [getClient](index.KeycloakAdminService.md#getclient)
- [getOptions](index.KeycloakAdminService.md#getoptions)
- [isExpiredAccessToken](index.KeycloakAdminService.md#isexpiredaccesstoken)
- [reloadClient](index.KeycloakAdminService.md#reloadclient)
- [validateClient](index.KeycloakAdminService.md#validateclient)

## Constructors

### constructor

• **new KeycloakAdminService**(`options`)

#### Parameters

| Name      | Type                                                                  |
| :-------- | :-------------------------------------------------------------------- |
| `options` | [`KeycloakAdminOptions`](../interfaces/index.KeycloakAdminOptions.md) |

#### Defined in

admin/admin.service.ts:15

## Properties

### keycloakAdminClient

• `Private` **keycloakAdminClient**: `KeycloakAdminClient`

#### Defined in

admin/admin.service.ts:13

---

### logger

• `Readonly` **logger**: `Logger`

#### Defined in

admin/admin.service.ts:12

## Accessors

### client

• `get` **client**(): `KeycloakAdminClient`

Getter for the REST API client.

#### Returns

`KeycloakAdminClient`

#### Defined in

admin/admin.service.ts:20

## Methods

### createClient

▸ `Private` **createClient**(): `Promise`<`void`\>

Creates and authorizes to the Keycloak REST API.

#### Returns

`Promise`<`void`\>

#### Defined in

admin/admin.service.ts:54

---

### getClient

▸ **getClient**(): `Promise`<`KeycloakAdminClient`\>

Creates a new client if it does not exists, returns the singleton instance if it does.

#### Returns

`Promise`<`KeycloakAdminClient`\>

#### Defined in

admin/admin.service.ts:27

---

### getOptions

▸ **getOptions**(): [`KeycloakAdminOptions`](../interfaces/index.KeycloakAdminOptions.md)

Returns the options that Keycloak REST API client is initiated with.

#### Returns

[`KeycloakAdminOptions`](../interfaces/index.KeycloakAdminOptions.md)

#### Defined in

admin/admin.service.ts:47

---

### isExpiredAccessToken

▸ `Private` **isExpiredAccessToken**(`accessToken`): `boolean`

Checks whether the current authentication token to Keycloak REST API is expired.

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `accessToken` | `string` |

#### Returns

`boolean`

#### Defined in

admin/admin.service.ts:73

---

### reloadClient

▸ **reloadClient**(): `Promise`<`KeycloakAdminClient`\>

Recreates the client first before returning it.

#### Returns

`Promise`<`KeycloakAdminClient`\>

#### Defined in

admin/admin.service.ts:38

---

### validateClient

▸ `Private` **validateClient**(): `boolean`

Checks whether current client is expired.

#### Returns

`boolean`

#### Defined in

admin/admin.service.ts:64
