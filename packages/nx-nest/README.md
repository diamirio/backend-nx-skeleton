[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne-private/nx-nest

[![Version](https://img.shields.io/npm/v/@webundsoehne-private/nx-nest.svg)](https://npmjs.org/package/@webundsoehne-private/nx-nest) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne-private/nx-nest.svg)](https://npmjs.org/package/@webundsoehne-private/nx-nest) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne-private/nx-nest)](https://npmjs.org/package/@webundsoehne-private/nx-nest) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

This package includes [@nrwl/nx](https://github.com/nrwl/nx) schematics to generate nest.js projects.

- **[Read The API Documentation](./docs/README.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Schematics](#schematics)
  - [Application](#application)
  - [Component](#component)
  - [Microservice Provider](#microservice-provider)
- [Notes](#notes)

<!-- tocstop -->

---

# Schematics

## Application

Application schematic creates a `@nestjs` application. Run the `application` schematic with its name or alias of `app` to follow through an interactive menu.

The first argument passed in to `nx g @webundsoehne-private/nx-nest:app ${APP_NAME}` will be the application name itself. This application will be created under the folder `apps/` with the given name.

Follow through the interactive menu to generate a application with the components you need.

Application will use `ts-node-dev` for development and `tsc` for distribution.

**To change the setup of the application and add/remove components in to it just rerun the command and follow through the prompt.** Application is memoryful therefore it will remember previous choices and try to diff-merge new components in to it without explicitly deleting your code. If merge for a file fails, it will take a backup of the current file.

## Component

To generate new components after an application has been created, run the `component` schematic with its name or alias of `co`.

The first argument passed in to `nx g @webundsoehne-private/nx-nest:co ${APP_NAME} ${COMPONENT_NAME}` is the application name and the second is the component name.

Follow through the prompts, where it will guide you with only available components that can be added to the application due to memoryful operation.

It will place the new component inside respective `modules/` folder under the component folder and regenerate `index.ts` file to make it automatically imported to the main application. Generating `index.ts` only consists of adding the missing lines in to the file so nothing is allowed to be deleted from the current file.

## Microservice Provider

To generate a microservice-provider that utilizes the `@webundsoehne/nestjs-util` `MicroserviceProviderModule`, run the `microservice-provider` schematic with its name or alias of `msp`.

This will take no argument and will auto detect applications that are created with this plugin and have `microservice-server` selected as a component. If it fails to find any services it will run in mock mode for integration to legacy applications.

This will create a new library called `microservice-provider` where the applications that utilize `microservice-client` to connect through. It will house the generic message queue names, patterns and request-response map for completion.

## Backend Interfaces

Generates a common backend-interfaces library that can be used by the nest applications.

This is also generated when the extension of backend interfaces is selected for the application. If the defined `nestjs` applications have a database adapter defined to them, it will auto generate the entities folders to responding adapter automatically.

## Generator

A basic generator that is usuable for generating a single file sets as in the case of `angular` or `nestjs` command line interfaces. This can scaffold a single component in a folder easily.

# Notes

- Currently GraphQL does not play real well with fastify3 especially with playground, therefore packages depend on fastify like `@nestjs/fastify-adapter`, `fastify`, `fastify-swagger` is at a older version that supports fastify2.
