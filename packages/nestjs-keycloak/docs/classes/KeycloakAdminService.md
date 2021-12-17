[@webundsoehne/nestjs-keycloak](../README.md) / KeycloakAdminService

# Class: KeycloakAdminService

KeycloakAdminService manages the Keycloak RESTFUL API client.

## Table of contents

### Constructors

- [constructor](KeycloakAdminService.md#constructor)

### Properties

- [keycloakAdminClient](KeycloakAdminService.md#keycloakadminclient)
- [logger](KeycloakAdminService.md#logger)

### Accessors

- [client](KeycloakAdminService.md#client)

### Methods

- [createClient](KeycloakAdminService.md#createclient)
- [getClient](KeycloakAdminService.md#getclient)
- [getOptions](KeycloakAdminService.md#getoptions)
- [isExpiredAccessToken](KeycloakAdminService.md#isexpiredaccesstoken)
- [reloadClient](KeycloakAdminService.md#reloadclient)
- [validateClient](KeycloakAdminService.md#validateclient)

## Constructors

### constructor

• **new KeycloakAdminService**(`options`)

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `options` | `KeycloakAdminOptions` |

#### Defined in

admin/admin.service.ts:14

## Properties

### keycloakAdminClient

• `Private` **keycloakAdminClient**: `KeycloakAdminClient`

#### Defined in

admin/admin.service.ts:12

---

### logger

• `Readonly` **logger**: `Logger`

#### Defined in

admin/admin.service.ts:11

## Accessors

### client

• `get` **client**(): `KeycloakAdminClient`

Getter for the REST API client.

#### Returns

`KeycloakAdminClient`

#### Defined in

admin/admin.service.ts:19

## Methods

### createClient

▸ `Private` **createClient**(): `Promise`<`void`\>

Creates and authorizes to the Keycloak REST API.

#### Returns

`Promise`<`void`\>

#### Defined in

admin/admin.service.ts:53

---

### getClient

▸ **getClient**(): `Promise`<`KeycloakAdminClient`\>

Creates a new client if it does not exists, returns the singleton instance if it does.

#### Returns

`Promise`<`KeycloakAdminClient`\>

#### Defined in

admin/admin.service.ts:26

---

### getOptions

▸ **getOptions**(): `KeycloakAdminOptions`

Returns the options that Keycloak REST API client is initiated with.

#### Returns

`KeycloakAdminOptions`

#### Defined in

admin/admin.service.ts:46

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

admin/admin.service.ts:72

---

### reloadClient

▸ **reloadClient**(): `Promise`<`KeycloakAdminClient`\>

Recreates the client first before returning it.

#### Returns

`Promise`<`KeycloakAdminClient`\>

#### Defined in

admin/admin.service.ts:37

---

### validateClient

▸ `Private` **validateClient**(): `boolean`

Checks whether current client is expired.

#### Returns

`boolean`

#### Defined in

admin/admin.service.ts:63
