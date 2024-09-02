<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nx-executors

[![Version](https://img.shields.io/npm/v/@webundsoehne/nx-executors.svg)](https://npmjs.org/package/@webundsoehne/nx-executors) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nx-executors.svg)](https://npmjs.org/package/@webundsoehne/nx-executors) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nx-executors)](https://npmjs.org/package/@webundsoehne/nx-executors) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

This package includes [nx](https://github.com/nrwl/nx) libraries for customizing the build and serve process.

- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Executors](#executors)
  - [TSC](#tsc)
    - [Configuration](#configuration)
  - [ts-node-dev](#ts-node-dev)
    - [Configuration](#configuration-1)
  - [run](#run)
    - [Configuration](#configuration-2)
  - [jest](#jest)
    - [Configuration](#configuration-3)
- [Plugins](#plugins)
- [Migration](#migration)
  - [Packages](#packages)
  - [nx.json](#nxjson)
  - [Lint + Test](#lint--test)
  - [Projects](#projects)

<!-- tocstop -->

---

# Executors

## tsc

Executor: `@webundsoehne/nx-executors:tsc`

Extends the default `@nx/js:tsc` executor to set the `cwd` to the project-root and prefixes the `main` and `tsConfig` to shorten the configuration. On the other hand, the `targetDefaults` assets will be merged with the project assets, allowing to extend assets in the `project.json` instead of overwriting them. Furthermore by default the `package.json` and `package-lock.json` will be generated.

### Configuration

Extends the default tsc executor options: https://nx.dev/nx-api/js/executors/tsc#options

```json5
{
  targets: {
    build: {
      executor: '@webundsoehne/nx-executors:tsc',
      options: {
        main: 'src/main.ts',
        tsConfig: 'tsconfig.app.json',
        // additional optional options
        mergeAssets: true, // set `false` to overwrite targetDefault assets
        cwd: '{projectRoot}' // used to prefix `main` and `tsConfig` paths
      }
    }
  }
}
```

## ts-node-dev

Executor: `@webundsoehne/nx-executors:ts-node-dev`

Run a project in the source folder directly, where all the assets will be in place. It will pipe the output through a custom logger where it will prefix the name of the project to make it easily identifiable while running multiple packages in parallel.<br> There is no tsconfig-path replacer set up by default. Either use `tsconfig-paths` and register it via the `args` option, or use `typescript-transform-paths` with`ts-patch` and add it als `transformer` plugin to the tsconfig file.

### Configuration

```json5
{
  targets: {
    serve: {
      executor: '@webundsoehne/nx-executors:ts-node-dev',
      options: {
        // required
        main: 'src/main.ts',
        tsConfig: 'tsconfig.app.json',
        // optional
        cwd: '{projectRoot}', // defaults to the project-root
        env: {
          // or alias "environment"
          NODE_ENV: 'develop'
        },
        debug: true, // ts-node-dev `--debug` flag
        watchConfig: false, // watch the `config` directory files (to restart on config change)
        args: ['-r', 'tsconfig-paths/register'], // pass additional arguments to ts-node-dev,
        keepPackageVersion: false // keep projects package.json version (default: false)
      }
    }
  }
}
```

## run

Executor: `@webundsoehne/nx-executors:run`

Extends the default `nx:run-commands` executor to set the `cwd` to the project-root. On running node binaries, set the `tsNode` option to `true` to get typescript support. (Will extend the `nodeOptions` with `-r ts-node/register` is not already set)

### Configuration

Extends the default run-commands executor options: https://nx.dev/nx-api/nx/executors/run-commands#options

```json
{
  "targets": {
    "seed": {
      "executor": "@webundsoehne/nx-executors:run",
      "options": {
        "command": "ts-node ./seed/seed.ts",
        "env": {
          "NODE_ENV": "test"
        }
      }
    }
  }
}
```

```json5
{
  targets: {
    seed: {
      executor: '@webundsoehne/nx-executors:run',
      options: {
        tsNode: true,
        command: 'migrate-mongo up -f ./database/migrate-mongoose.ts'
      }
    }
  }
}
```

## jest

Executor: `@webundsoehne/nx-executors:jest`

Extends the `@nx/jest:jest` executor to move to the correct project-folder and extend it with some more configurations.

### Configuration

Extends the default jest executor options: https://nx.dev/nx-api/jest/executors/jest#options

```json
{
  "targets": {
    "seed": {
      "executor": "@webundsoehne/nx-executors:jest",
      "options": {
        "jestConfig": "./test/jest.config.ts"
      }
    }
  }
}
```

# Plugins

TSC and Ts-Node-Executors can be added to each application via a nx-plugin. To override or add target configs set `tagetDefaults` accordingly.

Add `tsc` executor as `build` target.

```json5
{
  plugin: '@webundsoehne/nx-executors/plugin/tsc',
  options: {
    // these are the default options
    targetName: 'build',
    executor: '@webundsoehne/nx-executors:tsc'
  }
}
```

Add `ts-node-dev` as `serve` target.

```json5
{
  plugin: '@webundsoehne/nx-executors/plugin/ts-node-dev',
  options: {
    // these are the default options
    targetName: 'serve',
    executor: '@webundsoehne/nx-executors:ts-node-dev'
  }
}
```

Add `jest` as `test` target. (Including `e2e` and `cov` configurations)

```json5
{
  plugin: '@webundsoehne/nx-executors/plugin/jest',
  options: {
    // these are the default options
    targetName: 'test',
    executor: '@webundsoehne/nx-executors:jest',
    testConfig: './test/jest.config.ts',
    e2eTestConfig: './test/jest-e2e.config.ts'
  }
}
```

Add `tsc`, `tsc-node-dev` and `jest`' as `build`, `server` and `test` target.

```json5
{
  plugin: '@webundsoehne/nx-executors/plugin',
  options: {
    tscOptions: {}, // same options as `[..]/plugin/tsc`
    tsNodeDevOptions: {}, // same options as `[..]/plugin/ts-node-dev`
    jestOptions: {} // same options as `[..]/plugin/jest`
  }
}
```

**Hint:** on config change it needs `nx reset` to clear the cached targets before the change is active.

# Migration

Some tips on how to migrate from the older nx-builders to the new nx-executors.

## Packages

The old `@nwrl` and `@angular-devkit` packages can be replaced by a handful of new `@nx` packages:

```
"@nx/eslint" ... eslint executor + plugin
"@nx/eslint-plugin" ... eslint rules
"@nx/jest" ... jest executor + plugin
"nx" ... nx cli + basic executor
```

### gitignore

With those new packages, nx has a new cache folder structure that needs to be set in the .gitignore file:

```
# nx cache
.nx/cache
.nx/workspace-data
```

### tsconfig paths

For an easy way to work with tsconfig paths include `ts-patch` and `typescript-transform-paths` as dev-dependency. Add a `prepare` script (for local use): `ts-patch install -s` and include `"plugins": [{ "transform": "typescript-transform-paths" }]` in the `tsconfig.json`. After running `npm i` or `npm run prepare` the tsconfig paths should be replaced for any process that uses this `tsconfig.json` (i.e. ts-node-dev, jest, ...)

## nx.json

First the schema for the `nx.json` changed, so it needs to be replaced with the new schema

```json5
// nx.json
{
  $schema: './node_modules/nx/schemas/nx-schema.json',
  namedInputs: {
    default: ['{projectRoot}/**/*', 'sharedGlobals'],
    production: [
      'default',
      '!{projectRoot}/.eslintrc.json',
      '!{projectRoot}/eslint.config.js',
      '!{projectRoot}/tsconfig.spec.json',
      '!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)',
      '!{projectRoot}/jest.config.[jt]s',
      '!{projectRoot}/src/test-setup.[jt]s',
      '!{projectRoot}/test-setup.[jt]s'
    ],
    sharedGlobals: []
  },
  targetDefaults: {},
  plugins: []
}
```

Secondly the `workspace.json` is deprecated and can be removed.

## Lint + Test

Instead of having a separate `lint` and `test` target in each `project.json` we can use the nx-plugins to add those targets for us.

```json5
// nx.json
{
  targetDefaults: {
    test: {
      options: {
        passWithNoTests: true
      }
    }
  },
  plugins: [
    {
      plugin: '@nx/eslint/plugin',
      options: {
        targetName: 'lint'
      }
    },
    {
      plugin: '@nx/jest/plugin',
      options: {
        targetName: 'test'
      }
    }
  ]
}
```

### EsLint

Replace the plugin in the `eslintrc` to: `"plugins": ["@nx"]`. Everything else should be good to go.

### Jest

For the jest plugin to work, first update or add the `jest.config.ts` file to pick the projects that should receive the test target

```typescript
// jest.config.ts
import { getJestProjectsAsync } from '@nx/jest'

export default async () => ({
  projects: await getJestProjectsAsync()
})
```

Then move/create a `jest.config.ts` in the root of the project, jest should run in (i.e. move the file from the `test` folder into the project root)

```typescript
// apps/../jest.config.ts
export default {
  displayName: 'app', // change to project name
  preset: '../../jest.preset.js'
}
```

```javascript
// jest.preset.js
const nxPreset = require('@nx/jest/preset').default

module.exports = {
  ...nxPreset,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }] // only required if not using `tsconfig.spec.json`
  }
}
```

## Projects

Because we move most logic to the nx plugins we can clear up the unused targets like `lint` and `test` in the `project.json` files for the each application/library.

Same can be done for `build` and `server` by adding the `@webundsoehne/nx-executors/plugin` to the `nx.json` and set some `targetDefaults`:

```json5
{
  targetDefaults: {
    serve: {
      options: {
        // restart service if a config file changes
        watchConfig: true
      }
    },
    build: {
      options: {
        // default assets (will be merged with the project.json assets, if not configured otherwise)
        assets: [
          {
            glob: '*',
            input: '{projectRoot}/config',
            output: 'config'
          },
          {
            glob: '.dockerignore',
            input: '{projectRoot}',
            output: '.'
          },
          {
            glob: 'Dockerfile',
            input: '{projectRoot}',
            output: '.'
          }
        ]
      }
    }
  },
  plugins: [
    {
      // eslint & jest plugins
    },
    {
      plugin: '@webundsoehne/nx-executors/plugin'
    }
  ]
}
```

With this setup, only project specific configuration overrides or targets need to be set in the `project.json` any generally used target like `test`, `lint`, `build` and `serve` will be available via the plugins and do not have to be set manually in each `project.json` anymore.
