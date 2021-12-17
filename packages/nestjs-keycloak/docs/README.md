@webundsoehne/nestjs-keycloak

# @webundsoehne/nestjs-keycloak

## Table of contents

### Enumerations

- [ExceptionMessagesFallback](enums/ExceptionMessagesFallback.md)

### Classes

- [BaseAuthGuard](classes/BaseAuthGuard.md)
- [KeycloakAdminModule](classes/KeycloakAdminModule.md)
- [KeycloakAdminSeederTools](classes/KeycloakAdminSeederTools.md)
- [KeycloakAdminService](classes/KeycloakAdminService.md)
- [KeycloakConnectModule](classes/KeycloakConnectModule.md)

### Interfaces

- [ExceptionMessagesOption](interfaces/ExceptionMessagesOption.md)
- [KeycloakConnectOptions](interfaces/KeycloakConnectOptions.md)
- [KeycloakConnectUser](interfaces/KeycloakConnectUser.md)

### Type aliases

- [ArrayElement](README.md#arrayelement)
- [Await](README.md#await)
- [DeepPartial](README.md#deeppartial)
- [EnrichedExpressRequest](README.md#enrichedexpressrequest)
- [EnrichedFastifyRequest](README.md#enrichedfastifyrequest)
- [EnrichedRequest](README.md#enrichedrequest)
- [InferedObjectType](README.md#inferedobjecttype)
- [KeycloakConnectUserInfo](README.md#keycloakconnectuserinfo)
- [RolesOption](README.md#rolesoption)
- [ScopesOption](README.md#scopesoption)
- [ValueOf](README.md#valueof)

### Variables

- [KEYCLOAK_ADMIN_INSTANCE](README.md#keycloak_admin_instance)
- [KEYCLOAK_ADMIN_OPTIONS](README.md#keycloak_admin_options)
- [KEYCLOAK_CONNECT_INSTANCE](README.md#keycloak_connect_instance)
- [KEYCLOAK_CONNECT_METADATA_GROUPS](README.md#keycloak_connect_metadata_groups)
- [KEYCLOAK_CONNECT_METADATA_PROTECTED](README.md#keycloak_connect_metadata_protected)
- [KEYCLOAK_CONNECT_METADATA_ROLES](README.md#keycloak_connect_metadata_roles)
- [KEYCLOAK_CONNECT_METADATA_SCOPES](README.md#keycloak_connect_metadata_scopes)
- [KEYCLOAK_CONNECT_METADATA_UNPROTECTED](README.md#keycloak_connect_metadata_unprotected)
- [KEYCLOAK_CONNECT_METADATA_USER](README.md#keycloak_connect_metadata_user)
- [KEYCLOAK_CONNECT_OPTIONS](README.md#keycloak_connect_options)

### Functions

- [InjectKeycloak](README.md#injectkeycloak)
- [Private](README.md#private)
- [Protected](README.md#protected)
- [Public](README.md#public)
- [Roles](README.md#roles)
- [Scopes](README.md#scopes)
- [Token](README.md#token)
- [Unprotected](README.md#unprotected)
- [deepMerge](README.md#deepmerge)
- [deepMergeWithArrayOverwrite](README.md#deepmergewitharrayoverwrite)
- [deepMergeWithUniqueMergeArray](README.md#deepmergewithuniquemergearray)
- [filterMatchingPropertyFromData](README.md#filtermatchingpropertyfromdata)
- [getMatchingPropertyFromData](README.md#getmatchingpropertyfromdata)
- [uniqueArrayFilter](README.md#uniquearrayfilter)

## Type aliases

### ArrayElement

Ƭ **ArrayElement**<`ArrayType`\>: `ArrayType` extends readonly infer ElementType[] ? `ElementType` : `never`

#### Type parameters

| Name        | Type                         |
| :---------- | :--------------------------- |
| `ArrayType` | extends readonly `unknown`[] |

#### Defined in

interface/helper-types.interface.ts:3

---

### Await

Ƭ **Await**<`T`\>: `T` extends `PromiseLike`<infer U\> ? `U` : `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

interface/helper-types.interface.ts:1

---

### DeepPartial

Ƭ **DeepPartial**<`T`\>: { [P in keyof T]?: DeepPartial<T[P]\> }

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

interface/helper-types.interface.ts:14

---

### EnrichedExpressRequest

Ƭ **EnrichedExpressRequest**: `RequestWithAuthentication` & `Request`

#### Defined in

interface/request.interface.ts:11

---

### EnrichedFastifyRequest

Ƭ **EnrichedFastifyRequest**: `RequestWithAuthentication` & `FastifyRequest`

#### Defined in

interface/request.interface.ts:12

---

### EnrichedRequest

Ƭ **EnrichedRequest**: [`EnrichedExpressRequest`](README.md#enrichedexpressrequest) \| [`EnrichedFastifyRequest`](README.md#enrichedfastifyrequest)

#### Defined in

interface/request.interface.ts:14

---

### InferedObjectType

Ƭ **InferedObjectType**<`T`, `K`\>: [`ArrayElement`](README.md#arrayelement)<`T`\>[`K`] extends infer ObjectProperty ? `ObjectProperty` : `never`

#### Type parameters

| Name | Type                                                         |
| :--- | :----------------------------------------------------------- |
| `T`  | extends `Record`<`string`, `any`\>[]                         |
| `K`  | extends keyof [`ArrayElement`](README.md#arrayelement)<`T`\> |

#### Defined in

interface/helper-types.interface.ts:7

---

### KeycloakConnectUserInfo

Ƭ **KeycloakConnectUserInfo**: `Record`<`string`, `string` \| `number` \| `boolean` \| `null`\>

#### Defined in

connect/connect.interfaces.ts:36

---

### RolesOption

Ƭ **RolesOption**: `Record`<`string`, `string`\>

#### Defined in

connect/connect.interfaces.ts:23

---

### ScopesOption

Ƭ **ScopesOption**: `Record`<`string`, `string`\>

#### Defined in

connect/connect.interfaces.ts:25

---

### ValueOf

Ƭ **ValueOf**<`T`\>: `T`[keyof `T`]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

interface/helper-types.interface.ts:12

## Variables

### KEYCLOAK_ADMIN_INSTANCE

• **KEYCLOAK_ADMIN_INSTANCE**: typeof [`KEYCLOAK_ADMIN_INSTANCE`](README.md#keycloak_admin_instance)

#### Defined in

admin/admin.constants.ts:2

---

### KEYCLOAK_ADMIN_OPTIONS

• **KEYCLOAK_ADMIN_OPTIONS**: typeof [`KEYCLOAK_ADMIN_OPTIONS`](README.md#keycloak_admin_options)

#### Defined in

admin/admin.constants.ts:1

---

### KEYCLOAK_CONNECT_INSTANCE

• **KEYCLOAK_CONNECT_INSTANCE**: typeof [`KEYCLOAK_CONNECT_INSTANCE`](README.md#keycloak_connect_instance)

#### Defined in

connect/connect.constants.ts:2

---

### KEYCLOAK_CONNECT_METADATA_GROUPS

• **KEYCLOAK_CONNECT_METADATA_GROUPS**: typeof [`KEYCLOAK_CONNECT_METADATA_GROUPS`](README.md#keycloak_connect_metadata_groups)

#### Defined in

connect/connect.constants.ts:6

---

### KEYCLOAK_CONNECT_METADATA_PROTECTED

• **KEYCLOAK_CONNECT_METADATA_PROTECTED**: typeof [`KEYCLOAK_CONNECT_METADATA_PROTECTED`](README.md#keycloak_connect_metadata_protected)

#### Defined in

connect/connect.constants.ts:5

---

### KEYCLOAK_CONNECT_METADATA_ROLES

• **KEYCLOAK_CONNECT_METADATA_ROLES**: typeof [`KEYCLOAK_CONNECT_METADATA_ROLES`](README.md#keycloak_connect_metadata_roles)

#### Defined in

connect/connect.constants.ts:7

---

### KEYCLOAK_CONNECT_METADATA_SCOPES

• **KEYCLOAK_CONNECT_METADATA_SCOPES**: typeof [`KEYCLOAK_CONNECT_METADATA_SCOPES`](README.md#keycloak_connect_metadata_scopes)

#### Defined in

connect/connect.constants.ts:8

---

### KEYCLOAK_CONNECT_METADATA_UNPROTECTED

• **KEYCLOAK_CONNECT_METADATA_UNPROTECTED**: typeof [`KEYCLOAK_CONNECT_METADATA_UNPROTECTED`](README.md#keycloak_connect_metadata_unprotected)

#### Defined in

connect/connect.constants.ts:4

---

### KEYCLOAK_CONNECT_METADATA_USER

• **KEYCLOAK_CONNECT_METADATA_USER**: typeof [`KEYCLOAK_CONNECT_METADATA_USER`](README.md#keycloak_connect_metadata_user)

#### Defined in

connect/connect.constants.ts:9

---

### KEYCLOAK_CONNECT_OPTIONS

• **KEYCLOAK_CONNECT_OPTIONS**: typeof [`KEYCLOAK_CONNECT_OPTIONS`](README.md#keycloak_connect_options)

#### Defined in

connect/connect.constants.ts:1

## Functions

### InjectKeycloak

▸ **InjectKeycloak**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok admin instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Injects Keyclaok admin instance initiated to the service.

##### Parameters

| Name     | Type                           |
| :------- | :----------------------------- |
| `target` | `Record`<`string`, `unknown`\> |
| `key`    | `string` \| `symbol`           |
| `index?` | `number`                       |

##### Returns

`void`

#### Defined in

admin/decorators/inject.decorator.ts:8

---

### Private

▸ `Const` **Private**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`alias`** Protected

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/protected.decorator.ts:15

---

### Protected

▸ `Const` **Protected**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`alias`** Private

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/protected.decorator.ts:9

---

### Public

▸ `Const` **Public**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`alias`** Unprotected

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/unprotected.decorator.ts:15

---

### Roles

▸ `Const` **Roles**(...`roles`): `CustomDecorator`<`symbol`\>

Inject current Keycloak users roles in to a variable.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `...roles` | `string`[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/roles.decorator.ts:8

---

### Scopes

▸ `Const` **Scopes**(...`list`): `CustomDecorator`<`symbol`\>

Inject current Keycloak user client scopes in to a variable.

#### Parameters

| Name      | Type                                       |
| :-------- | :----------------------------------------- |
| `...list` | [`ScopesOption`](README.md#scopesoption)[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/scopes.decorator.ts:9

---

### Token

▸ `Const` **Token**(...`dataOrPipes`): `ParameterDecorator`

#### Parameters

| Name             | Type                                                                          |
| :--------------- | :---------------------------------------------------------------------------- |
| `...dataOrPipes` | (`PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

connect/decorators/token.decorator.ts:7

---

### Unprotected

▸ `Const` **Unprotected**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`alias`** Public

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/unprotected.decorator.ts:9

---

### deepMerge

▸ **deepMerge**<`T`\>(`t`, ...`s`): `T`

Merge objects with defaults.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

util/merge.ts:12

---

### deepMergeWithArrayOverwrite

▸ **deepMergeWithArrayOverwrite**<`T`\>(`t`, ...`s`): `T`

Merge objects with overwriting the target array with source array.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

util/merge.ts:40

---

### deepMergeWithUniqueMergeArray

▸ **deepMergeWithUniqueMergeArray**<`T`\>(`t`, ...`s`): `T`

Merge objects with array merge and filtering them uniquely.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

util/merge.ts:25

---

### filterMatchingPropertyFromData

▸ **filterMatchingPropertyFromData**<`T`, `K`, `P`\>(`data`, `compare`, `values`, `fetch`): [`InferedObjectType`](README.md#inferedobjecttype)<`T`, `P`\>[]

#### Type parameters

| Name | Type                                      |
| :--- | :---------------------------------------- |
| `T`  | extends `Record`<`PropertyKey`, `any`\>[] |
| `K`  | extends `string` \| `number` \| `symbol`  |
| `P`  | extends `string` \| `number` \| `symbol`  |

#### Parameters

| Name      | Type                                                            |
| :-------- | :-------------------------------------------------------------- |
| `data`    | `T`                                                             |
| `compare` | `K`                                                             |
| `values`  | [`InferedObjectType`](README.md#inferedobjecttype)<`T`, `K`\>[] |
| `fetch`   | `P`                                                             |

#### Returns

[`InferedObjectType`](README.md#inferedobjecttype)<`T`, `P`\>[]

#### Defined in

util/keycloak-filter.ts:17

---

### getMatchingPropertyFromData

▸ **getMatchingPropertyFromData**<`T`, `K`, `P`\>(`data`, `compare`, `value`, `fetch`): [`InferedObjectType`](README.md#inferedobjecttype)<`T`, `P`\>

#### Type parameters

| Name | Type                                      |
| :--- | :---------------------------------------- |
| `T`  | extends `Record`<`PropertyKey`, `any`\>[] |
| `K`  | extends `string` \| `number` \| `symbol`  |
| `P`  | extends `string` \| `number` \| `symbol`  |

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `data`    | `T`                                                           |
| `compare` | `K`                                                           |
| `value`   | [`InferedObjectType`](README.md#inferedobjecttype)<`T`, `K`\> |
| `fetch`   | `P`                                                           |

#### Returns

[`InferedObjectType`](README.md#inferedobjecttype)<`T`, `P`\>

#### Defined in

util/keycloak-filter.ts:3

---

### uniqueArrayFilter

▸ `Const` **uniqueArrayFilter**(`item`, `index`, `array`): `boolean`

A standard array filter for filtering it to unique items.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `item`  | `any`    |
| `index` | `number` |
| `array` | `any`[]  |

#### Returns

`boolean`

#### Defined in

util/merge.ts:51
