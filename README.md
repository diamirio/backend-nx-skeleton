[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nx-skeleton

A set of schematics and tools that provides the basis for fast template scaffolding base on the [@nrwl/nx](https://github.com/nrwl/nx).

<!-- toc -->

- [Packages](#packages)
  - [brownie - @webundsoehne/brownie](#brownie---webundsoehnebrownie)
  - [deep-merge - @webundsoehne/deep-merge](#deep-merge---webundsoehnedeep-merge)
  - [eslint-config - @webundsoehne/eslint-config](#eslint-config---webundsoehneeslint-config)
  - [nestjs-graphql-typeorm-dataloader - @webundsoehne/nestjs-graphql-typeorm-dataloader](#nestjs-graphql-typeorm-dataloader---webundsoehnenestjs-graphql-typeorm-dataloader)
  - [nestjs-keycloak - @webundsoehne/nestjs-keycloak](#nestjs-keycloak---webundsoehnenestjs-keycloak)
  - [nestjs-keycloak-seeder - @webundsoehne/nestjs-keycloak-seeder](#nestjs-keycloak-seeder---webundsoehnenestjs-keycloak-seeder)
  - [nestjs-util - @webundsoehne/nestjs-util](#nestjs-util---webundsoehnenestjs-util)
  - [nestjs-util-graphql - @webundsoehne/nestjs-util-graphql](#nestjs-util-graphql---webundsoehnenestjs-util-graphql)
  - [nestjs-util-microservices - @webundsoehne/nestjs-util-microservices](#nestjs-util-microservices---webundsoehnenestjs-util-microservices)
  - [nestjs-util-restful - @webundsoehne/nestjs-util-restful](#nestjs-util-restful---webundsoehnenestjs-util-restful)
  - [nx-builders - @webundsoehne/nx-builders](#nx-builders---webundsoehnenx-builders)
  - [nx-nest - @webundsoehne-private/nx-nest](#nx-nest---webundsoehne-privatenx-nest)
  - [nx-tools - @webundsoehne/nx-tools](#nx-tools---webundsoehnenx-tools)
  - [nx-workspace - @webundsoehne-private/nx-workspace](#nx-workspace---webundsoehne-privatenx-workspace)
  - [patch-package - @webundsoehne-private/patch-package](#patch-package---webundsoehne-privatepatch-package)
  - [ts-utility-types - @webundsoehne-private/ts-utility-types](#ts-utility-types---webundsoehne-privatets-utility-types)
- [Further Development](#further-development)
  - [Docker Setup](#docker-setup)
    - [CLI-Script](#cli-script)
  - [Scripts](#scripts)
  - [Package Manager](#package-manager)
  - [Versioning of Individual Packages](#versioning-of-individual-packages)

<!-- tocstop -->

---

## Packages

### brownie - @webundsoehne/brownie

A CLI interface for creating `@nrwl/nx` workspaces and Docker templates from scratch.

[**Read more...**](./packages/brownie/README.md)

### deep-merge - @webundsoehne/deep-merge

Helper tools for deep merge objects.

[**Read more...**](./packages/deep-merge/README.md)

### eslint-config - @webundsoehne/eslint-config

`eslint` configuration for variety of environments.

[**Read more...**](./packages/eslint-config/README.md)

### nestjs-graphql-typeorm-dataloader - @webundsoehne/nestjs-graphql-typeorm-dataloader

Easily implement data-loader to Typeorm projects via decorating the DTOs or entities instead of creating custom ones.

[**Read more...**](./packages/nestjs-graphql-typeorm-dataloader/README.md)

### nestjs-keycloak - @webundsoehne/nestjs-keycloak

This package includes Keycloak integration for NestJS.

[**Read more...**](./packages/nestjs-keycloak/README.md)

### nestjs-keycloak-seeder - @webundsoehne/nestjs-keycloak-seeder

This package extends the `@webundsoehne/nestjs-keycloak` to have the seeding functionality to initiate and manage a Keycloak instance.

[**Read more...**](./packages/nestjs-keycloak-seeder/README.md)

### nestjs-util - @webundsoehne/nestjs-util

Utility package for `@nestjs`.

[**Read more...**](./packages/nestjs-util/README.md)

### nestjs-util-graphql - @webundsoehne/nestjs-util-graphql

Utility package for `@nestjs` for GraphQL applications.

[**Read more...**](./packages/nestjs-util-graphql/README.md)

### nestjs-util-microservices - @webundsoehne/nestjs-util-microservices

Utility package for `@nestjs` for microservices applications.

[**Read more...**](./packages/nestjs-util-microservices/README.md)

### nestjs-util-restful - @webundsoehne/nestjs-util-restful

Utility package for `@nestjs` for restful applications.

[**Read more...**](./packages/nestjs-util-microservices/README.md)

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

### patch-package - @webundsoehne-private/patch-package

A wrapper around the `patch-package` library which can automatically apply predefined patches or create new ones.

[**Read more...**](./packages/patch-package/README.md)

### ts-utility-types - @webundsoehne-private/ts-utility-types

Some basic utility types for Typescript.

[**Read more...**](./packages/ts-utility-types/README.md)

# Further Development

Developing schematics for `@nrwl/nx` is not really possible in one-hit wonder due to templating and all the options that can be added to the schematics itself.

Using the scripts link all the packages to your global link directory.

You can use the `-d` or `--develop` flag in `brownie` commands `workspace` and `nx` to put schematics in development mode. This will do some additional tasks to ensure that it will work in a development environment. For dependencies it will only install the linked versions.

You can use the `--debug` flag for `brownie`, which will activate the debug log level for both the schematics that it runs and the `brownie` itself.

## Development Process

This is a brief walkthrough, you can find more information in the following sections.

- Install the dependencies with `yarn`.
- Run the docker-compose stack. All the packages will be built locally.
- Link all the packages to your global link folder. You can use `yarn run scripts:link` to link them all at once.
- Create a mock NX workspace with `brownie`. You should definitely use `-d` flag to put `brownie` and some schematics in to development mode and can always use `--debug` flag for more output.
- You can then just run `brownie` as you wish to test things out. But always remember to put it in to development mode with `-d` flag.

## Warnings

- If you have a new or updated NPM module added to one of the packages, you might need to install it again from root. Because `yarn workspaces` and `resolutions` field do not play nice. But do not worry since the install will only fix the resolutions and not take much of time.

## Versioning Process

This is a brief walkthrough, you can find more information in the following sections.

Repository has `git commit` hook to ensure the commit format.

- fix -> will publish new patch version for the package that the commits apply to
- feat -> will publish new minor version for the package that the commits apply to
- perf with breaking changes selected -> will publish new major version for the package that the commits apply to

`semantic-release` decides to publish the packages or not depending on whether the new commits since the last known tag has been made to the given package.

So it is better to commit often for little things to ensure that your final version matches what you expect.

To give an example to this lets say we will do changes in 2 packages, `nx-nest` and `nx-tools`.

`nx-nest` will have just a bug fix. So after changing the related files, we can just commit with `fix` to ensure that it will publish a patch version. `nx-tools` will have a new feature that is not breaking. So again after changing the related files, we can just commit with `feat` to ensure that it will publish a minor version.

So even though we will publish them at the same time, they will get individually versioned depending on what commits have been made to them.

The other options that are inside the `git commit` hook, which uses a interactive selection for commitizen is:

- scope -> you can scope your changes to a package, so when you are searching through commits its easier to find them. We currently have no convention for this.
- long description -> will append the description to the issues replied and the commit itself
- resolves issues -> will automatically respond to related issues and close them if specified
- breaking changes -> breaking changes is required to publish a major version, it will also append it in the changelogs
- skip ci -> if you are sure that the ci does not have to be run after this commit and everything lints and builds fine and there is no publishing needed you can select this to save ci resources

The other commit types like `refactor`, `build`, `ci`, `style` does not affect versioning in anyway. But it helps to identify the changes made to the repository.

## Docker Setup

This repository includes a Docker-Compose stack for automatically compiling `SERVICES` variable defined. It will first compile the `RUN_IN_BAND` packages sequentially and after that it will compile everything else defined in the `SERVICES` variable in parallel.

The image uses s6-overlay to monitor the crashes and will run `dev:start` for each package unless overridden with the `SERVICE` variable. Since these are intended to be published packages to NPM, it is a better approach to use `tsc-watch` to create a structure as if the package is published.

### CLI-Script

`./cli` script can be used to access in to Docker container directly. These commands can be interactive that requires keyboard or not. But on the base Docker image which is based on Alpine-Linux there is no `bash`, so for interactive session `ash` should be run.

- `./cli ws ${COMMAND}`, `./cli . ${COMMAND}`, `./cli root ${COMMAND}` -> Will run the command in the workspace root.
- `./cli ${PACKAGE_NAME} ${COMMAND}` -> Will look for package name in `packages/*` folder and execute the command in that root.
- `./cli all ${COMMAND}` -> Will run the command for every package.
- `./cli lerna ${COMMAND}` -> Will run a `lerna` command for every package.
- `./cli ls` -> Will list the available packages.

## Scripts

There are couple of scripts in the scripts folder:

- `./scripts/link-packages.sh [link | unlink]` This can also be accessed through: `yarn run scripts:link` `yarn run scripts:unlink`

  > Will link all the packages inside the packages folder.

- `./link-packages-to-workspace.sh [link | unlink] \${PWD_OF_MOCK_PROJECT}` This can also be accessed through: `yarn run scripts:workspace:link` `yarn run scripts:workspace:unlink`
  > Copy this script to somewhere else for easily creating a new empty workspace in the designated folder to test out the schematics.

## Package Manager

`yarn` must be used due to its support of `resolutions` field in the `package.json` as well as this repository being configured for `yarn workspaces`.

`@angular` scoped packages have inconsistencies between similar versions due to utilizing different versioned sub-packages. In the development process you can get over this with fixing the package versions utilizing `resolutions` in the root `package.json`.

## Versioning of Individual Packages

This repository uses [semantic-release](https://github.com/semantic-release/semantic-release) to versioning of the indivudal packages. Since semantic-release is not intended for multiple packages at the same time it uses [multi-semantic-release](https://github.com/qiwi/multi-semantic-release#readme) on top of it.

What it does is:

- Goes through all the packages analyzes the commits and generate changelogs and decide next version for each.
- Writes cross-dependency versions as pinned to avoid dependency problems to each package.
- Release packages that have relevant commits on it filtering the commits to their own folder.
- Closes issues depending on the commits, comments them if they have been released in which version.

`semantic-release` relies on [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/) commit format to decide through these changes. This is enforced through a `git` `prepare-commit-msg` hook to create a interactive menu to help you through the process.
