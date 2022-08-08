[@webundsoehne/nestjs-keycloak](../README.md) / index

# Module: index

## Table of contents

### Enumerations

- [ExceptionMessagesFallback](../enums/index.ExceptionMessagesFallback.md)

### Classes

- [BaseAuthGuard](../classes/index.BaseAuthGuard.md)
- [KeycloakAdminModule](../classes/index.KeycloakAdminModule.md)
- [KeycloakAdminService](../classes/index.KeycloakAdminService.md)
- [KeycloakConnectModule](../classes/index.KeycloakConnectModule.md)

### Interfaces

- [ExceptionMessagesOption](../interfaces/index.ExceptionMessagesOption.md)
- [KeycloakAdminOptions](../interfaces/index.KeycloakAdminOptions.md)
- [KeycloakConnectOptions](../interfaces/index.KeycloakConnectOptions.md)
- [KeycloakConnectUser](../interfaces/index.KeycloakConnectUser.md)

### Type Aliases

- [EnrichedExpressRequest](index.md#enrichedexpressrequest)
- [EnrichedFastifyRequest](index.md#enrichedfastifyrequest)
- [EnrichedRequest](index.md#enrichedrequest)
- [KeycloakConnectUserInfo](index.md#keycloakconnectuserinfo)
- [RolesOption](index.md#rolesoption)
- [ScopesOption](index.md#scopesoption)

### Variables

- [KEYCLOAK\_ADMIN\_INSTANCE](index.md#keycloak_admin_instance)
- [KEYCLOAK\_ADMIN\_OPTIONS](index.md#keycloak_admin_options)
- [KEYCLOAK\_CONNECT\_INSTANCE](index.md#keycloak_connect_instance)
- [KEYCLOAK\_CONNECT\_METADATA\_GROUPS](index.md#keycloak_connect_metadata_groups)
- [KEYCLOAK\_CONNECT\_METADATA\_PROTECTED](index.md#keycloak_connect_metadata_protected)
- [KEYCLOAK\_CONNECT\_METADATA\_ROLES](index.md#keycloak_connect_metadata_roles)
- [KEYCLOAK\_CONNECT\_METADATA\_SCOPES](index.md#keycloak_connect_metadata_scopes)
- [KEYCLOAK\_CONNECT\_METADATA\_UNPROTECTED](index.md#keycloak_connect_metadata_unprotected)
- [KEYCLOAK\_CONNECT\_METADATA\_USER](index.md#keycloak_connect_metadata_user)
- [KEYCLOAK\_CONNECT\_OPTIONS](index.md#keycloak_connect_options)

### Functions

- [InjectKeycloak](index.md#injectkeycloak)
- [InjectKeycloakConnect](index.md#injectkeycloakconnect)
- [InjectKeycloakConnectOptions](index.md#injectkeycloakconnectoptions)
- [KeycloakPrivate](index.md#keycloakprivate)
- [KeycloakProtected](index.md#keycloakprotected)
- [KeycloakPublic](index.md#keycloakpublic)
- [KeycloakRoles](index.md#keycloakroles)
- [KeycloakScopes](index.md#keycloakscopes)
- [KeycloakUnprotected](index.md#keycloakunprotected)
- [Private](index.md#private)
- [Protected](index.md#protected)
- [Public](index.md#public)
- [Roles](index.md#roles)
- [Scopes](index.md#scopes)
- [Unprotected](index.md#unprotected)

## Type Aliases

### EnrichedExpressRequest

Ƭ **EnrichedExpressRequest**: `RequestWithAuthentication` & `Request`

#### Defined in

packages/nestjs-keycloak/src/interfaces/request.interface.ts:11

___

### EnrichedFastifyRequest

Ƭ **EnrichedFastifyRequest**: `RequestWithAuthentication` & `FastifyRequest`

#### Defined in

packages/nestjs-keycloak/src/interfaces/request.interface.ts:12

___

### EnrichedRequest

Ƭ **EnrichedRequest**: [`EnrichedExpressRequest`](index.md#enrichedexpressrequest) \| [`EnrichedFastifyRequest`](index.md#enrichedfastifyrequest)

#### Defined in

packages/nestjs-keycloak/src/interfaces/request.interface.ts:14

___

### KeycloakConnectUserInfo

Ƭ **KeycloakConnectUserInfo**: `Record`<`string`, `string` \| `number` \| `boolean` \| ``null``\>

#### Defined in

packages/nestjs-keycloak/src/connect/connect.interfaces.ts:36

___

### RolesOption

Ƭ **RolesOption**: `Record`<`string`, `string`\>

#### Defined in

packages/nestjs-keycloak/src/connect/connect.interfaces.ts:23

___

### ScopesOption

Ƭ **ScopesOption**: `Record`<`string`, `string`\>

#### Defined in

packages/nestjs-keycloak/src/connect/connect.interfaces.ts:25

## Variables

### KEYCLOAK\_ADMIN\_INSTANCE

• `Const` **KEYCLOAK\_ADMIN\_INSTANCE**: typeof [`KEYCLOAK_ADMIN_INSTANCE`](index.md#keycloak_admin_instance)

#### Defined in

packages/nestjs-keycloak/src/admin/admin.constants.ts:2

___

### KEYCLOAK\_ADMIN\_OPTIONS

• `Const` **KEYCLOAK\_ADMIN\_OPTIONS**: typeof [`KEYCLOAK_ADMIN_OPTIONS`](index.md#keycloak_admin_options)

#### Defined in

packages/nestjs-keycloak/src/admin/admin.constants.ts:1

___

### KEYCLOAK\_CONNECT\_INSTANCE

• `Const` **KEYCLOAK\_CONNECT\_INSTANCE**: typeof [`KEYCLOAK_CONNECT_INSTANCE`](index.md#keycloak_connect_instance)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:2

___

### KEYCLOAK\_CONNECT\_METADATA\_GROUPS

• `Const` **KEYCLOAK\_CONNECT\_METADATA\_GROUPS**: typeof [`KEYCLOAK_CONNECT_METADATA_GROUPS`](index.md#keycloak_connect_metadata_groups)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:6

___

### KEYCLOAK\_CONNECT\_METADATA\_PROTECTED

• `Const` **KEYCLOAK\_CONNECT\_METADATA\_PROTECTED**: typeof [`KEYCLOAK_CONNECT_METADATA_PROTECTED`](index.md#keycloak_connect_metadata_protected)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:5

___

### KEYCLOAK\_CONNECT\_METADATA\_ROLES

• `Const` **KEYCLOAK\_CONNECT\_METADATA\_ROLES**: typeof [`KEYCLOAK_CONNECT_METADATA_ROLES`](index.md#keycloak_connect_metadata_roles)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:7

___

### KEYCLOAK\_CONNECT\_METADATA\_SCOPES

• `Const` **KEYCLOAK\_CONNECT\_METADATA\_SCOPES**: typeof [`KEYCLOAK_CONNECT_METADATA_SCOPES`](index.md#keycloak_connect_metadata_scopes)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:8

___

### KEYCLOAK\_CONNECT\_METADATA\_UNPROTECTED

• `Const` **KEYCLOAK\_CONNECT\_METADATA\_UNPROTECTED**: typeof [`KEYCLOAK_CONNECT_METADATA_UNPROTECTED`](index.md#keycloak_connect_metadata_unprotected)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:4

___

### KEYCLOAK\_CONNECT\_METADATA\_USER

• `Const` **KEYCLOAK\_CONNECT\_METADATA\_USER**: typeof [`KEYCLOAK_CONNECT_METADATA_USER`](index.md#keycloak_connect_metadata_user)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:9

___

### KEYCLOAK\_CONNECT\_OPTIONS

• `Const` **KEYCLOAK\_CONNECT\_OPTIONS**: typeof [`KEYCLOAK_CONNECT_OPTIONS`](index.md#keycloak_connect_options)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:1

## Functions

### InjectKeycloak

▸ **InjectKeycloak**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok admin instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

packages/nestjs-keycloak/src/admin/decorators/inject.decorator.ts:8

___

### InjectKeycloakConnect

▸ **InjectKeycloakConnect**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok connect instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/inject.decorator.ts:8

___

### InjectKeycloakConnectOptions

▸ **InjectKeycloakConnectOptions**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok connect instance options initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/inject.decorator.ts:15

___

### KeycloakPrivate

▸ **KeycloakPrivate**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`Alias`**

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/protected.decorator.ts:10

___

### KeycloakProtected

▸ **KeycloakProtected**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`Alias`**

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/protected.decorator.ts:10

___

### KeycloakPublic

▸ **KeycloakPublic**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`Alias`**

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/unprotected.decorator.ts:10

___

### KeycloakRoles

▸ **KeycloakRoles**(...`roles`): `CustomDecorator`<`symbol`\>

Inject current Keycloak users roles in to a variable.

**`Alias`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `...roles` | `string`[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/roles.decorator.ts:10

___

### KeycloakScopes

▸ **KeycloakScopes**(...`list`): `CustomDecorator`<`symbol`\>

Inject current Keycloak user client scopes in to a variable.

**`Alias`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `...list` | [`ScopesOption`](index.md#scopesoption)[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/scopes.decorator.ts:11

___

### KeycloakUnprotected

▸ **KeycloakUnprotected**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`Alias`**

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/unprotected.decorator.ts:10

___

### Private

▸ **Private**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`Alias`**

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/protected.decorator.ts:10

___

### Protected

▸ **Protected**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`Alias`**

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/protected.decorator.ts:10

___

### Public

▸ **Public**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`Alias`**

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/unprotected.decorator.ts:10

___

### Roles

▸ **Roles**(...`roles`): `CustomDecorator`<`symbol`\>

Inject current Keycloak users roles in to a variable.

**`Alias`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `...roles` | `string`[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/roles.decorator.ts:10

___

### Scopes

▸ **Scopes**(...`list`): `CustomDecorator`<`symbol`\>

Inject current Keycloak user client scopes in to a variable.

**`Alias`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `...list` | [`ScopesOption`](index.md#scopesoption)[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/scopes.decorator.ts:11

___

### Unprotected

▸ **Unprotected**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`Alias`**

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/unprotected.decorator.ts:10
