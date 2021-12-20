[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/patch-package

[![Version](https://img.shields.io/npm/v/@webundsoehne/patch-package.svg)](https://npmjs.org/package/@webundsoehne/patch-package) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/patch-package.svg)](https://npmjs.org/package/@webundsoehne/patch-package) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/patch-package)](https://npmjs.org/package/@webundsoehne/patch-package) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

`patch-package` is derived from the original to create `git` patches and apply them. This package also consists the common patches, where you can apply with the `cli`. The main difference is this has been made more monorepo capable comparing to the original as well holding the general patches.

- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [@webundsoehne/patch-package](#webundsoehnepatch-package)
- [Description](#description)
- [Commands](#commands)
<!-- tocstop -->

---

# Commands

<!-- commands -->

- [`patch-package `](#patch-package-)
- [`patch-package create`](#patch-package-create)
- [`patch-package help [COMMAND]`](#patch-package-help-command)
- [`patch-package patch`](#patch-package-patch)

## `patch-package `

```
USAGE
  $ patch-package
```

## `patch-package create`

Creates a new patch from scratch, just point the applications you want as package name.

```
USAGE
  $ patch-package create

OPTIONS
  -d, --directory=directory  [default: patches] Directory for outputing the patch files.
  -e, --exclude=exclude      [default: package.json] Exclude given regex patterns.
  -i, --include=include      [default: .*] Include given regex patterns.

  -p, --path=path            [default: /builds/bdsm/nx-skeleton/packages/patch-package] Directory to take root as the
                             application.

EXAMPLE
  Create a patch for given package: patch-package create graphql
```

## `patch-package help [COMMAND]`

display help for patch-package

```
USAGE
  $ patch-package help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.18/src/commands/help.ts)_

## `patch-package patch`

Patches or reserves given patches in a directory.

```
USAGE
  $ patch-package patch

OPTIONS
  -d, --directory=directory  Directory to apply the patches from.
  -e, --exitOnError          Whether to exit on error if the patching process fails or not.
  -p, --path=path            [default: /builds/bdsm/nx-skeleton/packages/patch-package] Directory to apply patches to.
  -r, --reverse              Reverses the patches, if they were applied before.

ALIASES
  $ patch-package apply

EXAMPLES
  Only apply certain patches with: patch-package apply graphql+15.5.0 class-validator+0.4.0
  Use extended glob patterns: patch-package patch "graphql*"
```

<!-- commandsstop -->
