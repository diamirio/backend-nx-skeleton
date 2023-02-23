<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

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

- [`ws-path-package apply`](#ws-path-package-apply)
- [`ws-path-package create`](#ws-path-package-create)
- [`ws-path-package help [COMMAND]`](#ws-path-package-help-command)
- [`ws-path-package list`](#ws-path-package-list)
- [`ws-path-package ls`](#ws-path-package-ls)
- [`ws-path-package patch`](#ws-path-package-patch)

## `ws-path-package apply`

Patches or reserves given patches in a directory.

```
USAGE
  $ ws-path-package apply [-d <value>] [-p <value>] [-e] [-r]

FLAGS
  -d, --directory=<value>  Directory to apply the patches from.
  -e, --exitOnError        Whether to exit on error if the patching process fails or not.
  -p, --path=<value>       [default: /builds/uPVEBfmT/0/bdsm/nx-skeleton/packages/patch-package] Directory to apply
                           patches to.
  -r, --reverse            Reverses the patches, if they were applied before.

DESCRIPTION
  Patches or reserves given patches in a directory.

ALIASES
  $ ws-path-package apply

EXAMPLES
  Only apply certain patches with: patch-package apply graphql+15.5.0 class-validator+0.4.0

  Use extended glob patterns: patch-package patch "graphql*"
```

## `ws-path-package create`

Creates a new patch from scratch, just point the applications you want as package name.

```
USAGE
  $ ws-path-package create [-d <value>] [-p <value>] [-i <value>] [-e <value>]

FLAGS
  -d, --directory=<value>   [default: patches] Directory for outputting the patch files.
  -e, --exclude=<value>...  [default: package.json] Exclude given regex patterns.
  -i, --include=<value>...  [default: .*] Include given regex patterns.
  -p, --path=<value>        [default: /builds/uPVEBfmT/0/bdsm/nx-skeleton/packages/patch-package] Directory to take root
                            as the application.

DESCRIPTION
  Creates a new patch from scratch, just point the applications you want as package name.

EXAMPLES
  Create a patch for given package: patch-package create graphql
```

_See code: [dist/commands/create.js](https://github.com/tailoredmedia/backend-nx-skeleton/blob/v1.0.0/dist/commands/create.js)_

## `ws-path-package help [COMMAND]`

Display help for ws-path-package.

```
USAGE
  $ ws-path-package help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ws-path-package.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.19/src/commands/help.ts)_

## `ws-path-package list`

Lists all the static entities that are shipped with this module.

```
USAGE
  $ ws-path-package list

DESCRIPTION
  Lists all the static entities that are shipped with this module.

ALIASES
  $ ws-path-package ls
```

_See code: [dist/commands/list.js](https://github.com/tailoredmedia/backend-nx-skeleton/blob/v1.0.0/dist/commands/list.js)_

## `ws-path-package ls`

Lists all the static entities that are shipped with this module.

```
USAGE
  $ ws-path-package ls

DESCRIPTION
  Lists all the static entities that are shipped with this module.

ALIASES
  $ ws-path-package ls
```

## `ws-path-package patch`

Patches or reserves given patches in a directory.

```
USAGE
  $ ws-path-package patch [-d <value>] [-p <value>] [-e] [-r]

FLAGS
  -d, --directory=<value>  Directory to apply the patches from.
  -e, --exitOnError        Whether to exit on error if the patching process fails or not.
  -p, --path=<value>       [default: /builds/uPVEBfmT/0/bdsm/nx-skeleton/packages/patch-package] Directory to apply
                           patches to.
  -r, --reverse            Reverses the patches, if they were applied before.

DESCRIPTION
  Patches or reserves given patches in a directory.

ALIASES
  $ ws-path-package apply

EXAMPLES
  Only apply certain patches with: patch-package apply graphql+15.5.0 class-validator+0.4.0

  Use extended glob patterns: patch-package patch "graphql*"
```

_See code: [dist/commands/patch.js](https://github.com/tailoredmedia/backend-nx-skeleton/blob/v1.0.0/dist/commands/patch.js)_

<!-- commandsstop -->
