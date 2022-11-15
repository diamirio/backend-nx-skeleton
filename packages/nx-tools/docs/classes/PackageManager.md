[@webundsoehne/nx-tools](../README.md) / PackageManager

# Class: PackageManager

## Table of contents

### Constructors

- [constructor](PackageManager.md#constructor)

### Properties

- [ctx](PackageManager.md#ctx)
- [globalFolder](PackageManager.md#globalfolder)
- [globalLinkFolder](PackageManager.md#globallinkfolder)
- [logger](PackageManager.md#logger)
- [manager](PackageManager.md#manager)
- [instance](PackageManager.md#instance)

### Methods

- [checkIfModuleInstalled](PackageManager.md#checkifmoduleinstalled)
- [command](PackageManager.md#command)
- [isPackageManagerPackageAction](PackageManager.md#ispackagemanagerpackageaction)
- [isPackageManagerPackageWithCommandAction](PackageManager.md#ispackagemanagerpackagewithcommandaction)
- [isPackageManagerPackageWithoutCommandAction](PackageManager.md#ispackagemanagerpackagewithoutcommandaction)
- [parser](PackageManager.md#parser)

## Constructors

### constructor

• **new PackageManager**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.manager?` | [`AvailablePackageManagers`](../enums/AvailablePackageManagers.md) |

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:31

## Properties

### ctx

• `Private` **ctx**: [`PackageManagerCtx`](../interfaces/PackageManagerCtx.md)

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:28

___

### globalFolder

• **globalFolder**: `string`[] = `[]`

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:25

___

### globalLinkFolder

• **globalLinkFolder**: `string`[] = `[]`

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:26

___

### logger

• `Private` **logger**: [`Logger`](Logger.md)

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:29

___

### manager

• **manager**: [`AvailablePackageManagers`](../enums/AvailablePackageManagers.md)

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:27

___

### instance

▪ `Static` **instance**: [`PackageManager`](PackageManager.md)

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:24

## Methods

### checkIfModuleInstalled

▸ **checkIfModuleInstalled**(`pkg`, `options?`): `Promise`<[`LocalNodeModule`](../interfaces/LocalNodeModule.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkg` | [`NodeDependency`](../README.md#nodedependency) \| [`NodeDependency`](../README.md#nodedependency)[] |
| `options?` | [`CheckNodeModuleInstalledOptions`](../interfaces/CheckNodeModuleInstalledOptions.md) |

#### Returns

`Promise`<[`LocalNodeModule`](../interfaces/LocalNodeModule.md)[]\>

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:169

___

### command

▸ **command**(`command`, `manager?`): `string`

Returns the selected commands from the current package manager.

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | [`PackageManagerUsableCommands`](../enums/PackageManagerUsableCommands.md) |
| `manager?` | [`AvailablePackageManagers`](../enums/AvailablePackageManagers.md) |

#### Returns

`string`

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:68

___

### isPackageManagerPackageAction

▸ `Private` **isPackageManagerPackageAction**(`data`): data is PackageManagerPackageAction

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`PackageManagerActions`](../README.md#packagemanageractions) |

#### Returns

data is PackageManagerPackageAction

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:395

___

### isPackageManagerPackageWithCommandAction

▸ `Private` **isPackageManagerPackageWithCommandAction**(`data`): data is PackageManagerWithCommandAction

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`PackageManagerActions`](../README.md#packagemanageractions) |

#### Returns

data is PackageManagerWithCommandAction

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:403

___

### isPackageManagerPackageWithoutCommandAction

▸ `Private` **isPackageManagerPackageWithoutCommandAction**(`data`): data is PackageManagerWithoutCommandAction

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`PackageManagerActions`](../README.md#packagemanageractions) |

#### Returns

data is PackageManagerWithoutCommandAction

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:411

___

### parser

▸ **parser**(`action`): [`PackageManagerParsedCommand`](../interfaces/PackageManagerParsedCommand.md)

This gets ctx.packages as input to perform the required operation

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`PackageManagerActions`](../README.md#packagemanageractions) |

#### Returns

[`PackageManagerParsedCommand`](../interfaces/PackageManagerParsedCommand.md)

#### Defined in

packages/nx-tools/src/utils/package-manager/package-manager.ts:76
