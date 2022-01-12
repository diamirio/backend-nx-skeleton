[@webundsoehne/nestjs-keycloak](../README.md) / KeycloakAdminOptions

# Interface: KeycloakAdminOptions

Options for creating a Keycloak admin client.

## Table of contents

### Properties

- [authentication](KeycloakAdminOptions.md#authentication)
- [configuration](KeycloakAdminOptions.md#configuration)
- [initialize](KeycloakAdminOptions.md#initialize)

## Properties

### authentication

• **authentication**: `Credentials`

Administration user credentials and client.

#### Defined in

admin/admin.interfaces.ts:11

---

### configuration

• **configuration**: `ConnectionConfig`

Realm to be managed.

#### Defined in

admin/admin.interfaces.ts:13

---

### initialize

• **initialize**: `ConnectionConfig`

Initial connection that should be made with the master administrator account that can access all the realms or realm-management account.

#### Defined in

admin/admin.interfaces.ts:9
