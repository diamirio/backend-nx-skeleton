@webundsoehne/nestjs-keycloak-seeder

# @webundsoehne/nestjs-keycloak-seeder

## Table of contents

### Classes

- [KeycloakAdminSeederTools](classes/KeycloakAdminSeederTools.md)
- [KeycloakSeed](classes/KeycloakSeed.md)
- [KeycloakSeederModule](classes/KeycloakSeederModule.md)
- [KeycloakSeederService](classes/KeycloakSeederService.md)

### Variables

- [KEYCLOAK\_SEEDER\_SEEDS](README.md#keycloak_seeder_seeds)

### Functions

- [InjectKeycloakSeederService](README.md#injectkeycloakseederservice)
- [filterMatchingPropertyFromData](README.md#filtermatchingpropertyfromdata)
- [getMatchingPropertyFromData](README.md#getmatchingpropertyfromdata)

## Variables

### KEYCLOAK\_SEEDER\_SEEDS

• `Const` **KEYCLOAK\_SEEDER\_SEEDS**: typeof [`KEYCLOAK_SEEDER_SEEDS`](README.md#keycloak_seeder_seeds)

#### Defined in

constants/injection.constants.ts:1

## Functions

### InjectKeycloakSeederService

▸ **InjectKeycloakSeederService**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok admin instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Injects Keyclaok admin instance initiated to the service.

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

module/decorators/inject.decorator.ts:8

___

### filterMatchingPropertyFromData

▸ **filterMatchingPropertyFromData**<`T`, `K`, `P`\>(`data`, `compare`, `values`, `fetch`): `InferedObjectType`<`T`, `P`\>[]

Returns the matched data.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`PropertyKey`, `any`\>[] |
| `K` | extends `string` \| `number` \| `symbol` |
| `P` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `compare` | `K` |
| `values` | `InferedObjectType`<`T`, `K`\>[] |
| `fetch` | `P` |

#### Returns

`InferedObjectType`<`T`, `P`\>[]

#### Defined in

utils/keycloak-filter.ts:24

___

### getMatchingPropertyFromData

▸ **getMatchingPropertyFromData**<`T`, `K`, `P`\>(`data`, `compare`, `value`, `fetch`): `InferedObjectType`<`T`, `P`\>

Matchs a data and returns another property of the object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`PropertyKey`, `any`\>[] |
| `K` | extends `string` \| `number` \| `symbol` |
| `P` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `compare` | `K` |
| `value` | `InferedObjectType`<`T`, `K`\> |
| `fetch` | `P` |

#### Returns

`InferedObjectType`<`T`, `P`\>

#### Defined in

utils/keycloak-filter.ts:6
