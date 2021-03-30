[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / ToManyDataloader

# Class: ToManyDataloader<V\>

## Type parameters

| Name |
| :--- |
| `V`  |

## Hierarchy

- _DataLoader_<any, V\>

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

\+ **new ToManyDataloader**<V\>(`relation`: _RelationMetadata_, `connection`: _Connection_): [_ToManyDataloader_](tomanydataloader.md)<V\>

#### Type parameters:

| Name |
| :--- |
| `V`  |

#### Parameters:

| Name         | Type               |
| :----------- | :----------------- |
| `relation`   | _RelationMetadata_ |
| `connection` | _Connection_       |

**Returns:** [_ToManyDataloader_](tomanydataloader.md)<V\>

Overrides: void

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/loaders/to-many.loader.ts:7

## Methods

### clear

▸ **clear**(`key`: _any_): [_ToManyDataloader_](tomanydataloader.md)<V\>

Clears the value at `key` from the cache, if it exists. Returns itself for method chaining.

#### Parameters:

| Name  | Type  |
| :---- | :---- |
| `key` | _any_ |

**Returns:** [_ToManyDataloader_](tomanydataloader.md)<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:46

---

### clearAll

▸ **clearAll**(): [_ToManyDataloader_](tomanydataloader.md)<V\>

Clears the entire cache. To be used when some event results in unknown invalidations across this particular `DataLoader`. Returns itself for method chaining.

**Returns:** [_ToManyDataloader_](tomanydataloader.md)<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:53

---

### load

▸ **load**(`key`: _any_): _Promise_<V\>

Loads a key, returning a `Promise` for the value represented by that key.

#### Parameters:

| Name  | Type  |
| :---- | :---- |
| `key` | _any_ |

**Returns:** _Promise_<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:25

---

### loadMany

▸ **loadMany**(`keys`: _ArrayLike_<any\>): _Promise_<(Error \| V)[]\>

Loads multiple keys, promising an array of values:

    var [ a, b ] = await myLoader.loadMany([ 'a', 'b' ]);

This is equivalent to the more verbose:

    var [ a, b ] = await Promise.all([
      myLoader.load('a'),
      myLoader.load('b')
    ]);

#### Parameters:

| Name   | Type              |
| :----- | :---------------- |
| `keys` | _ArrayLike_<any\> |

**Returns:** _Promise_<(Error \| V)[]\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:40

---

### prime

▸ **prime**(`key`: _any_, `value`: Error \| V): [_ToManyDataloader_](tomanydataloader.md)<V\>

Adds the provied key and value to the cache. If the key already exists, no change is made. Returns itself for method chaining.

#### Parameters:

| Name    | Type       |
| :------ | :--------- |
| `key`   | _any_      |
| `value` | Error \| V |

**Returns:** [_ToManyDataloader_](tomanydataloader.md)<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:59
