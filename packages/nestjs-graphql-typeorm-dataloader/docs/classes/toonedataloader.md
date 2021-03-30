[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / ToOneDataloader

# Class: ToOneDataloader<V\>

## Type parameters

| Name |
| :--- |
| `V`  |

## Hierarchy

- _DataLoader_<any, V\>

  ↳ **ToOneDataloader**

## Table of contents

### Constructors

- [constructor](toonedataloader.md#constructor)

### Methods

- [clear](toonedataloader.md#clear)
- [clearAll](toonedataloader.md#clearall)
- [load](toonedataloader.md#load)
- [loadMany](toonedataloader.md#loadmany)
- [prime](toonedataloader.md#prime)

## Constructors

### constructor

\+ **new ToOneDataloader**<V\>(`relation`: _RelationMetadata_, `connection`: _Connection_): [_ToOneDataloader_](toonedataloader.md)<V\>

#### Type parameters:

| Name |
| :--- |
| `V`  |

#### Parameters:

| Name         | Type               |
| :----------- | :----------------- |
| `relation`   | _RelationMetadata_ |
| `connection` | _Connection_       |

**Returns:** [_ToOneDataloader_](toonedataloader.md)<V\>

Overrides: void

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/loaders/to-one.loader.ts:7

## Methods

### clear

▸ **clear**(`key`: _any_): [_ToOneDataloader_](toonedataloader.md)<V\>

Clears the value at `key` from the cache, if it exists. Returns itself for method chaining.

#### Parameters:

| Name  | Type  |
| :---- | :---- |
| `key` | _any_ |

**Returns:** [_ToOneDataloader_](toonedataloader.md)<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:46

---

### clearAll

▸ **clearAll**(): [_ToOneDataloader_](toonedataloader.md)<V\>

Clears the entire cache. To be used when some event results in unknown invalidations across this particular `DataLoader`. Returns itself for method chaining.

**Returns:** [_ToOneDataloader_](toonedataloader.md)<V\>

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

▸ **prime**(`key`: _any_, `value`: Error \| V): [_ToOneDataloader_](toonedataloader.md)<V\>

Adds the provied key and value to the cache. If the key already exists, no change is made. Returns itself for method chaining.

#### Parameters:

| Name    | Type       |
| :------ | :--------- |
| `key`   | _any_      |
| `value` | Error \| V |

**Returns:** [_ToOneDataloader_](toonedataloader.md)<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:59
