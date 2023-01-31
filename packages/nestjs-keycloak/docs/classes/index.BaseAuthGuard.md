[@webundsoehne/nestjs-keycloak](../README.md) / [index](../modules/index.md) / BaseAuthGuard

# Class: BaseAuthGuard

[index](../modules/index.md).BaseAuthGuard

Application AuthGuard for Keycloak applications. Base for extending it for multiple use cases.

## Hierarchy

- **`BaseAuthGuard`**

  ↳ [`AuthGuard`](graphql.AuthGuard.md)

  ↳ [`AuthGuard`](restful.AuthGuard.md)

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](index.BaseAuthGuard.md#constructor)

### Properties

- [keycloak](index.BaseAuthGuard.md#keycloak)
- [keycloakOptions](index.BaseAuthGuard.md#keycloakoptions)
- [logger](index.BaseAuthGuard.md#logger)
- [reflector](index.BaseAuthGuard.md#reflector)

### Methods

- [attachToRequest](index.BaseAuthGuard.md#attachtorequest)
- [canActivate](index.BaseAuthGuard.md#canactivate)
- [extractBearerToken](index.BaseAuthGuard.md#extractbearertoken)
- [fetchRoles](index.BaseAuthGuard.md#fetchroles)
- [fetchScopes](index.BaseAuthGuard.md#fetchscopes)
- [getExceptionMessage](index.BaseAuthGuard.md#getexceptionmessage)
- [getRequest](index.BaseAuthGuard.md#getrequest)
- [validate](index.BaseAuthGuard.md#validate)
- [validateRequirements](index.BaseAuthGuard.md#validaterequirements)

## Constructors

### constructor

• **new BaseAuthGuard**(`keycloak`, `keycloakOptions`, `reflector`)

#### Parameters

| Name              | Type                                                                      |
| :---------------- | :------------------------------------------------------------------------ |
| `keycloak`        | `Keycloak`                                                                |
| `keycloakOptions` | [`KeycloakConnectOptions`](../interfaces/index.KeycloakConnectOptions.md) |
| `reflector`       | `Reflector`                                                               |

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:28

## Properties

### keycloak

• `Private` **keycloak**: `Keycloak`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:29

---

### keycloakOptions

• `Private` **keycloakOptions**: [`KeycloakConnectOptions`](../interfaces/index.KeycloakConnectOptions.md)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:30

---

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:26

---

### reflector

• `Readonly` **reflector**: `Reflector`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:31

## Methods

### attachToRequest

▸ `Protected` **attachToRequest**(`request`, `data`): `void` \| `Promise`<`void`\>

Attachs the related values inside the scoped user request for identification.

#### Parameters

| Name      | Type                                                                              |
| :-------- | :-------------------------------------------------------------------------------- |
| `request` | [`EnrichedRequest`](../modules/index.md#enrichedrequest)<`any`\>                  |
| `data`    | [`AuthGuardRequestAttachment`](../interfaces/index.AuthGuardRequestAttachment.md) |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:109

---

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:34

---

### extractBearerToken

▸ `Private` **extractBearerToken**(`request`): `string`

#### Parameters

| Name      | Type                                                                                                                           |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `request` | [`EnrichedRequest`](../modules/index.md#enrichedrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\> |

#### Returns

`string`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:143

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:155

---

### fetchScopes

▸ `Private` **fetchScopes**(`roles`, `authorizedScopes?`): `string`[]

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `roles`            | `string`[]                                         |
| `authorizedScopes` | [`ScopesOption`](../modules/index.md#scopesoption) |

#### Returns

`string`[]

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:167

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:139

---

### getRequest

▸ `Abstract` **getRequest**(`context`): [`EnrichedRequest`](../modules/index.md#enrichedrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\>

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

[`EnrichedRequest`](../modules/index.md#enrichedrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\>

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:177

▸ `Abstract` **getRequest**(`context`): [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\>

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

[`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\>

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:178

▸ `Abstract` **getRequest**(`context`): [`EnrichedExpressRequest`](../modules/index.md#enrichedexpressrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\>

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

[`EnrichedExpressRequest`](../modules/index.md#enrichedexpressrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\>

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:179

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:129

---

### validateRequirements

▸ `Protected` **validateRequirements**(`values`, `required?`): `boolean`

Validate given condition to match the required values.

#### Parameters

| Name       | Type       | Default value |
| :--------- | :--------- | :------------ |
| `values`   | `string`[] | `undefined`   |
| `required` | `string`[] | `[]`          |

#### Returns

`boolean`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:117
