[@webundsoehne/nestjs-util](../README.md) / ConfigService

# Class: ConfigService

## Table of contents

### Constructors

- [constructor](ConfigService.md#constructor)

### Methods

- [get](ConfigService.md#get)
- [has](ConfigService.md#has)
- [setModuleConfig](ConfigService.md#setmoduleconfig)
- [get](ConfigService.md#get-1)
- [has](ConfigService.md#has-1)
- [setModuleConfig](ConfigService.md#setmoduleconfig-1)

## Constructors

### constructor

• **new ConfigService**()

## Methods

### get

▸ **get**<`T`\>(`path`, `defaultValue?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

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
| `T` | `any` |

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
