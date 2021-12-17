@webundsoehne/nestjs-keycloak

# @webundsoehne/nestjs-keycloak

## Table of contents

### Enumerations

- [ExceptionMessagesFallback](enums/ExceptionMessagesFallback.md)

### Classes

- [BaseAuthGuard](classes/BaseAuthGuard.md)
- [KeycloakAdminModule](classes/KeycloakAdminModule.md)
- [KeycloakAdminService](classes/KeycloakAdminService.md)
- [KeycloakConnectModule](classes/KeycloakConnectModule.md)

### Interfaces

- [ExceptionMessagesOption](interfaces/ExceptionMessagesOption.md)
- [KeycloakAdminOptions](interfaces/KeycloakAdminOptions.md)
- [KeycloakConnectOptions](interfaces/KeycloakConnectOptions.md)
- [KeycloakConnectUser](interfaces/KeycloakConnectUser.md)

### Type aliases

- [EnrichedExpressRequest](README.md#enrichedexpressrequest)
- [EnrichedFastifyRequest](README.md#enrichedfastifyrequest)
- [EnrichedRequest](README.md#enrichedrequest)
- [KeycloakConnectUserInfo](README.md#keycloakconnectuserinfo)
- [RolesOption](README.md#rolesoption)
- [ScopesOption](README.md#scopesoption)

### Variables

- [KEYCLOAK\_ADMIN\_INSTANCE](README.md#keycloak_admin_instance)
- [KEYCLOAK\_ADMIN\_OPTIONS](README.md#keycloak_admin_options)
- [KEYCLOAK\_CONNECT\_INSTANCE](README.md#keycloak_connect_instance)
- [KEYCLOAK\_CONNECT\_METADATA\_GROUPS](README.md#keycloak_connect_metadata_groups)
- [KEYCLOAK\_CONNECT\_METADATA\_PROTECTED](README.md#keycloak_connect_metadata_protected)
- [KEYCLOAK\_CONNECT\_METADATA\_ROLES](README.md#keycloak_connect_metadata_roles)
- [KEYCLOAK\_CONNECT\_METADATA\_SCOPES](README.md#keycloak_connect_metadata_scopes)
- [KEYCLOAK\_CONNECT\_METADATA\_UNPROTECTED](README.md#keycloak_connect_metadata_unprotected)
- [KEYCLOAK\_CONNECT\_METADATA\_USER](README.md#keycloak_connect_metadata_user)
- [KEYCLOAK\_CONNECT\_OPTIONS](README.md#keycloak_connect_options)

### Functions

- [InjectKeycloak](README.md#injectkeycloak)
- [InjectKeycloakConnect](README.md#injectkeycloakconnect)
- [InjectKeycloakConnectOptions](README.md#injectkeycloakconnectoptions)
- [Private](README.md#private)
- [Protected](README.md#protected)
- [Public](README.md#public)
- [Roles](README.md#roles)
- [Scopes](README.md#scopes)
- [Token](README.md#token)
- [Unprotected](README.md#unprotected)

## Type aliases

### EnrichedExpressRequest

Ƭ **EnrichedExpressRequest**: `RequestWithAuthentication` & `Request`

#### Defined in

interfaces/request.interface.ts:11

___

### EnrichedFastifyRequest

Ƭ **EnrichedFastifyRequest**: `RequestWithAuthentication` & `FastifyRequest`

#### Defined in

interfaces/request.interface.ts:12

___

### EnrichedRequest

Ƭ **EnrichedRequest**: [`EnrichedExpressRequest`](README.md#enrichedexpressrequest) \| [`EnrichedFastifyRequest`](README.md#enrichedfastifyrequest)

#### Defined in

interfaces/request.interface.ts:14

___

### KeycloakConnectUserInfo

Ƭ **KeycloakConnectUserInfo**: `Record`<`string`, `string` \| `number` \| `boolean` \| ``null``\>

#### Defined in

connect/connect.interfaces.ts:36

___

### RolesOption

Ƭ **RolesOption**: `Record`<`string`, `string`\>

#### Defined in

connect/connect.interfaces.ts:23

___

### ScopesOption

Ƭ **ScopesOption**: `Record`<`string`, `string`\>

#### Defined in

connect/connect.interfaces.ts:25

## Variables

### KEYCLOAK\_ADMIN\_INSTANCE

• **KEYCLOAK\_ADMIN\_INSTANCE**: typeof [`KEYCLOAK_ADMIN_INSTANCE`](README.md#keycloak_admin_instance)

#### Defined in

admin/admin.constants.ts:2

___

### KEYCLOAK\_ADMIN\_OPTIONS

• **KEYCLOAK\_ADMIN\_OPTIONS**: typeof [`KEYCLOAK_ADMIN_OPTIONS`](README.md#keycloak_admin_options)

#### Defined in

admin/admin.constants.ts:1

___

### KEYCLOAK\_CONNECT\_INSTANCE

• **KEYCLOAK\_CONNECT\_INSTANCE**: typeof [`KEYCLOAK_CONNECT_INSTANCE`](README.md#keycloak_connect_instance)

#### Defined in

connect/connect.constants.ts:2

___

### KEYCLOAK\_CONNECT\_METADATA\_GROUPS

• **KEYCLOAK\_CONNECT\_METADATA\_GROUPS**: typeof [`KEYCLOAK_CONNECT_METADATA_GROUPS`](README.md#keycloak_connect_metadata_groups)

#### Defined in

connect/connect.constants.ts:6

___

### KEYCLOAK\_CONNECT\_METADATA\_PROTECTED

• **KEYCLOAK\_CONNECT\_METADATA\_PROTECTED**: typeof [`KEYCLOAK_CONNECT_METADATA_PROTECTED`](README.md#keycloak_connect_metadata_protected)

#### Defined in

connect/connect.constants.ts:5

___

### KEYCLOAK\_CONNECT\_METADATA\_ROLES

• **KEYCLOAK\_CONNECT\_METADATA\_ROLES**: typeof [`KEYCLOAK_CONNECT_METADATA_ROLES`](README.md#keycloak_connect_metadata_roles)

#### Defined in

connect/connect.constants.ts:7

___

### KEYCLOAK\_CONNECT\_METADATA\_SCOPES

• **KEYCLOAK\_CONNECT\_METADATA\_SCOPES**: typeof [`KEYCLOAK_CONNECT_METADATA_SCOPES`](README.md#keycloak_connect_metadata_scopes)

#### Defined in

connect/connect.constants.ts:8

___

### KEYCLOAK\_CONNECT\_METADATA\_UNPROTECTED

• **KEYCLOAK\_CONNECT\_METADATA\_UNPROTECTED**: typeof [`KEYCLOAK_CONNECT_METADATA_UNPROTECTED`](README.md#keycloak_connect_metadata_unprotected)

#### Defined in

connect/connect.constants.ts:4

___

### KEYCLOAK\_CONNECT\_METADATA\_USER

• **KEYCLOAK\_CONNECT\_METADATA\_USER**: typeof [`KEYCLOAK_CONNECT_METADATA_USER`](README.md#keycloak_connect_metadata_user)

#### Defined in

connect/connect.constants.ts:9

___

### KEYCLOAK\_CONNECT\_OPTIONS

• **KEYCLOAK\_CONNECT\_OPTIONS**: typeof [`KEYCLOAK_CONNECT_OPTIONS`](README.md#keycloak_connect_options)

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

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

admin/decorators/inject.decorator.ts:8

___

### InjectKeycloakConnect

▸ **InjectKeycloakConnect**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok connect instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Injects Keyclaok connect instance initiated to the service.

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

connect/decorators/inject.decorator.ts:8

___

### InjectKeycloakConnectOptions

▸ **InjectKeycloakConnectOptions**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok connect instance options initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Injects Keyclaok connect instance options initiated to the service.

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Record`<`string`, `unknown`\> |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

connect/decorators/inject.decorator.ts:15

___

### Private

▸ `Const` **Private**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`alias`** Protected

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/protected.decorator.ts:15

___

### Protected

▸ `Const` **Protected**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`alias`** Private

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/protected.decorator.ts:9

___

### Public

▸ `Const` **Public**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`alias`** Unprotected

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/unprotected.decorator.ts:15

___

### Roles

▸ `Const` **Roles**(...`roles`): `CustomDecorator`<`symbol`\>

Inject current Keycloak users roles in to a variable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...roles` | `string`[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/roles.decorator.ts:8

___

### Scopes

▸ `Const` **Scopes**(...`list`): `CustomDecorator`<`symbol`\>

Inject current Keycloak user client scopes in to a variable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...list` | [`ScopesOption`](README.md#scopesoption)[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/scopes.decorator.ts:9

___

### Token

▸ `Const` **Token**(...`dataOrPipes`): `ParameterDecorator`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

connect/decorators/token.decorator.ts:7

___

### Unprotected

▸ `Const` **Unprotected**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`alias`** Public

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

connect/decorators/unprotected.decorator.ts:9
