[@webundsoehne/nestjs-keycloak-seeder](../README.md) / KeycloakSeed

# Class: KeycloakSeed

A singular seed that should be extended from, for seeding Keycloak.

## Table of contents

### Constructors

- [constructor](KeycloakSeed.md#constructor)

### Properties

- [keycloak](KeycloakSeed.md#keycloak)
- [logger](KeycloakSeed.md#logger)

### Methods

- [run](KeycloakSeed.md#run)

## Constructors

### constructor

• **new KeycloakSeed**(`keycloak`)

#### Parameters

| Name       | Type                                                      |
| :--------- | :-------------------------------------------------------- |
| `keycloak` | [`KeycloakAdminSeederTools`](KeycloakAdminSeederTools.md) |

#### Defined in

interfaces/keycloak-seed.ts:11

## Properties

### keycloak

• `Protected` **keycloak**: [`KeycloakAdminSeederTools`](KeycloakAdminSeederTools.md)

---

### logger

• `Protected` **logger**: `Logger`

#### Defined in

interfaces/keycloak-seed.ts:9

## Methods

### run

▸ `Abstract` **run**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

interfaces/keycloak-seed.ts:13
