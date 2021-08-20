[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / ConfigService

# Class: ConfigService

[index](../modules/index.md).ConfigService

## Table of contents

### Constructors

- [constructor](index.ConfigService.md#constructor)

### Methods

- [get](index.ConfigService.md#get)
- [has](index.ConfigService.md#has)
- [setModuleConfig](index.ConfigService.md#setmoduleconfig)
- [get](index.ConfigService.md#get)
- [has](index.ConfigService.md#has)
- [setModuleConfig](index.ConfigService.md#setmoduleconfig)

## Constructors

### constructor

• **new ConfigService**()

## Methods

### get

▸ **get**<`T`\>(`path`, `defaultValue?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown``any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `defaultValue?` | `T` |

#### Returns

`T`

#### Defined in

packages/nestjs-util/src/provider/config/config.service.ts:59

___

### has

▸ **has**(`path`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Defined in

packages/nestjs-util/src/provider/config/config.service.ts:55

___

### setModuleConfig

▸ **setModuleConfig**(`moduleName`, `moduleConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleName` | `string` |
| `moduleConfig` | `Config` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/provider/config/config.service.ts:63

___

### get

▸ `Static` **get**<`T`\>(`path`, `defaultValue?`): `T`

Get the config or use default value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown``any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `defaultValue?` | `T` |

#### Returns

`T`

#### Defined in

packages/nestjs-util/src/provider/config/config.service.ts:15

___

### has

▸ `Static` **has**(`path`): `boolean`

Check if the config exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Defined in

packages/nestjs-util/src/provider/config/config.service.ts:33

___

### setModuleConfig

▸ `Static` **setModuleConfig**(`moduleName`, `moduleConfig`): `void`

Set module config value at runtime

__Note:__
This only works if the "ALLOW_CONFIG_MUTATIONS" environment variable is set

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleName` | `string` |
| `moduleConfig` | `Config` |

#### Returns

`void`

#### Defined in

packages/nestjs-util/src/provider/config/config.service.ts:51
