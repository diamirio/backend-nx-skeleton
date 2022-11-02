<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/brownie

[![Version](https://img.shields.io/npm/v/@webundsoehne/brownie.svg)](https://npmjs.org/package/@webundsoehne/brownie) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/brownie.svg)](https://npmjs.org/package/@webundsoehne/brownie) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/brownie)](https://npmjs.org/package/@webundsoehne/brownie) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

Brownie will help scaffold `@nrwl/nx` projects, create a custom workspace compatible with internal Web&Söhne projects, generate basic docker configuration and gitlab-ci configuration.

- [Changelog](./CHANGELOG.md)

<!-- toc -->
* [@webundsoehne/brownie](#webundsoehnebrownie)
* [Description](#description)
* [Commands](#commands)
<!-- tocstop -->

---

# Commands

<!-- commands -->
* [`brownie ci`](#brownie-ci)
* [`brownie docker`](#brownie-docker)
* [`brownie gitlab`](#brownie-gitlab)
* [`brownie help [COMMAND]`](#brownie-help-command)
* [`brownie nx`](#brownie-nx)
* [`brownie workspace`](#brownie-workspace)
* [`brownie ws`](#brownie-ws)

## `brownie ci`

Create a gitlab ci configuration from known NX configuration.

```
USAGE
  $ brownie ci

DESCRIPTION
  Create a gitlab ci configuration from known NX configuration.

ALIASES
  $ brownie ci
```

## `brownie docker`

Create docker-compose configuration from boilerplates.

```
USAGE
  $ brownie docker [-f] [-o <value>] [-v] [-e] [-F <value>] [-V <value>] [-F <value>]

FLAGS
  -F, --file=<value>            [default: docker-compose.yml] Compose file path.
  -F, --files-folder=<value>    [default: files] Output to included folder.
  -V, --volumes-folder=<value>  [default: volumes] Output to volumes folder.
  -e, --expose                  Expose ports from the container.
  -f, --force                   Force overwrites.
  -o, --output=<value>          [default: .docker] Output folder for the Docker files.
  -v, --volume                  Use optional persistent volumes with the containers.

DESCRIPTION
  Create docker-compose configuration from boilerplates.
```

_See code: [dist/commands/docker/index.js](https://github.com/tailoredmedia/backend-nx-skeleton/blob/v1.0.0/dist/commands/docker/index.js)_

## `brownie gitlab`

Create a gitlab ci configuration from known NX configuration.

```
USAGE
  $ brownie gitlab

DESCRIPTION
  Create a gitlab ci configuration from known NX configuration.

ALIASES
  $ brownie ci
```

_See code: [dist/commands/gitlab/index.js](https://github.com/tailoredmedia/backend-nx-skeleton/blob/v1.0.0/dist/commands/gitlab/index.js)_

## `brownie help [COMMAND]`

Display help for brownie.

```
USAGE
  $ brownie help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for brownie.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.17/src/commands/help.ts)_

## `brownie nx`

Configure NX modules.

```
USAGE
  $ brownie nx [-d] [-m yarn|npm] [-s] [-a]

FLAGS
  -a, --arguments                   Enable prompt for passing in arguments.
  -d, --develop                     Puts the underlying schematics to development mode, if they support it.
  -m, --package-manager=(yarn|npm)  [default: npm] Use the given package manager to do the install/update operations.
  -s, --skip-updates                Skip the dependency updates.

DESCRIPTION
  Configure NX modules.
```

_See code: [dist/commands/nx/index.js](https://github.com/tailoredmedia/backend-nx-skeleton/blob/v1.0.0/dist/commands/nx/index.js)_

## `brownie workspace`

Create a new workspace with NX.

```
USAGE
  $ brownie workspace [-d] [-m yarn|npm] [-s] [-f]

FLAGS
  -d, --develop                     Puts the underlying schematics to development mode, if they support it.
  -f, --force                       Force override for schematic.
  -m, --package-manager=(yarn|npm)  [default: npm] Use the given package manager to do the install/update operations.
  -s, --skip-updates                Skip the dependency updates.

DESCRIPTION
  Create a new workspace with NX.

ALIASES
  $ brownie ws
```

_See code: [dist/commands/workspace/index.js](https://github.com/tailoredmedia/backend-nx-skeleton/blob/v1.0.0/dist/commands/workspace/index.js)_

## `brownie ws`

Create a new workspace with NX.

```
USAGE
  $ brownie ws [-d] [-m yarn|npm] [-s] [-f]

FLAGS
  -d, --develop                     Puts the underlying schematics to development mode, if they support it.
  -f, --force                       Force override for schematic.
  -m, --package-manager=(yarn|npm)  [default: npm] Use the given package manager to do the install/update operations.
  -s, --skip-updates                Skip the dependency updates.

DESCRIPTION
  Create a new workspace with NX.

ALIASES
  $ brownie ws
```
<!-- commandsstop -->
