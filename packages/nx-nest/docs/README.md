@webundsoehne-private/nx-nest

# @webundsoehne-private/nx-nest

## Table of contents

### Enumerations

- [AvailableComponents](enums/AvailableComponents.md)
- [AvailableDBAdapters](enums/AvailableDBAdapters.md)
- [AvailableDBTypes](enums/AvailableDBTypes.md)
- [AvailableExtensions](enums/AvailableExtensions.md)
- [AvailableGenerators](enums/AvailableGenerators.md)
- [AvailableMicroserviceTypes](enums/AvailableMicroserviceTypes.md)
- [AvailableServerAdapters](enums/AvailableServerAdapters.md)
- [AvailableServerTypes](enums/AvailableServerTypes.md)
- [SchematicConstants](enums/SchematicConstants.md)

### Interfaces

- [GeneratedMicroserviceCasing](interfaces/GeneratedMicroserviceCasing.md)

### Variables

- [AvailableExtensionsMap](README.md#availableextensionsmap)
- [PrettyNamesForAvailableThingies](README.md#prettynamesforavailablethingies)

### Functions

- [generateMicroserviceCasing](README.md#generatemicroservicecasing)

## Variables

### AvailableExtensionsMap

• **AvailableExtensionsMap**: `ExtensionsMap`<typeof [`AvailableExtensions`](enums/AvailableExtensions.md), `ApplicationNormalizedSchema`\>

#### Defined in

interfaces/available.constants.ts:65

---

### PrettyNamesForAvailableThingies

• **PrettyNamesForAvailableThingies**: `PrettyNames`<[`AvailableComponents`](enums/AvailableComponents.md) \| [`AvailableServerTypes`](enums/AvailableServerTypes.md) \| [`AvailableServerAdapters`](enums/AvailableServerAdapters.md) \| [`AvailableDBTypes`](enums/AvailableDBTypes.md) \| [`AvailableMicroserviceTypes`](enums/AvailableMicroserviceTypes.md) \| [`AvailableExtensions`](enums/AvailableExtensions.md)\>

Prettified names for components to use with prompts and such.

#### Defined in

interfaces/available.constants.ts:86

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

utils/generate-microservice-casing.ts:4
