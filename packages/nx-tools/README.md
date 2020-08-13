![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nx-tools

[![Version](https://img.shields.io/npm/v/@webundsoehne/nx-tools.svg)](https://npmjs.org/package/@webundsoehne/nx-tools) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nx-tools.svg)](https://npmjs.org/package/@webundsoehne/nx-tools) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nx-tools)](https://npmjs.org/package/@webundsoehne/nx-tools) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<!-- toc -->
<!-- tocstop -->

# Description

This package includes [@nrwl/nx](https://github.com/nrwl/nx) some tools to be commonly used in the schematics.

All the functions are imported from the root of the project.

## Init

### `installWorkspaceDependencies`

Used for installing the dependencies of the whole workspace if the `yarn workspaces` has been enabled.

### `parseArguments`

Used for parsing comma-separated string variables passed into builder like `--roots packages/asd,something/asd`. It can be configured to return multiple values in an array of the desired type. Can just accept a single value, can make the value required, and throw an error if not found.

## Integration

### `updateBrownieIntegration`

Used for adding data for later use with brownie. It will add data to `nx.json` under the appropriate package name.

### `updateNxIntegration`

Used for updating the `nx.json` `integration` field to keep some variables like prior generated template configuration in the workspace.

## Rules

### `applyOverwriteWithDiff`

A complicated setup of `nx` initiate template files where it is possible to diff-merge depending on the older, current, and upcoming generated files from the template. It has the functionality to delete older files.

## Utils

### `readPackageJsonFromPath`

Reads the package.json from the given path and parses it.

### `writePackageJsonToPath`

Write the package.json in the given path.

### `createDependenciesForProjectFromGraph`

Will create dependencies from the `nx` project graph. Not very good at detecting dynamic imports.

### `mergeDependencies`

Will merge multiple dependency tree in to one, omitting the duplicates.

### `getWorkspace`

Will get the workspace root.

### `formatFiles`

Format a given tree with prettier or eslint or even both.

### `Logger`

An `angular` specific logger for accessing through from other utils. It will prefix the name of the package if available and has a beautified interface.

### `replaceExtension`

Replaces extension.

### `removePathRoot`

Removes the root path from the absolute path.

### `pipeProcessToLogger`

Pipes a child process' output through the logger for prefixing the package name.

### `ProcessManager`

Creates a process manager where you can track the available processes. It will log the output through the logger automatically and kill all process trees if the user desires.

### `jinjaTemplate`

Creates a new jinja compatible nunjucks templating engine.
