<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nx-builders

[![Version](https://img.shields.io/npm/v/@webundsoehne/nx-builders.svg)](https://npmjs.org/package/@webundsoehne/nx-builders) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nx-builders.svg)](https://npmjs.org/package/@webundsoehne/nx-builders) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nx-builders)](https://npmjs.org/package/@webundsoehne/nx-builders) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Deprecated

This package will be deprecated in favour of the new `nx-executors` package.<br> Migration commands to run in the workspace to update:

1. `nx migrate @webundsoehne/nx-builder@7.0.0`
2. `nx migrate --run-migrations`

This should fetch the last version and create a `migrations.json` file, linking to the `@webundsoehne/nx-builders` package. By running this, the migrations will remove deprecated packages, add new nx packages, update nx.json, package.json moving to the new packages.<br> After the migration validate the changes made did not override another config before committing them.

# Description

This package includes [@nrwl/nx](https://github.com/nrwl/nx) libraries for customizing the build and serve process.

- **[Read The API Documentation](./docs/README.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Using It in Your Schematic](#using-it-in-your-schematic)
  - [Ensuring Required Dependencies](#ensuring-required-dependencies)
  - [Utilizing Types](#utilizing-types)
- [Builders](#builders)
  - [TSC](#tsc)
    - [Configuration](#configuration)
      - [Build Mode](#build-mode)
      - [Watch Mode](#watch-mode)
      - [Ignore assets](#ignore-assets)
  - [ts-node-dev](#ts-node-dev)
    - [Configuration](#configuration-1)
  - [run](#run)
    - [Configuration](#configuration-2)
  - [execute](#execute)
    - [Configuration](#configuration-3)

<!-- tocstop -->

---

# Using It in Your Schematic

Additional to adding the configuration to the architect in your schematic some of the useful functionality is exported from the root of the project.

## Ensuring Required Dependencies

The useful function of installing dependencies that are required by this builder is exported from the root of the package.

It returns a rule of ensuring the install of required dependencies where it can be used inside a `chain[]` in the initiation of your schematic.

```typescript
import { addDepsToPackageJson } from '@nrwl/workspace'
import { Schema as BuilderSchema, AvailableBuilders } from '@webundsoehne/nx-builders/dist/schematics/init/main'

export default function (schema: NormalizedSchema): Rule {
  const builders = calculateDependencies(schema, true)

  return chain([
    // add builder and its dependencies
    addDepsToPackageJson(builders?.prod, builders?.dev),
    // call the init schematic with the items of your desire
    externalSchematic<BuilderSchema>('@webundsoehne/nx-builders', 'init', { items: [AvailableBuilders.TSC, AvailableBuilders.TS_NODE_DEV] })
  ])
}
```

## Utilizing Types

It is the best way to ensure the types are defined for builders in the architecht of schematic.

```typescript
import { TscBuilderOptions, TsNodeBuilderOptions } from '@webundsoehne/nx-builders'

export interface SchematicArchitect {
  [key: string]: any
  build: {
    executor: '@webundsoehne/nx-builders:tsc'
    options: TscBuilderOptions
  }

  serve: {
    executor: '@webundsoehne/nx-builders:ts-node-dev'
    options: TsNodeBuilderOptions
  }
}
```

# Builders

## TSC

Builder: `@webundsoehne/nx-builders:tsc`

This custom TypeScript compiler has additional properties to the generic one that can hard-swap TypeScript paths automatically and designating implicit dependencies for the packages that have dynamic imports where `nx` is not able to solve dependencies. Also in watch mode, this custom compiler runs `tsc-watch` instead of `tsc --watch` to be able to run scripts after building the package.

### Configuration

#### Build Mode

If you want to add this to an existing project or a new `nx` schematic, you can configure it as a minimum below. Where options fields must match with your directories.

```typescript
architect.build = {
  executor: '@webundsoehne/nx-builders:tsc',
  options: {
    cwd: options.root,
    main: `${options.root}/src/main.ts`,
    outputPath: `dist/${options.directory}`,
    tsConfig: `${options.root}/tsconfig.build.json`,
    swapPaths: true,
    assets: [
      {
        glob: '*',
        input: `${options.root}/config`,
        output: 'config'
      }
    ]
  }
}
```

#### Watch Mode

This custom implementation will swap TypeScript paths if desired, copy the required assets and pipe the output of `runAfterWatch` through a custom logger where it will prefix the name of the project to make it easily identifiable while running multiple packages in parallel.

You can do this in two ways.

- If you are using the utilizing `@webundsoehne/nx-builders:tsc` as the build command, you can execute `@nrwl/node` to run another command.

To run this in watch mode you can use `@nrwl/node` and change the serve command of the package. While your builder is configured to use the `@webundsoehne/nx-builders:tsc`, `@nrwl/node` will just pass in `watch` parameter automatically. But if you want to add a command to run after you have to add the variable `runAfterWatch` in the build itself.

```typescript
architect.build = {
  executor: '@webundsoehne/nx-builders:tsc',
  options: {
    cwd: options.root,
    main: `${options.root}/src/main.ts`,
    outputPath: `dist/${options.directory}`,
    tsConfig: `${options.root}/tsconfig.build.json`,
    runAfterWatch: 'NODE_SERVICE=server yarn start',
    swapPaths: true,
    assets: [
      {
        glob: '*',
        input: `${options.root}/config`,
        output: 'config'
      }
    ]
  }
}

architect.serve = {
  executor: '@webundsoehne/nx-builders:execute',
  options: {
    buildTarget: '${options.name}:build',
    // this will inject options to the tsc-watch builder
    inject: {
      // you have to have a valid command since this will be run inside the
      runAfterWatch: 'yarn start -r source-map-support/register',
      sourceMap: true,
      environment: {
        NODE_ENV: 'develop'
      }
    }
  }
}
```

- Directly overwriting the serve command.

```typescript
architect.serve = {
  executor: '@webundsoehne/nx-builders:tsc',
  options: {
    cwd: options.root,
    main: `${options.root}/src/main.ts`,
    outputPath: `dist/${options.directory}`,
    tsConfig: `${options.root}/tsconfig.build.json`,
    watch: true,
    runAfterWatch: 'NODE_SERVICE=server yarn start',
    swapPaths: true,
    assets: [
      {
        glob: '*',
        input: `${options.root}/config`,
        output: 'config'
      }
    ]
  }
}
```

#### Ignore assets

You can exclude certain files or directories that are copied over in the assets option, using the `ignore` property. It takes an array of glob expressions that match the desired files/directories to be excluded.

```typescript
assets: [
  {
    glob: '*',
    ignore: ['**/*.ts'],
    input: `${options.root}/config`,
    output: 'config'
  }
]
```

For more information about globbing patterns please refer to [fast-glob](https://www.npmjs.com/package/fast-glob) documentation.

## ts-node-dev

Builder: `@webundsoehne/nx-builders:ts-node-dev`

This `ts-node-dev` will run the project in the source folder directly, where all the assets will be in place. It is configured to register TypeScript paths as default. It will pipe the output through a custom logger where it will prefix the name of the project to make it easily identifiable while running multiple packages in parallel.

### Configuration

If you want to add this to an existing project or a new `nx` schematic. You can configure it as minimum below. Where options fields must match with your directories.

```typescript
architect.serve = {
  executor: '@webundsoehne/nx-builders:ts-node-dev',
  options: {
    cwd: options.root,
    main: join(options.root, 'src/main.ts'),
    tsConfig: join(options.root, 'tsconfig.json'),
    environment: {
      NODE_SERVICE: 'server'
    }
  }
}
```

## run

Builder: `@webundsoehne/nx-builders:run`

Run a cli like `webpack` from `node_modules`. The logs from it will be appended with the application name, and you can run anything and create a custom task with it.

### Configuration

If you want to add this to an existing project or a new `nx` schematic. You can configure it as minimum below. Where options fields must match with your directories.

```typescript
architect.serve = {
  executor: '@webundsoehne/nx-builders:run',
  options: {
    // ...
  }
}
```

- Command and args will be interpolated by jinja and all the options will be passed in the builder itself. So jinja templating is possible.
- You can either run this in node mode which will find the node binary you target from the `node_modules` or in the command mode.
- Watch mode keeps alive the process even if it crashes.

```typescript
/**
 * Options for run builder
 */
export interface RunBuilderOptions extends JsonObject {
  /**
   * process current working directory
   *
   * this will spawn the process from the current working directory so most of the plugins will work as expected
   */
  cwd: string

  /** command */
  command: string

  /** append arguments to the command */
  args?: string | string[]

  /** run with interactive mode, will not parse through the logger */
  interactive: boolean

  /** run with node */
  node: boolean

  /** pass in node options when running as node */
  nodeOptions?: string

  /** keep alive the process if it crashes */
  watch: boolean

  /** environment variables */
  environment?: Record<string, string>
}
```

## execute

Builder: `@webundsoehne/nx-builders:execute`

This builder is a jumper to run another builders first then run a shell command in selected working directory if you so desire.

### Configuration

```typescript
architect.anything = {
  executor: '@webundsoehne/nx-builders:execute',
  options: {
    // ...
  }
}
```

These options are valid for this builder.

- It will first run for `waitUntilTargets` to run builders in workspace.
- It will then run `buildTarget` builder.
  - You can inject options to `buildTarget` through `inject` key.
- Then it will change to `cwd` if defined and run shell command `runAfter`.
  - You can inject environment variables through `environment` key-

```typescript
/**
 * Options for execute
 */
export interface ExecuteBuilderOptions extends JsonObject {
  /**
   * Run the command in a working directory
   */
  cwd?: string
  /**
   * The target to build before starting the process
   */
  buildTarget: string
  /**
   * Run after the tasks has been finished building
   */
  runAfter?: string
  /**
   * Wait until targets to finish before executing
   */
  waitUntilTargets?: string[]
  /**
   * Watch parameter for passing in to the target
   */
  watch?: boolean
  /**
   * inject schematic options to the target
   */
  inject?: Record<string, any>
  /**
   * keep alive the process
   */
  keepAlive?: boolean
  /**
   * Inject env variables to the run after build
   */
  environment?: Record<string, string>
}
```
