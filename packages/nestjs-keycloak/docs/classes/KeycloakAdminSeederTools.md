[@webundsoehne/nestjs-keycloak](../README.md) / KeycloakAdminSeederTools

# Class: KeycloakAdminSeederTools

## Table of contents

### Constructors

- [constructor](KeycloakAdminSeederTools.md#constructor)

### Properties

- [client](KeycloakAdminSeederTools.md#client)
- [clients](KeycloakAdminSeederTools.md#clients)
- [logger](KeycloakAdminSeederTools.md#logger)

### Methods

- [assignRolesToGroup](KeycloakAdminSeederTools.md#assignrolestogroup)
- [createClient](KeycloakAdminSeederTools.md#createclient)
- [createNewKeycloakEntities](KeycloakAdminSeederTools.md#createnewkeycloakentities)
- [flushKeycloakEntities](KeycloakAdminSeederTools.md#flushkeycloakentities)
- [getAll](KeycloakAdminSeederTools.md#getall)
- [getClient](KeycloakAdminSeederTools.md#getclient)
- [getIdFromMappedData](KeycloakAdminSeederTools.md#getidfrommappeddata)
- [isAlreadyExistsError](KeycloakAdminSeederTools.md#isalreadyexistserror)
- [parseSeedError](KeycloakAdminSeederTools.md#parseseederror)
- [swapMapKeysToIds](KeycloakAdminSeederTools.md#swapmapkeystoids)
- [swapNamesToMapping](KeycloakAdminSeederTools.md#swapnamestomapping)
- [updateKeycloakEntities](KeycloakAdminSeederTools.md#updatekeycloakentities)

## Constructors

### constructor

• **new KeycloakAdminSeederTools**(`keycloak`)

#### Parameters

| Name       | Type                                              |
| :--------- | :------------------------------------------------ |
| `keycloak` | [`KeycloakAdminService`](KeycloakAdminService.md) |

#### Defined in

util/keycloak-seeder-tools.ts:18

## Properties

### client

• **client**: `KeycloakAdminClient`

#### Defined in

util/keycloak-seeder-tools.ts:15

---

### clients

• **clients**: `Record`<`string`, `KeycloakAdminClient`\> = `{}`

#### Defined in

util/keycloak-seeder-tools.ts:16

---

### logger

• **logger**: `Logger`

#### Defined in

util/keycloak-seeder-tools.ts:14

## Methods

### assignRolesToGroup

▸ **assignRolesToGroup**(`map`, `options?`): `Promise`<`void`\>

#### Parameters

| Name                    | Type                            |
| :---------------------- | :------------------------------ |
| `map`                   | `Record`<`string`, `string`[]\> |
| `options?`              | `Object`                        |
| `options.flushUnknown?` | `boolean`                       |
| `options.realm?`        | `string`                        |
| `options.silent?`       | `boolean`                       |

#### Returns

`Promise`<`void`\>

#### Defined in

util/keycloak-seeder-tools.ts:298

---

### createClient

▸ **createClient**(`realm`, `options?`): `Promise`<`KeycloakAdminClient`\>

#### Parameters

| Name       | Type                                                               |
| :--------- | :----------------------------------------------------------------- |
| `realm`    | `string`                                                           |
| `options?` | [`DeepPartial`](../README.md#deeppartial)<`KeycloakAdminOptions`\> |

#### Returns

`Promise`<`KeycloakAdminClient`\>

#### Defined in

util/keycloak-seeder-tools.ts:36

---

### createNewKeycloakEntities

▸ **createNewKeycloakEntities**<`T`, `K`\>(`context`, `input`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type                                                             |
| :--- | :--------------------------------------------------------------- |
| `T`  | extends `"groups"` \| `"roles"` \| `"clients"` \| `"realms"`     |
| `K`  | extends `default`[] \| `default`[] \| `default`[] \| `default`[] |

#### Parameters

| Name                        | Type                                                                                                                                      |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `context`                   | `T`                                                                                                                                       |
| `input`                     | [`Await`](../README.md#await)<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>                                                     |
| `options?`                  | `Object`                                                                                                                                  |
| `options.fallbackToUpdate?` | `boolean`                                                                                                                                 |
| `options.flush?`            | `boolean`                                                                                                                                 |
| `options.flushUnknown?`     | `boolean`                                                                                                                                 |
| `options.identifier?`       | keyof [`ArrayElement`](../README.md#arrayelement)<[`Await`](../README.md#await)<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\> |
| `options.realm?`            | `string`                                                                                                                                  |

#### Returns

`Promise`<`void`\>

#### Defined in

util/keycloak-seeder-tools.ts:120

---

### flushKeycloakEntities

▸ **flushKeycloakEntities**<`T`, `K`\>(`context`, `input`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type                                                             |
| :--- | :--------------------------------------------------------------- |
| `T`  | extends `"groups"` \| `"roles"` \| `"clients"` \| `"realms"`     |
| `K`  | extends `default`[] \| `default`[] \| `default`[] \| `default`[] |

#### Parameters

| Name                  | Type                                                                                  |
| :-------------------- | :------------------------------------------------------------------------------------ |
| `context`             | `T`                                                                                   |
| `input`               | [`Await`](../README.md#await)<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\> |
| `options?`            | `Object`                                                                              |
| `options.identifier?` | keyof [`ArrayElement`](../README.md#arrayelement)<`K`\>                               |
| `options.realm?`      | `string`                                                                              |

#### Returns

`Promise`<`void`\>

#### Defined in

util/keycloak-seeder-tools.ts:243

---

### getAll

▸ **getAll**<`K`, `T`\>(`context`, `options?`): `Promise`<`Record`<`K`, [`Await`](../README.md#await)<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\>\>

#### Type parameters

| Name | Type                                                                                                                |
| :--- | :------------------------------------------------------------------------------------------------------------------ |
| `K`  | extends `PropertyKey`                                                                                               |
| `T`  | extends `"groups"` \| `"roles"` \| `"clients"` \| `"realms"` = `"groups"` \| `"roles"` \| `"clients"` \| `"realms"` |

#### Parameters

| Name               | Type                                                                                                                                      |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `context`          | `T`                                                                                                                                       |
| `options?`         | `Object`                                                                                                                                  |
| `options.groupBy?` | keyof [`ArrayElement`](../README.md#arrayelement)<[`Await`](../README.md#await)<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\> |
| `options.realm?`   | `string`                                                                                                                                  |

#### Returns

`Promise`<`Record`<`K`, [`Await`](../README.md#await)<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\>\>

#### Defined in

util/keycloak-seeder-tools.ts:55

---

### getClient

▸ **getClient**(`realm?`): `Promise`<`KeycloakAdminClient`\>

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `realm?` | `string` |

#### Returns

`Promise`<`KeycloakAdminClient`\>

#### Defined in

util/keycloak-seeder-tools.ts:20

---

### getIdFromMappedData

▸ **getIdFromMappedData**<`K`\>(`data`, `name`, `identifier?`): `string`

Internal function to get the id of named Keycloak entitiy from the given parsed map.

#### Type parameters

| Name | Type                                                                                       |
| :--- | :----------------------------------------------------------------------------------------- |
| `K`  | extends `Record`<`PropertyKey`, `default`[] \| `default`[] \| `default`[] \| `default`[]\> |

#### Parameters

| Name         | Type     | Default value |
| :----------- | :------- | :------------ |
| `data`       | `K`      | `undefined`   |
| `name`       | `string` | `undefined`   |
| `identifier` | `string` | `'id'`        |

#### Returns

`string`

#### Defined in

util/keycloak-seeder-tools.ts:107

---

### isAlreadyExistsError

▸ **isAlreadyExistsError**(`err`): `boolean`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `err` | `any` |

#### Returns

`boolean`

#### Defined in

util/keycloak-seeder-tools.ts:381

---

### parseSeedError

▸ **parseSeedError**(`err`, `options?`): `string` \| `void`

#### Parameters

| Name               | Type      |
| :----------------- | :-------- |
| `err`              | `any`     |
| `options?`         | `Object`  |
| `options.context?` | `string`  |
| `options.log?`     | `boolean` |
| `options.return?`  | `boolean` |

#### Returns

`string` \| `void`

#### Defined in

util/keycloak-seeder-tools.ts:363

---

### swapMapKeysToIds

▸ **swapMapKeysToIds**<`T`, `K`\>(`data`, `map`): `Record`<`string`, `T`\>

#### Type parameters

| Name | Type                                                                                       |
| :--- | :----------------------------------------------------------------------------------------- |
| `T`  | `T`                                                                                        |
| `K`  | extends `Record`<`PropertyKey`, `default`[] \| `default`[] \| `default`[] \| `default`[]\> |

#### Parameters

| Name   | Type                     |
| :----- | :----------------------- |
| `data` | `K`                      |
| `map`  | `Record`<`string`, `T`\> |

#### Returns

`Record`<`string`, `T`\>

#### Defined in

util/keycloak-seeder-tools.ts:82

---

### swapNamesToMapping

▸ **swapNamesToMapping**<`T`, `K`\>(`data`, `map`): `RoleMappingPayload`[]

#### Type parameters

| Name | Type                                                                                       |
| :--- | :----------------------------------------------------------------------------------------- |
| `T`  | extends `string`[]                                                                         |
| `K`  | extends `Record`<`PropertyKey`, `default`[] \| `default`[] \| `default`[] \| `default`[]\> |

#### Parameters

| Name   | Type |
| :----- | :--- |
| `data` | `K`  |
| `map`  | `T`  |

#### Returns

`RoleMappingPayload`[]

#### Defined in

util/keycloak-seeder-tools.ts:96

---

### updateKeycloakEntities

▸ **updateKeycloakEntities**<`T`, `K`\>(`context`, `input`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type                                              |
| :--- | :------------------------------------------------ |
| `T`  | extends `"groups"` \| `"clients"` \| `"realms"`   |
| `K`  | extends `default`[] \| `default`[] \| `default`[] |

#### Parameters

| Name                  | Type                                                                                                                                      |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `context`             | `T`                                                                                                                                       |
| `input`               | `K`                                                                                                                                       |
| `options?`            | `Object`                                                                                                                                  |
| `options.identifier?` | keyof [`ArrayElement`](../README.md#arrayelement)<[`Await`](../README.md#await)<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\> |
| `options.realm?`      | `string`                                                                                                                                  |
| `options.silent?`     | `boolean`                                                                                                                                 |

#### Returns

`Promise`<`void`\>

#### Defined in

util/keycloak-seeder-tools.ts:192
