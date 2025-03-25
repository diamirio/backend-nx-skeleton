<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nx-nest

[![Version](https://img.shields.io/npm/v/@webundsoehne/nx-nest.svg)](https://npmjs.org/package/@webundsoehne/nx-nest) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nx-nest.svg)](https://npmjs.org/package/@webundsoehne/nx-nest) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nx-nest)](https://npmjs.org/package/@webundsoehne/nx-nest) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

This package includes [nx](https://github.com/nrwl/nx) generators to set up nest.js projects.

- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Preset](#preset)
- [Generators](#generators)
  - [Workspace](#workspace)
  - [Application](#application)
  - [Microservice Provider](#microservice-provider)
  - [Database Orm](#database-orm)
  - [Library](#library)
  - [Resource](#resource)
  - [DB Target](#database-target)

<!-- tocstop -->

---

# Preset

To create a nx + nestjs workspace together in one command: `npx create-nx-workspace --skip ci --preset @webundsoehne/nx-nest [name]`. (See [Workspace](#workspace) for details on the options)

Based on the selected database and microservice-provider, this will generate an empty workspace with `apps` and `libs` folders, eslint setup, gitlab-ci preset, package.json scripts and pre-commit setup.

If a database was selected the `database` util-library will be generated providing the database-orm options and a central place for entities, migrations and seeds.

If the microservice-provider was included, the `microservice-provider` library will be created. This will be the central spot for keeping Message-Queues, their patterns and message-interfaces.

# Generators

Use the generators by calling `nx g @webundsoehne/nx-nest:<NAME> [OPTIONS]`. Any required option will be prompted for if not given as parameter yet. To update an application pass `--update` with the same name of an existing application and reselect the required and new options. (This will not remove existing configurations if deselected on update)

Database-ORM and Microservice-Provider Libraries can be created on workspace initialization, if selected on application generation or manually by hand. Information to those two util-libraries are stored in the `nx.json` in the custom `integration` section.

Run `nx list @webundsoehne/nx-nest` to view available generators (or check the following sections below).<br> Run `nx g @webundsoehne/nx-nest:<NAME> --help` to get details about the selected generator (also below in the respective section).

`typeorm` only: Once a `database` system is selected it is automatically used on any following application generations, if `typeorm` is selected as ORM.

## Workspace

The generator used in the preset. If you have an empty nx workspace already, use this to add the nestjs skeleton presets.

Names: `workspace`, `ws`

Options:

| Option               | Type    | Description                                                                  |
| -------------------- | ------- | ---------------------------------------------------------------------------- |
| name                 | string  | workspace folder name                                                        |
| scope                | string  | library import prefix i.e. `@scope/lib`                                      |
| databaseOrm          | string  | if and what database orm-library to set up the database util-library for     |
| database             | string  | for `typeorm` select mysql or postgres db-system                             |
| microserviceProvider | boolean | if to include the microservice-provider util-library                         |
| skipPackageJson      | boolean | optional skip any action related to the package.json (scripts, dependencies) |
| force                | boolean | option force overwriting existing files                                      |

## Application

The main nestjs application itself.

Names: `application`, `app`

Options:

| Option               | Type     | Description                                                                               |
| -------------------- | -------- | ----------------------------------------------------------------------------------------- |
| name                 | string   | application folder name                                                                   |
| components           | string[] | what components the app includes (any of: server, bg-task, command, microservice)         |
| jest                 | boolean  | if to setup jest for unit and e2e tests                                                   |
| databaseOrm          | string   | if and what database orm-library to include in the application                            |
| database             | string   | for `typeorm` select mysql or postgres db-system                                          |
| microserviceProvider | boolean  | if to include the microservice-provider in the app (if the app is an Microservice-Client) |
| skipPackageJson      | boolean  | optional skip any action related to the package.json (scripts, dependencies)              |
| update               | boolean  | option set to true if you want to update the applications options                         |

## Microservice Provider

All about microservices and their message patterns and interfaces. In here, the Message-Queues are defined, what pattern they hold and which interfaces those patterns require on request and response.

Names: `microserviceProvider`, `microservice-provider`, `msp`

Options:

| Option          | Type    | Description                                                                  |
| --------------- | ------- | ---------------------------------------------------------------------------- |
| name            | string  | library folder name (default: microservice-provider)                         |
| importPath      | string  | optional import-path overwrite (full path) (default: `@{scope}/{name}`)      |
| skipPackageJson | boolean | optional skip any action related to the package.json (scripts, dependencies) |

## Database ORM

The place for database setup, entities, migrations and seeds. Besides the orm-config and general database options, in this library the entities, migrations and seeds should be placed.

Names: `database`, `db`

Options:

| Option          | Type    | Description                                                                  |
| --------------- | ------- | ---------------------------------------------------------------------------- |
| databaseOrm     | string  | which database orm to use                                                    |
| database        | string  | for `typeorm` select mysql or postgres db-system                             |
| name            | string  | library folder name (default: database)                                      |
| importPath      | string  | optional import-path overwrite (full path) (default: `@{scope}/{name}`)      |
| skipPackageJson | boolean | optional skip any action related to the package.json (scripts, dependencies) |

## Library

An empty library folder with optional jest setup.

Names: `library`, `lib`

Options:

| Option          | Type    | Description                                                                  |
| --------------- | ------- | ---------------------------------------------------------------------------- |
| name            | string  | library folder name                                                          |
| jest            | boolean | if to setup jest for unit tests                                              |
| importPath      | string  | optional import-path overwrite (full path) (default: `@{scope}/{name}`)      |
| skipPackageJson | boolean | optional skip any action related to the package.json (scripts, dependencies) |
| update          | boolean | optional set to true if you want to update the library options               |

## Resource

A specific component resource: folder with module + controller/task/command + service.

Names: `resource`, `res`

Options:

| Option    | Type   | Description                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------ |
| name      | string | Resource name                                                                  |
| component | string | the resource-type to generate (one of: server, bg-task, command, microservice) |
| project   | string | in which project to generate the new resource                                  |

The resource generator allows generating via commandline args, but also has a custom enquirer prompt flow. After setting the name and selecting the component, only applications including this component will be suggested for selection.

Additionally, a resources can be generated by the shorthand command `nx g @webundsoehne/nx-nest:res <name> <project> <component>` i.e. `nx g @webundsoehne/nx-nest:res user app-api server`

## Database Target

Generates the `package.json` scripts and `project.json` targets to manage db migrations.

Names: `database-target`, `dbt`

Options:

| Option  | Type   | Description                                              |
| ------- | ------ | -------------------------------------------------------- |
| project | string | in/for which project to generate the scripts and targets |
