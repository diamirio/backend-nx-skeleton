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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:27

## Properties

### keycloak

• `Private` **keycloak**: `Keycloak`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:28

---

### keycloakOptions

• `Private` **keycloakOptions**: [`KeycloakConnectOptions`](../interfaces/index.KeycloakConnectOptions.md)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:29

---

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:25

---

### reflector

• `Readonly` **reflector**: `Reflector`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:30

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:33

---

### extractBearerToken

▸ `Private` **extractBearerToken**(`request`): `string`

#### Parameters

| Name      | Type                                                                                                                                             |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `request` | [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest) \| [`EnrichedExpressRequest`](../modules/index.md#enrichedexpressrequest) |

#### Returns

`string`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:132

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:144

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:156

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:128

---

### getRequest

▸ `Abstract` **getRequest**(`context`): [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest) \| [`EnrichedExpressRequest`](../modules/index.md#enrichedexpressrequest)

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

[`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest) \| [`EnrichedExpressRequest`](../modules/index.md#enrichedexpressrequest)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:166

▸ `Abstract` **getRequest**(`context`): [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest)

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

[`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:167

▸ `Abstract` **getRequest**(`context`): [`EnrichedExpressRequest`](../modules/index.md#enrichedexpressrequest)

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

[`EnrichedExpressRequest`](../modules/index.md#enrichedexpressrequest)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:168

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:118

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:106
