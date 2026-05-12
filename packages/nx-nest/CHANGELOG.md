# 22.0.0 (2026-05-12)

### 🚀 Features

- **nx-nest:** default host, jest preset, cors config
- **nx-nest:** dependency versions
- **nx-nest:** lint scripts
- **nestjs-util-restful:** config/env-var to disable internal module routes
- **nestjs-util-restful:** config/env-var to disable swagger-ui
- **nx-nest:** resource generation into library
- **nx-nest:** reuse resource generator for default application components
- **nx-nest:** workspace gitlab ci template, drop init server host
- ⚠️  new repository structure
- **nx-nest:** database migration-task module
- **nx-nest:** microservice server generation, docker-compose env-vars
- **nx-nest:** msp docker-compose ports
- **nx-nest:** db named volumes
- **nx-nest:** db orm selection in database-lib generation
- **nx-nest:** update db and msp lib generation
- **nx-nest:** database and msp config generation
- **nx-nest:** default seed example
- **nx-nest:** move seeder to own lib
- **nx-nest:** database target generator
- **nx-nest:** nx migration to update db-migration
- **nx-nest:** nx migration to update db-migration
- **nx-nest:** migrations, nx eslint
- **nx-nest:** seed and migration scripts, unified generate options
- **nx-nest:** update typeorm migration target configuration
- **nx-nest:** split test and e2e targets
- **nx-nest:** move nx cache up a level
- **nx-nest:** v20, docker-compose migration
- **nx-nest:** docker-compose service generation
- **nx-nest:** select database system when using typeorm
- **nx-nest:** lib src folder with index file
- **nx-nest:** lint staged config, reduce default scripts
- **nx-nest:** update default scripts
- **nx-nest:** resource generation
- **nx-nest:** implicit dependencies
- ⚠️  **nx-nest:** move to nx-generators
- use npx or yarn exec like paths instead of hardcoding for windows
- dont lint whenever there is no prior configuration, fix builders install
- better merge, better linting
- add development mode for autolinking packages, fixes some bugs
- add keycloak packages
- finalize backend interfaces and generators, fix some extra bugs
- adss generator for generating some stuff
- ⚠️  update new version
- added brownie docker module
- fixed brownie
- added updates to package parser for private registry
- added final touches to workspace generation
- started brownie finished microservices
- added workspace stuff
- mostly microservice provider solved, still some bugs to fix and testing
- added workspace and the scafolding of it
- added new workspace package, cleaned up eslint ignore
- finished exports generated documentation
- fixed and did the exports at last
- isolate exports schematic
- microservices
- **nx-builders:** cleaned up builders mostly
- **brownie:** mostly implemented the docker container add function
- **rollback:** amazing rollback stuff, finally
- **builder:** added milo's builder configuration, fixed more of the templating

### 🩹 Fixes

- update default app host
- update middleware path pattern
- **nx-nest:** database docker setup
- **nx-nest:** templates, no dependency override, single dendency-version file
- **nx-nest:** fix dependencies, templates, generators
- **nx-builders,nx-nest:** update nx-executors version to new release
- **nx-nest:** mongodb docker-compose
- **nx-nest:** package.json seed script
- **nx-nest:** validate manual typed component names
- **nx-nest:** swagger custom-environment-variables
- **nx-nest:** microservice default module template
- **nx-nest:** gitlab ci application config
- **nx-nest:** activate git hooks on application generation
- **nx-nest:** custom gitignore entries
- **nx-nest:** server template
- **nx-nest:** remove module wrapper `create[..]` function
- **nx-nest:** mongodb migration dir
- **nx-nest:** missing mongodb default config
- **nx-nest:** database dependencies, config
- **nx-nest:** do not overwrite existing start and build scripts
- **nx-nest:** include db migration on build
- **nx-nest:** nx-nest version
- **nx-nest:** database options, exports
- **nx-nest:** microservice pattern and request + response types
- **nx-nest:** seeding
- **nx-nest:** migration-modules
- **nx-nest:** command, migration targets
- **nx-nest:** background task component name
- **nx-nest:** messageQueues option, default build assets
- **nx-nest:** default database config
- **nx-nest:** default database config
- **nx-nest:** side-effect free source-file modification helper
- **nx-nest:** correct dependency version
- update readmes and badges
- implement the bugs discussed on the telko
- fix issue with parsing the file entries inside a tree
- update build mechanism for all repositories, fix tsc-watch for builders
- update deps
- update packages
- update READMEs with current banner design
- update base package to esm for new multi-semantic-release versions
- bump release
- housekeeping, swap links to oss repos on github
- update environment variables to always be string
- initiating builder dependencies
- update all unresolved deps
- fix cjs exporting, not use esm in anyplace because of package.json
- update dependencies
- rule issues
- update integration for new project based nx
- brownie installation issues
- ⚠️  deprecetad builder entry for executor
- ⚠️  swap out tsconfig paths
- fix typeorm migration stuff, update versions
- update node version for containers etc
- update workspace dependencies
- update package versions and add more to generator
- update dependencies
- add online versions for scripts, faster package manager selection
- update dependencies and type errors yet again
- update nx dependencies only
- **schematics:** bgtask naming scheme
- add verbose output when in loglevel verbose or debug
- update dependencies and some little things
- cleanup and changelogs
- retry
- change lock mechanism
- retry
- a bug with error output
- update lint setupo
- fix commitizen adapter?
- **builders:** added to use ts-node-dev locally only
- **implicit-dependencies:** fix minor bug
- **nx-builders:tsc:** fix tsconfig paths error
- **nx-builders:** added init method to builders
- **builders:** added dependency initiatior for builder
- **brownie:** added a lot
- trying for gitdiffmerge
- **eslint-config:** added local eslint-config
- added brownie and nestjsutils to monorepo
- **nx-nest:** trying to add add/remove funcitonallity for the components, general refactoring
- **nx-builders:** added tsc-builder, need debugging changed docker setup, changed logger setup
- **template-engine:** changed template engine to ninja js clone instead of lodash
- added nunchucks template engine, instead of lodash + some more graphql and stuff templates
- **nx-tools:** adding linting after copy, expanding options, created a new default workspace
- **build:** added the build and serve process
- **git:** fix gitignore for subfolders
- templating engine and relevant prompts
- **skeleton:** added build and docker setup

### 🔥 Performance

- **nestjs-util:** use cached layers for npm i in Dockerfile
- moves publishing part to npm
- updates underlying library versions
- ⚠️  update depednencies for cli apps
- nx14 upgrade
- ⚠️  **nx:** update nx to version 14
- ⚠️  swap the build system because of 24gb ram usage xd
- ⚠️  stricter linting rules
- ⚠️  update all dependencies
- ⚠️  update all the packages
- force publish

### ⚠️  Breaking Changes

- new repository structure
- **nx-nest:** move to nx-generators
  Move from schematics to new generators.
  Add/Rewrite generators for creating a nest-workspace, application, util-lib, default lib.
- update depednencies for cli apps
  uses the new library
- **nx:** update nx to version 14
  contains breaking changes for how nestjs handles graphql and nx handles
  nx.json
- swap the build system because of 24gb ram usage xd
  drops anything less than node16, strictly commonjs still, transpiled to es2021
- stricter linting rules
  stricter linting rules may cause libraries to not work
  for typescript version that are older than 4 because of the import type
    and export type statements. what advantage that it provides is that it
    wont crash anymore for any of the missing dependencies that are only
    types
- deprecetad builder entry for executor
  drops the builders completely due to they being not avaiable in nx anymore
- swap out tsconfig paths
  might break older configurations do to library change
- update new version
  updates nestjs to 8 and some breaking changes due to playground
- update all dependencies
  Adds breaking changes because of the nestjs 8 update and rxjs 7 updates.
- update all the packages
  There is ton of breaking changes due to angular, nx base libraries.
  Fixed the bug with the apollo-server not liking fastify2 for playground by using beta.
  Updated everything to latest version therefore contains a lot of breaking changes.

### ❤️ Thank You

- Cenk
- Cenk Kılıç
- Mattia Vecchio
- Philipp Hiegetsberger

## 0.1.0-beta.6 (2026-05-05)

### 🚀 Features

- **nx-nest:** dependency versions
- **nx-nest:** lint scripts

### 🩹 Fixes

- **nx-nest:** database docker setup

### ❤️ Thank You

- Philipp Hiegetsberger

## 0.1.0-beta.5 (2026-04-27)

### 🚀 Features

- **nestjs-util-restful:** config/env-var to disable internal module routes
- **nestjs-util-restful:** config/env-var to disable swagger-ui
- **nx-nest:** resource generation into library

### ❤️ Thank You

- Philipp Hiegetsberger

## 0.1.0-beta.4 (2026-04-23)

### 🚀 Features

- **nx-nest:** reuse resource generator for default application components

### 🩹 Fixes

- **nx-nest:** templates, no dependency override, single dendency-version file

### ❤️ Thank You

- Philipp Hiegetsberger

## 0.1.0-beta.3 (2026-04-22)

### 🩹 Fixes

- **nx-nest:** fix dependencies, templates, generators

### ❤️ Thank You

- Philipp Hiegetsberger

## 0.1.0-beta.2 (2026-04-21)

### 🚀 Features

- **nx-nest:** workspace gitlab ci template, drop init server host

### ❤️ Thank You

- Philipp Hiegetsberger

## 0.1.0-beta.1 (2025-12-12)

### 🚀 Features

- ⚠️  new repository structure
- **nx-nest:** database migration-task module
- **nx-nest:** microservice server generation, docker-compose env-vars
- **nx-nest:** msp docker-compose ports
- **nx-nest:** db named volumes
- **nx-nest:** db orm selection in database-lib generation
- **nx-nest:** update db and msp lib generation
- **nx-nest:** database and msp config generation
- **nx-nest:** default seed example
- **nx-nest:** move seeder to own lib
- **nx-nest:** database target generator
- **nx-nest:** nx migration to update db-migration
- **nx-nest:** nx migration to update db-migration
- **nx-nest:** migrations, nx eslint
- **nx-nest:** seed and migration scripts, unified generate options
- **nx-nest:** update typeorm migration target configuration
- **nx-nest:** split test and e2e targets
- **nx-nest:** move nx cache up a level
- **nx-nest:** v20, docker-compose migration
- **nx-nest:** docker-compose service generation
- **nx-nest:** select database system when using typeorm
- **nx-nest:** lib src folder with index file

### 🩹 Fixes

- **nx-builders,nx-nest:** update nx-executors version to new release
- **nx-nest:** mongodb docker-compose
- **nx-nest:** package.json seed script
- **nx-nest:** validate manual typed component names
- **nx-nest:** swagger custom-environment-variables
- **nx-nest:** microservice default module template
- **nx-nest:** gitlab ci application config
- **nx-nest:** activate git hooks on application generation
- **nx-nest:** custom gitignore entries
- **nx-nest:** server template
- **nx-nest:** remove module wrapper `create[..]` function
- **nx-nest:** mongodb migration dir
- **nx-nest:** missing mongodb default config
- **nx-nest:** database dependencies, config
- **nx-nest:** nx-nest version
- **nx-nest:** database options, exports
- **nx-nest:** microservice pattern and request + response types
- **nx-nest:** seeding
- **nx-nest:** migration-modules
- **nx-nest:** command, migration targets
- **nx-nest:** background task component name
- **nx-nest:** default database config
- **nx-nest:** default database config

### 🔥 Performance

- **nestjs-util:** use cached layers for npm i in Dockerfile

### ⚠️  Breaking Changes

- ⚠️  new repository structure

### ❤️ Thank You

- Mattia Vecchio
- Philipp Hiegetsberger