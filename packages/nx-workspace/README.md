[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne-private/nx-workspace

[![Version](https://img.shields.io/npm/v/@webundsoehne-private/nx-workspace.svg)](https://npmjs.org/package/@webundsoehne-private/nx-workspace) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne-private/nx-workspace.svg)](https://npmjs.org/package/@webundsoehne-private/nx-workspace) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne-private/nx-workspace)](https://npmjs.org/package/@webundsoehne-private/nx-workspace) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

This package includes [@nrwl/nx](https://github.com/nrwl/nx) workspace to generate base workspace. This extends the default `@nrwl/workspace` so all commands not defined inside of it is inherited from the base schematic.

- **[Read The API Documentation](./API.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Schematics](#schematics)
  - [Workspace](#workspace)

<!-- tocstop -->

---

# Schematics

## Workspace

Workspace is a hidden schematic that can be called through `ng` cli or `brownie`. This will create a custom workspace for tailored `@webundsoehne` applications.

```shell
# with angular-cli
ng new --collection=${FULL_PATH_TO_GLOBAL_MODULE}/collections.json
# with brownie
brownie workspace
```
