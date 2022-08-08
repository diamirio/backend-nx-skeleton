[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / ToOneDataloader

# Class: ToOneDataloader<V\>

A common loader to handle to one relations.

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- `DataLoader`<`any`, `V`\>

  ↳ **`ToOneDataloader`**

## Table of contents

### Constructors

- [constructor](ToOneDataloader.md#constructor)

### Methods

- [clear](ToOneDataloader.md#clear)
- [clearAll](ToOneDataloader.md#clearall)
- [load](ToOneDataloader.md#load)
- [loadMany](ToOneDataloader.md#loadmany)
- [prime](ToOneDataloader.md#prime)

## Constructors

### constructor

• **new ToOneDataloader**<`V`\>(`relation`, `connection`)

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `relation` | `RelationMetadata` |
| `connection` | `Connection` |

#### Overrides

DataLoader&lt;any, V\&gt;.constructor

#### Defined in

packages/nestjs-graphql-typeorm-dataloader/src/loaders/to-one.loader.ts:11

## Methods

### clear

▸ **clear**(`key`): [`ToOneDataloader`](ToOneDataloader.md)<`V`\>

Clears the value at `key` from the cache, if it exists. Returns itself for
method chaining.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

[`ToOneDataloader`](ToOneDataloader.md)<`V`\>

#### Inherited from

DataLoader.clear

#### Defined in

node_modules/dataloader/index.d.ts:46

___

### clearAll

▸ **clearAll**(): [`ToOneDataloader`](ToOneDataloader.md)<`V`\>

Clears the entire cache. To be used when some event results in unknown
invalidations across this particular `DataLoader`. Returns itself for
method chaining.

#### Returns

[`ToOneDataloader`](ToOneDataloader.md)<`V`\>

#### Inherited from

DataLoader.clearAll

#### Defined in

node_modules/dataloader/index.d.ts:53

___

### load

▸ **load**(`key`): `Promise`<`V`\>

Loads a key, returning a `Promise` for the value represented by that key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

`Promise`<`V`\>

#### Inherited from

DataLoader.load

#### Defined in

node_modules/dataloader/index.d.ts:25

___

### loadMany

▸ **loadMany**(`keys`): `Promise`<(`Error` \| `V`)[]\>

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

`Promise`<(`Error` \| `V`)[]\>

#### Inherited from

DataLoader.loadMany

#### Defined in

node_modules/dataloader/index.d.ts:40

___

### prime

▸ **prime**(`key`, `value`): [`ToOneDataloader`](ToOneDataloader.md)<`V`\>

Adds the provided key and value to the cache. If the key already exists, no
change is made. Returns itself for method chaining.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |
| `value` | `Error` \| `V` |

#### Returns

[`ToOneDataloader`](ToOneDataloader.md)<`V`\>

#### Inherited from

DataLoader.prime

#### Defined in

node_modules/dataloader/index.d.ts:59
