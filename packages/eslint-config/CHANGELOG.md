## 9.0.1 (2026-05-15)

### Documentation

- unified readme structure, update toc, add links
- remove deprecated header from readme
- add package.json description and keywords

### ❤️ Thank You

- Philipp Hiegetsberger

# 9.0.0 (2026-05-12)

### 🚀 Features

- ⚠️  new repository structure
- infer package version from the workspace version
- use npx or yarn exec like paths instead of hardcoding for windows
- add development mode for autolinking packages, fixes some bugs
- added brownie docker module
- started brownie finished microservices
- added workspace and the scafolding of it
- added new workspace package, cleaned up eslint ignore
- finished exports generated documentation
- **nx-builders:** cleaned up builders mostly

### 🩹 Fixes

- update build mechanism for all repositories, fix tsc-watch for builders
- **deps:** bump dependendencies
- update base package to esm for new multi-semantic-release versions
- republish packages
- fixes previous publishing fix
- janitoring, README.md updates
- housekeeping, swap links to oss repos on github
- eslint config utils to auto isolate tsconfig paths
- update dependencies
- ⚠️  deprecetad builder entry for executor
- update workspace dependencies
- update dependencies and type errors yet again
- update nx dependencies only
- bump packages of eslint that is failing
- cleanup and changelogs
- retry
- update lint setupo
- **builders:** added to use ts-node-dev locally only
- fixed husky setup
- add react eslint config while i am at it
- **brownie:** added a lot
- trying for gitdiffmerge
- **eslint-config:** added local eslint-config

### 🔥 Performance

- updates underlying library versions
- ⚠️  update depednencies for cli apps
- nx14 upgrade
- ⚠️  stricter linting rules
- ⚠️  update all dependencies
- ⚠️  update all the packages
- force publish

### ⚠️  Breaking Changes

- new repository structure
- update depednencies for cli apps
  uses the new library
- stricter linting rules
  stricter linting rules may cause libraries to not work
  for typescript version that are older than 4 because of the import type
    and export type statements. what advantage that it provides is that it
    wont crash anymore for any of the missing dependencies that are only
    types
- deprecetad builder entry for executor
  drops the builders completely due to they being not avaiable in nx anymore
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

## 0.1.0-beta.1 (2025-12-12)

### 🚀 Features

- ⚠️  new repository structure
- **nx-nest:** lib src folder with index file

### 🩹 Fixes

- **nx-nest:** background task component name

### ⚠️  Breaking Changes

- ⚠️  new repository structure

### ❤️ Thank You

- Philipp Hiegetsberger