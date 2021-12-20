[@webundsoehne/nestjs-keycloak](../README.md) / [graphql](../modules/graphql.md) / AuthGuard

# Class: AuthGuard

[graphql](../modules/graphql.md).AuthGuard

Application AuthGuard for Keycloak applications. This only works for GraphQL APIs.

## Hierarchy

- [`BaseAuthGuard`](index.BaseAuthGuard.md)

  ↳ **`AuthGuard`**

## Table of contents

### Constructors

- [constructor](graphql.AuthGuard.md#constructor)

### Properties

- [reflector](graphql.AuthGuard.md#reflector)

### Methods

- [canActivate](graphql.AuthGuard.md#canactivate)
- [getRequest](graphql.AuthGuard.md#getrequest)

## Constructors

### constructor

• **new AuthGuard**(`keycloak`, `keycloakOptions`, `reflector`)

#### Parameters

| Name              | Type                                                                      |
| :---------------- | :------------------------------------------------------------------------ |
| `keycloak`        | `Keycloak`                                                                |
| `keycloakOptions` | [`KeycloakConnectOptions`](../interfaces/index.KeycloakConnectOptions.md) |
| `reflector`       | `Reflector`                                                               |

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[constructor](index.BaseAuthGuard.md#constructor)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:23

## Properties

### reflector

• `Readonly` **reflector**: `Reflector`

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[reflector](index.BaseAuthGuard.md#reflector)

## Methods

### canActivate

▸ **canActivate**(`context`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[canActivate](index.BaseAuthGuard.md#canactivate)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:29

---

### getRequest

▸ **getRequest**<`Request`\>(`context`): `Request`

#### Type parameters

| Name      | Type                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------- |
| `Request` | extends `unknown` = [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest) |

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`Request`

#### Overrides

[BaseAuthGuard](index.BaseAuthGuard.md).[getRequest](index.BaseAuthGuard.md#getrequest)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-graphql.guard.ts:13
