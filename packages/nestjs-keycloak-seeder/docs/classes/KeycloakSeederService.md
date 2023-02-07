[@webundsoehne/nestjs-keycloak-seeder](../README.md) / KeycloakSeederService

# Class: KeycloakSeederService

Seeder service to run all the seeds that has been passed to it.

## Table of contents

### Constructors

- [constructor](KeycloakSeederService.md#constructor)

### Properties

- [keycloak](KeycloakSeederService.md#keycloak)
- [logger](KeycloakSeederService.md#logger)
- [seeds](KeycloakSeederService.md#seeds)

### Methods

- [init](KeycloakSeederService.md#init)

## Constructors

### constructor

• **new KeycloakSeederService**(`keycloak`, `seeds`)

#### Parameters

| Name       | Type                                                      |
| :--------- | :-------------------------------------------------------- |
| `keycloak` | [`KeycloakAdminSeederTools`](KeycloakAdminSeederTools.md) |
| `seeds`    | `KeycloakSeeds`                                           |

#### Defined in

nestjs-keycloak-seeder/src/module/keycloak-seeder.service.ts:16

## Properties

### keycloak

• `Protected` `Readonly` **keycloak**: [`KeycloakAdminSeederTools`](KeycloakAdminSeederTools.md)

#### Defined in

nestjs-keycloak-seeder/src/module/keycloak-seeder.service.ts:16

---

### logger

• `Protected` `Readonly` **logger**: `Logger`

#### Defined in

nestjs-keycloak-seeder/src/module/keycloak-seeder.service.ts:14

---

### seeds

• `Protected` `Readonly` **seeds**: `KeycloakSeeds`

#### Defined in

nestjs-keycloak-seeder/src/module/keycloak-seeder.service.ts:16

## Methods

### init

▸ **init**(): `Promise`<`void`\>

Run all the seeds.

#### Returns

`Promise`<`void`\>

#### Defined in

nestjs-keycloak-seeder/src/module/keycloak-seeder.service.ts:21
