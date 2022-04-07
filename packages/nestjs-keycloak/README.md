[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nestjs-keycloak

[![Version](https://img.shields.io/npm/v/@webundsoehne/nestjs-keycloak.svg)](https://npmjs.org/package/@webundsoehne/nestjs-keycloak) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nestjs-keycloak.svg)](https://npmjs.org/package/@webundsoehne/nestjs-keycloak) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nestjs-keycloak)](https://npmjs.org/package/@webundsoehne/nestjs-keycloak) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Description

This package includes Keycloak integration for NestJS.

- **[Read The API Documentation](./docs/README.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Installation](#installation)
- [Keycloak Admin Module](#keycloak-admin-module)
- [Keycloak Connect Module](#keycloak-connect-module)
- [Compatibility](#compatibility)
  - [Guards](#guards)
    - [Extending The Base Guards](#extending-the-base-guards)

<!-- tocstop -->

---

## Installation

Keycloak library versions are tightly coupled with the Keycloak server itself, therefore all the Keycloak related dependencies are peer dependencies. Please be sure to check out the compatibility table.

```bash
npm i @webundsoehne/nestjs-keycloak @keycloak/keycloak-admin-client keycloak-connect
```

## Keycloak Admin Module

`KeycloakAdminModule` provides Keycloak REST API client through an administration user. This user can either be a superuser in the master realm or a realm-management user in a specific realm.

- Add it to your specific module with the Keycloak client options.

  ```typescript
  @Module({
    imports: [KeycloakAdminModule.register(ConfigService.get('keycloak.admin'))]
  })
  export class SomeModule {}
  ```

- Inject it to services through `@InjectKeycloak()` decorator.

## Keycloak Connect Module

`KeycloakConnectModule` provides a utility REST API to access Keycloak through connecting a private Keycloak client with a secret.

This enables us to validate user tokens and fetch more information about the user and decode the token through Keycloak. So it is intended for authentication checks.

- Add it to your specific module with the Keycloak client options.

  ```typescript
  @Module({
    imports: [KeycloakConnectModule.register(ConfigService.get('keycloak.connect'))]
  })
  export class SomeModule {}
  ```

- Utilize it in your custom authentication guard by injecting it through decorators `@InjectKeycloakConnect()` and `InjectKeycloakConnectOptions()`.

## Compatibility

This library is compatible with RESTFUL and GraphQL APIs. But to avoid missing dependency errors, since they do require different additional dependencies.

Anything neutral is exported from the index of this library where RESTFUL API dependent tools are exported from `./dist/restful` and GraphQL dependent tools are exported from `./dist/graphql`.

### Guards

This repository also has a neutral guard that can be configured through the options. This guard fetches the roles, groups, and scopes through Keycloak properly.

Since fetching the request is different for both RESTFUL APIs and GraphQL based APIs, they are exported from the respective specific endpoint.

#### Extending The Base Guards

Let us assume that we are in a GraphQL application and we do want to extend the default guard with some specific logic. Since in most of the cases we do want to verify the user is on Keycloak and fetch its properties, we can call the default guard first, then extend `canActivate` in the guard itself.

```typescript
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Keycloak } from 'keycloak-connect'
import { Connection } from 'typeorm'

import { KeycloakConnectOptions } from '@webundsoehne/nestjs-keycloak'
import { AuthGuard as BaseAuthGuard } from '@webundsoehne/nestjs-keycloak/dist/graphql'

@Injectable()
export class AuthGuard extends BaseAuthGuard implements CanActivate {
  constructor(@InjectKeycloakConnect() keycloak: Keycloak, @InjectKeycloakConnectOptions() keycloakOptions: KeycloakConnectOptions, @Inject(Reflector) reflector: Reflector) {
    super(keycloak, keycloakOptions, reflector)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)

    const request = super.getRequest(context)

    if (!customLogic) {
      throw new UnauthorizedException(`Custom logic failed.`)
    }

    return true
  }
}
```
