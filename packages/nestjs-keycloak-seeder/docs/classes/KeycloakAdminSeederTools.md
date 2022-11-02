[@webundsoehne/nestjs-keycloak-seeder](../README.md) / KeycloakAdminSeederTools

# Class: KeycloakAdminSeederTools

Extended Keycloak client specific for seeding operations.

## Table of contents

### Constructors

- [constructor](KeycloakAdminSeederTools.md#constructor)

### Properties

- [client](KeycloakAdminSeederTools.md#client)
- [clients](KeycloakAdminSeederTools.md#clients)
- [keycloak](KeycloakAdminSeederTools.md#keycloak)
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

| Name       | Type                   |
| :--------- | :--------------------- |
| `keycloak` | `KeycloakAdminService` |

#### Defined in

utils/keycloak-seeder-tools.ts:21

## Properties

### client

• **client**: `KeycloakAdminClient`

#### Defined in

utils/keycloak-seeder-tools.ts:18

---

### clients

• **clients**: `Record`<`string`, `KeycloakAdminClient`\> = `{}`

#### Defined in

utils/keycloak-seeder-tools.ts:19

---

### keycloak

• `Private` **keycloak**: `KeycloakAdminService`

#### Defined in

utils/keycloak-seeder-tools.ts:21

---

### logger

• **logger**: `Logger`

#### Defined in

utils/keycloak-seeder-tools.ts:17

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

utils/keycloak-seeder-tools.ts:302

---

### createClient

▸ **createClient**(`realm`, `options?`): `Promise`<`KeycloakAdminClient`\>

#### Parameters

| Name       | Type                                   |
| :--------- | :------------------------------------- |
| `realm`    | `string`                               |
| `options?` | `DeepPartial`<`KeycloakAdminOptions`\> |

#### Returns

`Promise`<`KeycloakAdminClient`\>

#### Defined in

utils/keycloak-seeder-tools.ts:39

---

### createNewKeycloakEntities

▸ **createNewKeycloakEntities**<`T`, `K`\>(`context`, `input`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type                                                             |
| :--- | :--------------------------------------------------------------- |
| `T`  | extends `"roles"` \| `"groups"` \| `"clients"` \| `"realms"`     |
| `K`  | extends `default`[] \| `default`[] \| `default`[] \| `default`[] |

#### Parameters

| Name                        | Type                                                                                   |
| :-------------------------- | :------------------------------------------------------------------------------------- |
| `context`                   | `T`                                                                                    |
| `input`                     | `Await`<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>                        |
| `options?`                  | `Object`                                                                               |
| `options.fallbackToUpdate?` | `boolean`                                                                              |
| `options.flush?`            | `boolean`                                                                              |
| `options.flushUnknown?`     | `boolean`                                                                              |
| `options.identifier?`       | keyof `ArrayElement`<`Await`<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\> |
| `options.realm?`            | `string`                                                                               |

#### Returns

`Promise`<`void`\>

#### Defined in

utils/keycloak-seeder-tools.ts:124

---

### flushKeycloakEntities

▸ **flushKeycloakEntities**<`T`, `K`\>(`context`, `input`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type                                                             |
| :--- | :--------------------------------------------------------------- |
| `T`  | extends `"roles"` \| `"groups"` \| `"clients"` \| `"realms"`     |
| `K`  | extends `default`[] \| `default`[] \| `default`[] \| `default`[] |

#### Parameters

| Name                  | Type                                                            |
| :-------------------- | :-------------------------------------------------------------- |
| `context`             | `T`                                                             |
| `input`               | `Await`<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\> |
| `options?`            | `Object`                                                        |
| `options.identifier?` | keyof `ArrayElement`<`K`\>                                      |
| `options.realm?`      | `string`                                                        |

#### Returns

`Promise`<`void`\>

#### Defined in

utils/keycloak-seeder-tools.ts:247

---

### getAll

▸ **getAll**<`K`, `T`\>(`context`, `options?`): `Promise`<`Record`<`K`, `Await`<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\>\>

#### Type parameters

| Name | Type                                                                                                                |
| :--- | :------------------------------------------------------------------------------------------------------------------ |
| `K`  | extends `PropertyKey`                                                                                               |
| `T`  | extends `"roles"` \| `"groups"` \| `"clients"` \| `"realms"` = `"roles"` \| `"groups"` \| `"clients"` \| `"realms"` |

#### Parameters

| Name               | Type                                                                                   |
| :----------------- | :------------------------------------------------------------------------------------- |
| `context`          | `T`                                                                                    |
| `options?`         | `Object`                                                                               |
| `options.groupBy?` | keyof `ArrayElement`<`Await`<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\> |
| `options.realm?`   | `string`                                                                               |

#### Returns

`Promise`<`Record`<`K`, `Await`<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\>\>

#### Defined in

utils/keycloak-seeder-tools.ts:58

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

utils/keycloak-seeder-tools.ts:23

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

utils/keycloak-seeder-tools.ts:111

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

utils/keycloak-seeder-tools.ts:385

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

utils/keycloak-seeder-tools.ts:367

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

utils/keycloak-seeder-tools.ts:86

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

utils/keycloak-seeder-tools.ts:100

---

### updateKeycloakEntities

▸ **updateKeycloakEntities**<`T`, `K`\>(`context`, `input`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type                                              |
| :--- | :------------------------------------------------ |
| `T`  | extends `"groups"` \| `"clients"` \| `"realms"`   |
| `K`  | extends `default`[] \| `default`[] \| `default`[] |

#### Parameters

| Name                  | Type                                                                                   |
| :-------------------- | :------------------------------------------------------------------------------------- |
| `context`             | `T`                                                                                    |
| `input`               | `K`                                                                                    |
| `options?`            | `Object`                                                                               |
| `options.identifier?` | keyof `ArrayElement`<`Await`<`ReturnType`<`KeycloakAdminClient`[`T`][``"find"``]\>\>\> |
| `options.realm?`      | `string`                                                                               |
| `options.silent?`     | `boolean`                                                                              |

#### Returns

`Promise`<`void`\>

#### Defined in

utils/keycloak-seeder-tools.ts:196
