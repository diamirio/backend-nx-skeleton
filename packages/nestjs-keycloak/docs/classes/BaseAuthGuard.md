[@webundsoehne/nestjs-keycloak](../README.md) / BaseAuthGuard

# Class: BaseAuthGuard

Application AuthGuard for Keycloak applications. Base for extending it for multiple use cases.

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

| Name              | Type                                                                |
| :---------------- | :------------------------------------------------------------------ |
| `keycloak`        | `Keycloak`                                                          |
| `keycloakOptions` | [`KeycloakConnectOptions`](../interfaces/KeycloakConnectOptions.md) |
| `reflector`       | `Reflector`                                                         |

#### Defined in

connect/guards/auth-base.guard.ts:23

## Properties

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

connect/guards/auth-base.guard.ts:21

---

### reflector

• `Readonly` **reflector**: `Reflector`

## Methods

### canActivate

▸ **canActivate**(`context`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

CanActivate.canActivate

#### Defined in

connect/guards/auth-base.guard.ts:29

---

### extractBearerToken

▸ `Private` **extractBearerToken**(`request`): `string`

#### Parameters

| Name      | Type  |
| :-------- | :---- |
| `request` | `any` |

#### Returns

`string`

#### Defined in

connect/guards/auth-base.guard.ts:98

---

### fetchRoles

▸ `Private` **fetchRoles**(`grant`): `Promise`<`string`[]\>

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `grant` | `Grant` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

connect/guards/auth-base.guard.ts:110

---

### fetchScopes

▸ `Private` **fetchScopes**(`roles`, `authorizedScopes?`): `string`[]

#### Parameters

| Name               | Type                                        |
| :----------------- | :------------------------------------------ |
| `roles`            | `string`[]                                  |
| `authorizedScopes` | [`ScopesOption`](../README.md#scopesoption) |

#### Returns

`string`[]

#### Defined in

connect/guards/auth-base.guard.ts:122

---

### getExceptionMessage

▸ `Private` **getExceptionMessage**(`message`): `string`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`string`

#### Defined in

connect/guards/auth-base.guard.ts:94

---

### getRequest

▸ `Abstract` **getRequest**(`context`): `any`

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`any`

#### Defined in

connect/guards/auth-base.guard.ts:146

▸ `Abstract` **getRequest**(`context`): [`EnrichedFastifyRequest`](../README.md#enrichedfastifyrequest)

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

[`EnrichedFastifyRequest`](../README.md#enrichedfastifyrequest)

#### Defined in

connect/guards/auth-base.guard.ts:147

▸ `Abstract` **getRequest**(`context`): `any`

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`any`

#### Defined in

connect/guards/auth-base.guard.ts:148

---

### validate

▸ `Private` **validate**(`key`, `values`, `authorizedValues?`): `void`

#### Parameters

| Name               | Type       | Default value |
| :----------------- | :--------- | :------------ |
| `key`              | `string`   | `undefined`   |
| `values`           | `string`[] | `undefined`   |
| `authorizedValues` | `string`[] | `[]`          |

#### Returns

`void`

#### Defined in

connect/guards/auth-base.guard.ts:132
