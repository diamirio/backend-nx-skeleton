[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/brownie

[![Version](https://img.shields.io/npm/v/@webundsoehne/brownie.svg)](https://npmjs.org/package/@webundsoehne/brownie) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/brownie.svg)](https://npmjs.org/package/@webundsoehne/brownie) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/brownie)](https://npmjs.org/package/@webundsoehne/brownie) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

Brownie will help scaffold `@nrwl/nx` projects, create a custom workspace compatabile with internal Web&Söhne projects, generate basic docker configuration and gitlab-ci configuration.

- [Changelog](./CHANGELOG.md)

<!-- toc -->
* [@webundsoehne/brownie](#webundsoehnebrownie)
* [Description](#description)
* [Commands](#commands)
<!-- tocstop -->

---

# Commands

<!-- commands -->
* [`brownie config:workspace`](#brownie-configworkspace)
* [`brownie docker`](#brownie-docker)
* [`brownie gitlab`](#brownie-gitlab)
* [`brownie help [COMMAND]`](#brownie-help-command)
* [`brownie nx`](#brownie-nx)
* [`brownie workspace`](#brownie-workspace)

## `brownie config:workspace`

Edit available workspace skeletons through a user interface.

```
USAGE
  $ brownie config:workspace
```

## `brownie docker`

Create docker-compose configuration from boilerplates.

```
USAGE
  $ brownie docker

OPTIONS
  -V, --volumes-folder=volumes-folder  [default: volumes] Output to volumes folder.
  -f, --force                          Force overwrites.
  -o, --output=output                  [default: .docker] Output folder for the Docker files.
  -v, --volume                         Use optional persistent volumes with the containers.
```

## `brownie gitlab`

Create a gitlab ci configuration from known NX configuration.

```
USAGE
  $ brownie gitlab

ALIASES
  $ brownie ci
```

## `brownie help [COMMAND]`

display help for brownie

```
USAGE
  $ brownie help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `brownie nx`

Configure NX modules.

```
USAGE
  $ brownie nx

OPTIONS
  -a, --arguments     Enable prompt for passing in arguments.
  -s, --skip-updates  Skip the dependency updates.
```

## `brownie workspace`

Create a new workspace with NX.

```
USAGE
  $ brownie workspace

OPTIONS
  -f, --force         Force override for schematic.
  -s, --skip-updates  Skip the dependency updates.

ALIASES
  $ brownie ws
```
<!-- commandsstop -->
