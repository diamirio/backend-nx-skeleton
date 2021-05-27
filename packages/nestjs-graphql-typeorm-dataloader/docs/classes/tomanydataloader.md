[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / ToManyDataloader

# Class: ToManyDataloader<V\>

A common loader to handle to many relations.

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- *DataLoader*<any, V\>

  ↳ **ToManyDataloader**

## Table of contents

### Constructors

- [constructor](tomanydataloader.md#constructor)

### Methods

- [clear](tomanydataloader.md#clear)
- [clearAll](tomanydataloader.md#clearall)
- [load](tomanydataloader.md#load)
- [loadMany](tomanydataloader.md#loadmany)
- [prime](tomanydataloader.md#prime)

## Constructors

### constructor

\+ **new ToManyDataloader**<V\>(`relation`: *RelationMetadata*, `connection`: *Connection*): [*ToManyDataloader*](tomanydataloader.md)<V\>

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `relation` | *RelationMetadata* |
| `connection` | *Connection* |

**Returns:** [*ToManyDataloader*](tomanydataloader.md)<V\>

Overrides: DataLoader&lt;any, V\&gt;.constructor

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/loaders/to-many.loader.ts:10

## Methods

### clear

▸ **clear**(`key`: *any*): [*ToManyDataloader*](tomanydataloader.md)<V\>

Clears the value at `key` from the cache, if it exists. Returns itself for
method chaining.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *any* |

**Returns:** [*ToManyDataloader*](tomanydataloader.md)<V\>

Inherited from: DataLoader.clear

Defined in: node_modules/dataloader/index.d.ts:46

___

### clearAll

▸ **clearAll**(): [*ToManyDataloader*](tomanydataloader.md)<V\>

Clears the entire cache. To be used when some event results in unknown
invalidations across this particular `DataLoader`. Returns itself for
method chaining.

**Returns:** [*ToManyDataloader*](tomanydataloader.md)<V\>

Inherited from: DataLoader.clearAll

Defined in: node_modules/dataloader/index.d.ts:53

___

### load

▸ **load**(`key`: *any*): *Promise*<V\>

Loads a key, returning a `Promise` for the value represented by that key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *any* |

**Returns:** *Promise*<V\>

Inherited from: DataLoader.load

Defined in: node_modules/dataloader/index.d.ts:25

___

### loadMany

▸ **loadMany**(`keys`: *ArrayLike*<any\>): *Promise*<(Error \| V)[]\>

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
| `keys` | *ArrayLike*<any\> |

**Returns:** *Promise*<(Error \| V)[]\>

Inherited from: DataLoader.loadMany

Defined in: node_modules/dataloader/index.d.ts:40

___

### prime

▸ **prime**(`key`: *any*, `value`: Error \| V): [*ToManyDataloader*](tomanydataloader.md)<V\>

Adds the provied key and value to the cache. If the key already exists, no
change is made. Returns itself for method chaining.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *any* |
| `value` | Error \| V |

**Returns:** [*ToManyDataloader*](tomanydataloader.md)<V\>

Inherited from: DataLoader.prime

Defined in: node_modules/dataloader/index.d.ts:59
