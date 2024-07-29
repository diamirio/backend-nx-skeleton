<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nx-workspace

[![Version](https://img.shields.io/npm/v/@webundsoehne/nx-workspace.svg)](https://npmjs.org/package/@webundsoehne/nx-workspace) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nx-workspace.svg)](https://npmjs.org/package/@webundsoehne/nx-workspace) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nx-workspace)](https://npmjs.org/package/@webundsoehne/nx-workspace) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

This package includes the preset of a [nx](https://github.com/nrwl/nx) workspace. This can be used with the `npx create-nx-workspace` command.

- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Generators](#generators)
  - [Workspace](#workspace)
  - [Move](#move)
  - [Remove](#remove)
  - [Library](#library)

<!-- tocstop -->

---

# Generators

## Workspace

Workspace is defined as `preset` generator that can be called as `--preset @webundsoehne/nx-workspace` through the `create-nx-workspace` (or `generate`) command.

```shell
# via create-nx-workspace
npx create-nx-workspace --ci=skip --preset=@webunsoehne/nx-weokspace
# with generate inside an existing nx-workspace
nx generate @webunsoehne/nx-workspace:workspace
```

## Move

Move a project to a new destination. Extends the `@nx/workspace:move` generator, but adds more user interaction and better rename support. <br> i.e. Renaming a project is possible without setting the full destination path

```shell
# interactive mode
nx generate @webunsoehne/nx-workspace:move

# quick rename
nx generate @webunsoehne/nx-workspace:move [old-name] [new-name]

# equivalent in interactive mode:
# nx generate @lib/gen:move
#
#✔ Which project should be moved? · [old-name]
#✔ Where should the project be moved to? · [new-name]

# move to different folder
nx generate @webunsoehne/nx-workspace:move [name] folder/path/[name]
```

## Remove

Remove a project from the workspace. Extends the `@nx/workspace:remove` generator, but adds more user interaction. (Use `--force` to remove a project even if still in use by other projects.)

```shell
# interactive mode
nx generate @webunsoehne/nx-workspace:remove

# cli mode
nx generate @webunsoehne/nx-workspace:remove [name] --force
```

## Library

Adds a new library to the workspace. Simple empty library with optional jest setup. (Use `--skipPackageJson` to skip adding jest packages as devDependencies)

```shell
# interactive mode
nx generate @webunsoehne/nx-workspace:library
nx generate @webunsoehne/nx-workspace:lib

# setup with jest
nx generate @webunsoehne/nx-workspace:library [name] --jest
```
