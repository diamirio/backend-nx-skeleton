[@webundsoehne/nestjs-keycloak](../README.md) / BaseAuthGuard

# Class: BaseAuthGuard

Application AuthGuard for Keycloak applications.
Base for extending it for multiple use cases.

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](BaseAuthGuard.md#constructor)

### Properties

- [logger](BaseAuthGuard.md#logger)
- [reflector](BaseAuthGuard.md#reflector)

### Methods

- [canActivate](BaseAuthGuard.md#canactivate)
- [extractBearerToken](BaseAuthGuard.md#extractbearertoken)
- [fetchRoles](BaseAuthGuard.md#fetchroles)
- [fetchScopes](BaseAuthGuard.md#fetchscopes)
- [getExceptionMessage](BaseAuthGuard.md#getexceptionmessage)
- [getRequest](BaseAuthGuard.md#getrequest)
- [validate](BaseAuthGuard.md#validate)

## Constructors

### constructor

• **new BaseAuthGuard**(`keycloak`, `keycloakOptions`, `reflector`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keycloak` | `Keycloak` |
| `keycloakOptions` | [`KeycloakConnectOptions`](../interfaces/KeycloakConnectOptions.md) |
| `reflector` | `Reflector` |

#### Defined in

connect/guards/auth-base.guard.ts:18

## Properties

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

connect/guards/auth-base.guard.ts:16

___

### reflector

• `Readonly` **reflector**: `Reflector`

## Methods

### canActivate

▸ **canActivate**(`context`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

CanActivate.canActivate

#### Defined in

connect/guards/auth-base.guard.ts:24

___

### extractBearerToken

▸ `Private` **extractBearerToken**(`request`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `any` |

#### Returns

`string`

#### Defined in

connect/guards/auth-base.guard.ts:93

___

### fetchRoles

▸ `Private` **fetchRoles**(`grant`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `grant` | `Grant` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

connect/guards/auth-base.guard.ts:105

___

### fetchScopes

▸ `Private` **fetchScopes**(`roles`, `authorizedScopes?`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `roles` | `string`[] |
| `authorizedScopes` | [`ScopesOption`](../README.md#scopesoption) |

#### Returns

`string`[]

#### Defined in

connect/guards/auth-base.guard.ts:117

___

### getExceptionMessage

▸ `Private` **getExceptionMessage**(`message`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`string`

#### Defined in

connect/guards/auth-base.guard.ts:89

___

### getRequest

▸ `Abstract` **getRequest**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`any`

#### Defined in

connect/guards/auth-base.guard.ts:141

▸ `Abstract` **getRequest**(`context`): [`EnrichedFastifyRequest`](../README.md#enrichedfastifyrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

[`EnrichedFastifyRequest`](../README.md#enrichedfastifyrequest)

#### Defined in

connect/guards/auth-base.guard.ts:142

▸ `Abstract` **getRequest**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`any`

#### Defined in

connect/guards/auth-base.guard.ts:143

___

### validate

▸ `Private` **validate**(`key`, `values`, `authorizedValues?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `string` | `undefined` |
| `values` | `string`[] | `undefined` |
| `authorizedValues` | `string`[] | `[]` |

#### Returns

`void`

#### Defined in

connect/guards/auth-base.guard.ts:127
