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

- [attachToRequest](graphql.AuthGuard.md#attachtorequest)
- [canActivate](graphql.AuthGuard.md#canactivate)
- [getRequest](graphql.AuthGuard.md#getrequest)
- [validateRequirements](graphql.AuthGuard.md#validaterequirements)
- [getRequest](graphql.AuthGuard.md#getrequest-1)

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

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:28

## Properties

### reflector

• `Readonly` **reflector**: `Reflector`

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[reflector](index.BaseAuthGuard.md#reflector)

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

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[attachToRequest](index.BaseAuthGuard.md#attachtorequest)

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

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[canActivate](index.BaseAuthGuard.md#canactivate)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:34

---

### getRequest

▸ **getRequest**<`Request`\>(`context`): `Request`

#### Type parameters

| Name | Type |
| :-- | :-- |
| `Request` | extends [`EnrichedRequest`](../modules/index.md#enrichedrequest)<`any`\> = [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\> |

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`Request`

#### Overrides

[BaseAuthGuard](index.BaseAuthGuard.md).[getRequest](index.BaseAuthGuard.md#getrequest)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-graphql.guard.ts:19

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

#### Inherited from

[BaseAuthGuard](index.BaseAuthGuard.md).[validateRequirements](index.BaseAuthGuard.md#validaterequirements)

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-base.guard.ts:117

---

### getRequest

▸ `Static` **getRequest**<`Request`\>(`context`): `Request`

#### Type parameters

| Name | Type |
| :-- | :-- |
| `Request` | extends [`EnrichedRequest`](../modules/index.md#enrichedrequest)<`any`\> = [`EnrichedFastifyRequest`](../modules/index.md#enrichedfastifyrequest)<[`KeycloakConnectUser`](../interfaces/index.KeycloakConnectUser.md)\> |

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `context` | `ExecutionContext` |

#### Returns

`Request`

#### Defined in

packages/nestjs-keycloak/src/connect/guards/auth-graphql.guard.ts:15
