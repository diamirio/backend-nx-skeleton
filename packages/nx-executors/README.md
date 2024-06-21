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
      - [Build Mode](#build-mode)
      - [Ignore assets](#ignore-assets)
  - [ts-node-dev](#ts-node-dev)
    - [Configuration](#configuration-1)
  - [run](#run)
    - [Configuration](#configuration-2)

<!-- tocstop -->

---

# Executors

## tsc

Builder: `@webundsoehne/nx-executors:tsc`

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

Builder: `@webundsoehne/nx-executors:ts-node-dev`

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
        args: ['-r', 'tsconfig-paths/register'] // pass additional arguments to ts-node-dev
      }
    }
  }
}
```

## run

Builder: `@webundsoehne/nx-executors:run`

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
