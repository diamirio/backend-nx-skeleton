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

### Type aliases

- [EnrichedExpressRequest](index.md#enrichedexpressrequest)
- [EnrichedFastifyRequest](index.md#enrichedfastifyrequest)
- [EnrichedRequest](index.md#enrichedrequest)
- [KeycloakConnectUserInfo](index.md#keycloakconnectuserinfo)
- [RolesOption](index.md#rolesoption)
- [ScopesOption](index.md#scopesoption)

### Variables

- [KEYCLOAK_ADMIN_INSTANCE](index.md#keycloak_admin_instance)
- [KEYCLOAK_ADMIN_OPTIONS](index.md#keycloak_admin_options)
- [KEYCLOAK_CONNECT_INSTANCE](index.md#keycloak_connect_instance)
- [KEYCLOAK_CONNECT_METADATA_GROUPS](index.md#keycloak_connect_metadata_groups)
- [KEYCLOAK_CONNECT_METADATA_PROTECTED](index.md#keycloak_connect_metadata_protected)
- [KEYCLOAK_CONNECT_METADATA_ROLES](index.md#keycloak_connect_metadata_roles)
- [KEYCLOAK_CONNECT_METADATA_SCOPES](index.md#keycloak_connect_metadata_scopes)
- [KEYCLOAK_CONNECT_METADATA_UNPROTECTED](index.md#keycloak_connect_metadata_unprotected)
- [KEYCLOAK_CONNECT_METADATA_USER](index.md#keycloak_connect_metadata_user)
- [KEYCLOAK_CONNECT_OPTIONS](index.md#keycloak_connect_options)

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

## Type aliases

### EnrichedExpressRequest

Ƭ **EnrichedExpressRequest**: `RequestWithAuthentication` & `Request`

#### Defined in

packages/nestjs-keycloak/src/interfaces/request.interface.ts:11

---

### EnrichedFastifyRequest

Ƭ **EnrichedFastifyRequest**: `RequestWithAuthentication` & `FastifyRequest`

#### Defined in

packages/nestjs-keycloak/src/interfaces/request.interface.ts:12

---

### EnrichedRequest

Ƭ **EnrichedRequest**: [`EnrichedExpressRequest`](index.md#enrichedexpressrequest) \| [`EnrichedFastifyRequest`](index.md#enrichedfastifyrequest)

#### Defined in

packages/nestjs-keycloak/src/interfaces/request.interface.ts:14

---

### KeycloakConnectUserInfo

Ƭ **KeycloakConnectUserInfo**: `Record`<`string`, `string` \| `number` \| `boolean` \| `null`\>

#### Defined in

packages/nestjs-keycloak/src/connect/connect.interfaces.ts:36

---

### RolesOption

Ƭ **RolesOption**: `Record`<`string`, `string`\>

#### Defined in

packages/nestjs-keycloak/src/connect/connect.interfaces.ts:23

---

### ScopesOption

Ƭ **ScopesOption**: `Record`<`string`, `string`\>

#### Defined in

packages/nestjs-keycloak/src/connect/connect.interfaces.ts:25

## Variables

### KEYCLOAK_ADMIN_INSTANCE

• **KEYCLOAK_ADMIN_INSTANCE**: typeof [`KEYCLOAK_ADMIN_INSTANCE`](index.md#keycloak_admin_instance)

#### Defined in

packages/nestjs-keycloak/src/admin/admin.constants.ts:2

---

### KEYCLOAK_ADMIN_OPTIONS

• **KEYCLOAK_ADMIN_OPTIONS**: typeof [`KEYCLOAK_ADMIN_OPTIONS`](index.md#keycloak_admin_options)

#### Defined in

packages/nestjs-keycloak/src/admin/admin.constants.ts:1

---

### KEYCLOAK_CONNECT_INSTANCE

• **KEYCLOAK_CONNECT_INSTANCE**: typeof [`KEYCLOAK_CONNECT_INSTANCE`](index.md#keycloak_connect_instance)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:2

---

### KEYCLOAK_CONNECT_METADATA_GROUPS

• **KEYCLOAK_CONNECT_METADATA_GROUPS**: typeof [`KEYCLOAK_CONNECT_METADATA_GROUPS`](index.md#keycloak_connect_metadata_groups)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:6

---

### KEYCLOAK_CONNECT_METADATA_PROTECTED

• **KEYCLOAK_CONNECT_METADATA_PROTECTED**: typeof [`KEYCLOAK_CONNECT_METADATA_PROTECTED`](index.md#keycloak_connect_metadata_protected)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:5

---

### KEYCLOAK_CONNECT_METADATA_ROLES

• **KEYCLOAK_CONNECT_METADATA_ROLES**: typeof [`KEYCLOAK_CONNECT_METADATA_ROLES`](index.md#keycloak_connect_metadata_roles)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:7

---

### KEYCLOAK_CONNECT_METADATA_SCOPES

• **KEYCLOAK_CONNECT_METADATA_SCOPES**: typeof [`KEYCLOAK_CONNECT_METADATA_SCOPES`](index.md#keycloak_connect_metadata_scopes)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:8

---

### KEYCLOAK_CONNECT_METADATA_UNPROTECTED

• **KEYCLOAK_CONNECT_METADATA_UNPROTECTED**: typeof [`KEYCLOAK_CONNECT_METADATA_UNPROTECTED`](index.md#keycloak_connect_metadata_unprotected)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:4

---

### KEYCLOAK_CONNECT_METADATA_USER

• **KEYCLOAK_CONNECT_METADATA_USER**: typeof [`KEYCLOAK_CONNECT_METADATA_USER`](index.md#keycloak_connect_metadata_user)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:9

---

### KEYCLOAK_CONNECT_OPTIONS

• **KEYCLOAK_CONNECT_OPTIONS**: typeof [`KEYCLOAK_CONNECT_OPTIONS`](index.md#keycloak_connect_options)

#### Defined in

packages/nestjs-keycloak/src/connect/connect.constants.ts:1

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

packages/nestjs-keycloak/src/admin/decorators/inject.decorator.ts:8

---

### InjectKeycloakConnect

▸ **InjectKeycloakConnect**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok connect instance initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Injects Keyclaok connect instance initiated to the service.

##### Parameters

| Name     | Type                           |
| :------- | :----------------------------- |
| `target` | `Record`<`string`, `unknown`\> |
| `key`    | `string` \| `symbol`           |
| `index?` | `number`                       |

##### Returns

`void`

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/inject.decorator.ts:8

---

### InjectKeycloakConnectOptions

▸ **InjectKeycloakConnectOptions**(): (`target`: `Record`<`string`, `unknown`\>, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

Injects Keyclaok connect instance options initiated to the service.

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Injects Keyclaok connect instance options initiated to the service.

##### Parameters

| Name     | Type                           |
| :------- | :----------------------------- |
| `target` | `Record`<`string`, `unknown`\> |
| `key`    | `string` \| `symbol`           |
| `index?` | `number`                       |

##### Returns

`void`

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/inject.decorator.ts:15

---

### KeycloakPrivate

▸ `Const` **KeycloakPrivate**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`alias`** {KeyclaokPrivate, KeycloakProtected,Private,Protected}

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/protected.decorator.ts:9

---

### KeycloakProtected

▸ `Const` **KeycloakProtected**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`alias`** {KeyclaokPrivate, KeycloakProtected,Private,Protected}

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/protected.decorator.ts:15

---

### KeycloakPublic

▸ `Const` **KeycloakPublic**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`alias`** {KeycloakPublic,KeycloakUnprotected,Public,Unprotected}

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/unprotected.decorator.ts:9

---

### KeycloakRoles

▸ `Const` **KeycloakRoles**(...`roles`): `CustomDecorator`<`symbol`\>

Inject current Keycloak users roles in to a variable.

**`alias`** {KeycloakRoles,Roles}

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `...roles` | `string`[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/roles.decorator.ts:9

---

### KeycloakScopes

▸ `Const` **KeycloakScopes**(...`list`): `CustomDecorator`<`symbol`\>

Inject current Keycloak user client scopes in to a variable.

**`alias`** {KeycloakScopes,Scopes}

#### Parameters

| Name      | Type                                      |
| :-------- | :---------------------------------------- |
| `...list` | [`ScopesOption`](index.md#scopesoption)[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/scopes.decorator.ts:10

---

### KeycloakUnprotected

▸ `Const` **KeycloakUnprotected**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`alias`** {KeycloakPublic,KeycloakUnprotected,Public,Unprotected}

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/unprotected.decorator.ts:15

---

### Private

▸ `Const` **Private**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`alias`** {KeyclaokPrivate, KeycloakProtected,Private,Protected}

**`deprecated`** Use KeycloakPrivate instead because of the more generic naming scheme.

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/protected.decorator.ts:22

---

### Protected

▸ `Const` **Protected**(): `CustomDecorator`<`symbol`\>

Makes the controller route private and require Keycloak authentication.

**`alias`** {KeyclaokPrivate, KeycloakProtected,Private,Protected}

**`deprecated`** Use KeycloakPrivate instead because of the more generic naming scheme.

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/protected.decorator.ts:29

---

### Public

▸ `Const` **Public**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`alias`** {KeycloakPublic,KeycloakUnprotected,Public,Unprotected}

**`deprecated`** Use KeycloakPublic instead because of the more generic naming scheme.

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/unprotected.decorator.ts:22

---

### Roles

▸ `Const` **Roles**(...`roles`): `CustomDecorator`<`symbol`\>

Inject current Keycloak users roles in to a variable.

**`alias`** {KeycloakRoles,Roles}

**`deprecated`** Use KeycloakRoles instead because of the more generic naming scheme.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `...roles` | `string`[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/roles.decorator.ts:16

---

### Scopes

▸ `Const` **Scopes**(...`list`): `CustomDecorator`<`symbol`\>

Inject current Keycloak user client scopes in to a variable.

**`alias`** {KeycloakScopes,Scopes}

**`deprecated`** Use KeycloakScopes instead because of the more generic naming scheme.

#### Parameters

| Name      | Type                                      |
| :-------- | :---------------------------------------- |
| `...list` | [`ScopesOption`](index.md#scopesoption)[] |

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/scopes.decorator.ts:21

---

### Unprotected

▸ `Const` **Unprotected**(): `CustomDecorator`<`symbol`\>

Makes the controller route public and does not require Keycloak authentication.

**`alias`** {KeycloakPublic,KeycloakUnprotected,Public,Unprotected}

**`deprecated`** Use KeycloakPublic instead because of the more generic naming scheme.

#### Returns

`CustomDecorator`<`symbol`\>

#### Defined in

packages/nestjs-keycloak/src/connect/decorators/unprotected.decorator.ts:29
