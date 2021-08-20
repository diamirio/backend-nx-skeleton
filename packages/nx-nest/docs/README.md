@webundsoehne-private/nx-nest

# @webundsoehne-private/nx-nest

## Table of contents

### Enumerations

- [AvailableComponents](enums/AvailableComponents.md)
- [AvailableDBAdapters](enums/AvailableDBAdapters.md)
- [AvailableDBTypes](enums/AvailableDBTypes.md)
- [AvailableMicroserviceTypes](enums/AvailableMicroserviceTypes.md)
- [AvailableServerTypes](enums/AvailableServerTypes.md)
- [AvailableTestsTypes](enums/AvailableTestsTypes.md)
- [SchematicConstants](enums/SchematicConstants.md)

### Interfaces

- [GeneratedMicroserviceCasing](interfaces/GeneratedMicroserviceCasing.md)

### Type aliases

- [AvailableLinterTypes](README.md#availablelintertypes)

### Variables

- [PrettyNamesForAvailableThingies](README.md#prettynamesforavailablethingies)

### Functions

- [generateMicroserviceCasing](README.md#generatemicroservicecasing)

## Type aliases

### AvailableLinterTypes

Ƭ **AvailableLinterTypes**: `Exclude`<`Linter`, `"tslint"`\>

Available Linters

#### Defined in

interfaces/available.constants.ts:59

## Variables

### PrettyNamesForAvailableThingies

• `Const` **PrettyNamesForAvailableThingies**: `Record`<[`AvailableComponents`](enums/AvailableComponents.md) \| [`AvailableServerTypes`](enums/AvailableServerTypes.md) \| [`AvailableDBTypes`](enums/AvailableDBTypes.md) \| [`AvailableTestsTypes`](enums/AvailableTestsTypes.md) \| [`AvailableMicroserviceTypes`](enums/AvailableMicroserviceTypes.md), `string`\>

Prettified names for components to use with prompts and such.

#### Defined in

interfaces/available.constants.ts:64

## Functions

### generateMicroserviceCasing

▸ **generateMicroserviceCasing**(`name`): [`GeneratedMicroserviceCasing`](interfaces/GeneratedMicroserviceCasing.md)

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

[`GeneratedMicroserviceCasing`](interfaces/GeneratedMicroserviceCasing.md)

#### Defined in

utils/generate-microservice-casing.ts:5
