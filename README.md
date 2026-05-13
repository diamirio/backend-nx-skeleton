# nx-skeleton

NestJs and Nx utils/helper/tools

<!-- TOC -->
* [nx-skeleton](#nx-skeleton)
  * [compatibility](#compatibility)
  * [packages](#packages)
    * [eslint-config](#eslint-config)
    * [nestjs-config](#nestjs-config)
    * [nestjs-logger](#nestjs-logger)
    * [nestjs-maintenance](#nestjs-maintenance)
    * [nestjs-microservice](#nestjs-microservice)
    * [nestjs-process](#nestjs-process)
    * [nestjs-retry](#nestjs-retry)
    * [nestjs-seeder](#nestjs-seeder)
    * [nestjs-util-restful](#nestjs-util-restful)
    * [nx-executors](#nx-executors)
    * [nx-nest](#nx-nest)
* [Development](#development)
  * [package.json](#packagejson)
  * [Targets](#targets)
* [Release](#release)
  * [Beta](#beta)
  * [Master](#master)
* [old skeleton](#old-skeleton)
<!-- TOC -->

## compatibility

| package                | dependency      |
|------------------------|-----------------|
| eslint-config@9        | eslint@9        |
| nestjs-config@11       | nest@11         |
| nestjs-logger@11       | nest@11         |
| nestjs-maintenance@11  | nest@11         |
| nestjs-microservice@11 | nest@11         |
| nestjs-process@11      | nest@11         |
| nestjs-retry@11        | nest@11         |
| nestjs-seeder@11       | nest@11         |
| nestjs-util-restful@11 | nest@11         |
| nx-executors@22        | nx@22           |
| nx-nest@22             | nx@22 & nest@11 |

## packages

### eslint-config

Eslint-Config presets
[eslint-config](./packages/eslint-config)

### nestjs-config

Runtime config util and decorators
[nestjs-config](./packages/nestjs-config)

### nestjs-logger

Winston nestjs logger instance
[nestjs-logger](./packages/nestjs-logger)

### nestjs-maintenance

Maintenance middleware and module
[nestjs-maintenance](./packages/nestjs-maintenance)

### nestjs-microservice

Microservice utils
[nestjs-microservice](./packages/nestjs-microservice)

### nestjs-process

Node process/environment utils
[nestjs-process](./packages/nestjs-process)

### nestjs-retry

Method retry decorator
[nestjs-retry](./packages/nestjs-retry)

### nestjs-seeder

Generic seeding module
[nestjs-seeder](./packages/nestjs-seeder)

### nestjs-util-restful

Restful utils, swagger, exception-filter tools
[nestjs-util-restful](./packages/nestjs-util-restful)

### nx-executors

NX executors and plugins
[nx-executors](./packages/nx-executors)

### nx-nest

NX application/workspace generators
[nx-nest](./packages/nx-nest)

# Development

New packages can be generated using the internal package generator `nx g package @diamir/<name>`

## package.json

Each package has a `package.json` and a `package.template.json`.

The `package.template.json` only hold the `dependency` and `peerDependency` information linking the dependency version
to the `pnpm-workspace.yml` catalogs, where the dependency versions can be managed in a single place.

The `updateManifest` target (custom internal executor [manifest](tools/internal/src/executors/update-manifest)) will
update the `package.json` replacing the dependency versions linked in the template from the pnpm catalogues.

If you update a dependency in a catalog, you must **manually** run `npm run manifest:update` (or the `updateManifest`
target another way) to update the `package.json` and `pnpm install` to update the lockfile.

This way, we can utilize the pnpm catalog feature while still have the git change on version update to later generate a
changelog and version based on the committed change.

## Targets

The default nx targets are all stored in the [`nx.json`](nx.json) `targetDefaults` and applied in the `project.json` via
e.g. `build: {}` (the target must be included per project, but the config is shared in the nx.json)

By default, the `README.md` and the `LICENCE` files are included as asset on build, to add more, extend the `build`
target for the package like

```json5
// project.json
{
  // ... nx metadata
  "targets": {
    "build": {
      "options": {
        "assets": [
          "{projectRoot}/README.md",
          "{projectRoot}/LICENSE",
          "{projectRoot}/path-to-file/with-glob*"
        ]
      }
    },
    // other targets
  }
}
```

| target         | description                                             |
|----------------|---------------------------------------------------------|
| test           | run the packages unit-tests                             |
| lint           | run biome linting (apply fix)                           |
| updateManifest | write `catalog` dependency versions into `package.json` |
| build          | run tsc to build the project                            |
| release        | version, changelog generation and publish a package     |

# Release

## Beta

Once a branch is merged into the `beta` branch, the beta-release will be triggered, setting a pre-release tag like
`0.1.1-beta.0`.

## Master

Once a branch is merged into the `master` branch, a normal release will be triggered.

# old skeleton

Anything up to `0ac7ecf101a36c5f0ec8e8f7d1bde8459b2bbddd` is before the skeleton-rework took place.
