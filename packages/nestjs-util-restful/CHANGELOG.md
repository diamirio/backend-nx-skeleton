## 11.0.1 (2026-05-15)

### Documentation

- unified readme structure, update toc, add links
- remove deprecated header from readme
- add package.json description and keywords

### ❤️ Thank You

- Philipp Hiegetsberger

# 11.0.0 (2026-05-12)

### 🚀 Features

- **nestjs-util-restful:** config/env-var to disable internal module routes
- **nestjs-util-restful:** config/env-var to disable swagger-ui
- ⚠️  new repository structure
- add ability to pass custom options to swagger-ui
- infer package version from the workspace version
- use npx or yarn exec like paths instead of hardcoding for windows
- dont lint whenever there is no prior configuration, fix builders install
- add more decorators for missing scheduler features

### 🩹 Fixes

- injectable decorator
- **nestjs-util:** remove deprecated deps in utils
- **nestjs-util:** stringify undefined url to empty string in swagger path
- remove upper limits on peer deps
- update build mechanism for all repositories, fix tsc-watch for builders
- fix issues with null exceptions in rule
- update deps
- update packages
- **deps:** bump dependendencies
- set version fallback to npm provided env var if missing
- update base package to esm for new multi-semantic-release versions
- is semantic-release broken, lets find out
- republish packages
- fixes previous publishing fix
- janitoring, README.md updates
- bump release
- update all unresolved deps
- build order issue
- fix cjs exporting, not use esm in anyplace because of package.json

### 🔥 Performance

- ⚠️  **nestjs-util:** error handling and filters
- updates underlying library versions
- ⚠️  update depednencies for cli apps
- ⚠️  extend templates
- nx14 upgrade
- ⚠️  swap the build system because of 24gb ram usage xd
- ⚠️  **nestjs-util:** split in to smaller packages

### ⚠️  Breaking Changes

- new repository structure
- **nestjs-util:** error handling and filters
  Completely breaks how errors was handled before to mitigate always
  getting 500 errors.
- update depednencies for cli apps
  uses the new library
- extend templates
  this is not compatible with older versions of the nx-nest generator
  - express/fastify is now selectable when selecting a server
  - moved database stuff to backend-database from backend-interface
  - extend generator to accept injecting arguments
  - use the migration module for mongodb
  - ditch typeorm-seeding for generic seeder
  - add relevant command for seeding to nestjs itself due to dependency injection
- swap the build system because of 24gb ram usage xd
  drops anything less than node16, strictly commonjs still, transpiled to es2021
- **nestjs-util:** split in to smaller packages
  this will break older packages due to import points being different

### ❤️ Thank You

- Cenk Kılıç
- Mattia Vecchio
- Philipp Hiegetsberger

## 0.1.0-beta.3 (2026-04-27)

### 🚀 Features

- **nestjs-util-restful:** config/env-var to disable internal module routes
- **nestjs-util-restful:** config/env-var to disable swagger-ui

### ❤️ Thank You

- Philipp Hiegetsberger

## 0.1.0-beta.2 (2026-04-17)

### 🩹 Fixes

- injectable decorator

### ❤️ Thank You

- Philipp Hiegetsberger

## 0.1.0-beta.1 (2025-12-12)

### 🚀 Features

- ⚠️  new repository structure
- **nx-nest:** lib src folder with index file

### 🩹 Fixes

- **nx-nest:** background task component name
- **nestjs-util:** remove deprecated deps in utils

### ⚠️  Breaking Changes

- ⚠️  new repository structure

### ❤️ Thank You

- Mattia Vecchio
- Philipp Hiegetsberger