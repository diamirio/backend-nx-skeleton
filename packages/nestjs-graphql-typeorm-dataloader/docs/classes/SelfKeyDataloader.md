[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / SelfKeyDataloader

# Class: SelfKeyDataloader<V\>

A common loader for loading entities by their own key.

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- `DataLoader`<`any`, `V`[]\>

  ↳ **`SelfKeyDataloader`**

## Table of contents

### Constructors

- [constructor](SelfKeyDataloader.md#constructor)

### Methods

- [clear](SelfKeyDataloader.md#clear)
- [clearAll](SelfKeyDataloader.md#clearall)
- [load](SelfKeyDataloader.md#load)
- [loadMany](SelfKeyDataloader.md#loadmany)
- [prime](SelfKeyDataloader.md#prime)

## Constructors

### constructor

• **new SelfKeyDataloader**<`V`\>(`relation`, `connection`, `selfKeyFunc`)

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `relation` | `RelationMetadata` |
| `connection` | `Connection` |
| `selfKeyFunc` | `SelfKeyFunc` |

#### Overrides

DataLoader&lt;any, V[]\&gt;.constructor

#### Defined in

packages/nestjs-graphql-typeorm-dataloader/src/loaders/self-key.loader.ts:12

## Methods

### clear

▸ **clear**(`key`): [`SelfKeyDataloader`](SelfKeyDataloader.md)<`V`\>

Clears the value at `key` from the cache, if it exists. Returns itself for
method chaining.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

[`SelfKeyDataloader`](SelfKeyDataloader.md)<`V`\>

#### Inherited from

DataLoader.clear

#### Defined in

node_modules/dataloader/index.d.ts:46

___

### clearAll

▸ **clearAll**(): [`SelfKeyDataloader`](SelfKeyDataloader.md)<`V`\>

Clears the entire cache. To be used when some event results in unknown
invalidations across this particular `DataLoader`. Returns itself for
method chaining.

#### Returns

[`SelfKeyDataloader`](SelfKeyDataloader.md)<`V`\>

#### Inherited from

DataLoader.clearAll

#### Defined in

node_modules/dataloader/index.d.ts:53

___

### load

▸ **load**(`key`): `Promise`<`V`[]\>

Loads a key, returning a `Promise` for the value represented by that key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

`Promise`<`V`[]\>

#### Inherited from

DataLoader.load

#### Defined in

node_modules/dataloader/index.d.ts:25

___

### loadMany

▸ **loadMany**(`keys`): `Promise`<(`V`[] \| `Error`)[]\>

Loads multiple keys, promising an array of values:

    var [ a, b ] = await myLoader.loadMany([ 'a', 'b' ]);

This is equivalent to the more verbose:

    var [ a, b ] = await Promise.all([
      myLoader.load('a'),
      myLoader.load('b')
    ]);

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `ArrayLike`<`any`\> |

#### Returns

`Promise`<(`V`[] \| `Error`)[]\>

#### Inherited from

DataLoader.loadMany

#### Defined in

node_modules/dataloader/index.d.ts:40

___

### prime

▸ **prime**(`key`, `value`): [`SelfKeyDataloader`](SelfKeyDataloader.md)<`V`\>

Adds the provied key and value to the cache. If the key already exists, no
change is made. Returns itself for method chaining.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |
| `value` | `V`[] \| `Error` |

#### Returns

[`SelfKeyDataloader`](SelfKeyDataloader.md)<`V`\>

#### Inherited from

DataLoader.prime

#### Defined in

node_modules/dataloader/index.d.ts:59
