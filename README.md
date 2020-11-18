[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nx-skeleton

A set of schematics and tools that provides the basis for fast template scaffolding base on the [@nrwl/nx](https://github.com/nrwl/nx).

<!-- toc -->
<!-- tocstop -->

---

## Packages

### brownie - @webundsoehne/brownie

A CLI interface for creating `@nrwl/nx` workspaces and Docker templates from scratch.

[**Read more...**](./packages/brownie/README.md)

### eslint-config - @webundsoehne/eslint-config

`eslint` configuration for variety of environments.

[**Read more...**](./packages/eslint-config/README.md)

### nestjs-util - @webundsoehne/nestjs-util

Utility package for `@nestjs`.

[**Read more...**](./packages/nestjs-util/README.md)

### nx-builders - @webundsoehne/nx-builders

Custom builders for `@nrwl/nx`.

[**Read more...**](./packages/nx-builders/README.md)

### nx-nest - @webundsoehne-private/nx-nest

A skeleton that can be generated through `@nrwl/nx` schematics.

[**Read more...**](./packages/nx-nest/README.md)

### nx-tools - @webundsoehne/nx-tools

Various tools that can be used while developing new `@nrwl/nx` schematics.

[**Read more...**](./packages/nx-tools/README.md)

### nx-workspace - @webundsoehne-private/nx-workspace

Schematic for scaffolding `@nrwl/nx` workspace.

[**Read more...**](./packages/nx-workspace/README.md)

# Further Development

Developing schematics for `@nrwl/nx` is not really possible in one-hit wonder due to templating and all the options that can be added to the schematics itself.

## Docker Setup

This repository includes a Docker-Compose stack for automatically compiling `SERVICES` variable defined. It will first compile the `RUN_IN_BAND` packages sequentially and after that it will compile everything else defined in the `SERVICES` variable in parallel.

The image uses s6-overlay to monitor the crashes and will run `dev:start` for each package unless overriden with the `SERVICE` variable. Since these are intended to be published packages to NPM, it is a better approach to use `tsc-watch` to create a structure as if the package is published.

### CLI-Script

`./cli` script can be used to access in to Docker container directly. These commands can be interactive that requires keyboard or not. But on the base Docker image which is based on Alpine-Linux there is no `bash`, so for interactive session `ash` should be run.

- `./cli ws ${COMMAND}`, `./cli . ${COMMAND}`, `./cli root ${COMMAND}` -> Will run the command in the workspace root.
- `./cli ${PACKAGE_NAME} ${COMMAND}` -> Will look for package name in `packages/*` folder and execute the command in that root.
- `./cli all ${COMMAND}` -> Will run the command for every package.
- `./cli lerna ${COMMAND}` -> Will run a `lerna` command for every package.
- `./cli ls` -> Will list the available packages.

## Scripts

There are couple of scripts in the scripts folder:

- `./scripts/link-packages.sh` link | unlink

  > Will link all the packages inside the packages folder.

- `./link-packages-to-workspace.sh` \${PWD_OF_MOCK_PROJECT} link | unlink
  > Copy this script to somewhere else for easily creating a new empty workspace in the designated folder to test out the schematics.

## Package Manager

`yarn` must be used due to its support of `resolutions` field in the `package.json` as well as this repository being configured for `yarn workspaces`.

`@angular` scoped packages have inconsistencies between similar versions due to utilizing different versioned sub-packages. In the development process you can get over this with fixing the package versions utilizing `resolutions` in the root `package.json`.
