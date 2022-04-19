[@webundsoehne/nestjs-keycloak](../README.md) / [index](../modules/index.md) / KeycloakAdminOptions

# Interface: KeycloakAdminOptions

[index](../modules/index.md).KeycloakAdminOptions

Options for creating a Keycloak admin client.

## Table of contents

### Properties

- [authentication](index.KeycloakAdminOptions.md#authentication)
- [configuration](index.KeycloakAdminOptions.md#configuration)
- [initialize](index.KeycloakAdminOptions.md#initialize)

## Properties

### authentication

• **authentication**: `Credentials`

Administration user credentials and client.

#### Defined in

admin/admin.interfaces.ts:11

___

### configuration

• **configuration**: `ConnectionConfig`

Realm to be managed.

#### Defined in

admin/admin.interfaces.ts:13

___

### initialize

• **initialize**: `ConnectionConfig`

Initial connection that should be made with the master administrator account that can access all the realms or realm-management account.

#### Defined in

admin/admin.interfaces.ts:9
