[@webundsoehne/nestjs-graphql-typeorm-dataloader](../README.md) / SelfKeyDataloader

# Class: SelfKeyDataloader<V\>

A common loader for loading entities by their own key.

## Type parameters

| Name |
| :--- |
| `V`  |

## Hierarchy

- _DataLoader_<any, V[]\>

  ↳ **SelfKeyDataloader**

## Table of contents

### Constructors

- [constructor](selfkeydataloader.md#constructor)

### Methods

- [clear](selfkeydataloader.md#clear)
- [clearAll](selfkeydataloader.md#clearall)
- [load](selfkeydataloader.md#load)
- [loadMany](selfkeydataloader.md#loadmany)
- [prime](selfkeydataloader.md#prime)

## Constructors

### constructor

\+ **new SelfKeyDataloader**<V\>(`relation`: _RelationMetadata_, `connection`: _Connection_, `selfKeyFunc`: SelfKeyFunc): [_SelfKeyDataloader_](selfkeydataloader.md)<V\>

#### Type parameters:

| Name |
| :--- |
| `V`  |

#### Parameters:

| Name          | Type               |
| :------------ | :----------------- |
| `relation`    | _RelationMetadata_ |
| `connection`  | _Connection_       |
| `selfKeyFunc` | SelfKeyFunc        |

**Returns:** [_SelfKeyDataloader_](selfkeydataloader.md)<V\>

Overrides: void

Defined in: packages/nestjs-graphql-typeorm-dataloader/src/loaders/self-key.loader.ts:11

## Methods

### clear

▸ **clear**(`key`: _any_): [_SelfKeyDataloader_](selfkeydataloader.md)<V\>

Clears the value at `key` from the cache, if it exists. Returns itself for method chaining.

#### Parameters:

| Name  | Type  |
| :---- | :---- |
| `key` | _any_ |

**Returns:** [_SelfKeyDataloader_](selfkeydataloader.md)<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:46

---

### clearAll

▸ **clearAll**(): [_SelfKeyDataloader_](selfkeydataloader.md)<V\>

Clears the entire cache. To be used when some event results in unknown invalidations across this particular `DataLoader`. Returns itself for method chaining.

**Returns:** [_SelfKeyDataloader_](selfkeydataloader.md)<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:53

---

### load

▸ **load**(`key`: _any_): _Promise_<V[]\>

Loads a key, returning a `Promise` for the value represented by that key.

#### Parameters:

| Name  | Type  |
| :---- | :---- |
| `key` | _any_ |

**Returns:** _Promise_<V[]\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:25

---

### loadMany

▸ **loadMany**(`keys`: _ArrayLike_<any\>): _Promise_<(V[] \| Error)[]\>

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

**Returns:** _Promise_<(V[] \| Error)[]\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:40

---

### prime

▸ **prime**(`key`: _any_, `value`: V[] \| Error): [_SelfKeyDataloader_](selfkeydataloader.md)<V\>

Adds the provied key and value to the cache. If the key already exists, no change is made. Returns itself for method chaining.

#### Parameters:

| Name    | Type         |
| :------ | :----------- |
| `key`   | _any_        |
| `value` | V[] \| Error |

**Returns:** [_SelfKeyDataloader_](selfkeydataloader.md)<V\>

Inherited from: void

Defined in: node_modules/dataloader/index.d.ts:59
