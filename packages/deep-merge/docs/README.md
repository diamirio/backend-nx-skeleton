@webundsoehne/deep-merge

# @webundsoehne/deep-merge

## Table of contents

### Enumerations

- [ArrayMergeBehavior](enums/ArrayMergeBehavior.md)

### Interfaces

- [DeepMergeOptions](interfaces/DeepMergeOptions.md)

### Type Aliases

- [ArrayMergeFn](README.md#arraymergefn)

### Functions

- [arrayMergeOverwrite](README.md#arraymergeoverwrite)
- [arrayMergeUnique](README.md#arraymergeunique)
- [merge](README.md#merge)
- [uniqueArrayFilter](README.md#uniquearrayfilter)

## Type Aliases

### ArrayMergeFn

Ƭ **ArrayMergeFn**: (`target`: `unknown`[], `source`: `unknown`[]) => `unknown`[]

#### Type declaration

▸ (`target`, `source`): `unknown`[]

##### Parameters

| Name     | Type        |
| :------- | :---------- |
| `target` | `unknown`[] |
| `source` | `unknown`[] |

##### Returns

`unknown`[]

#### Defined in

interface.ts:3

## Functions

### arrayMergeOverwrite

▸ **arrayMergeOverwrite**(`target`, `source`): `unknown`[]

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `target` | `unknown`[] |
| `source` | `unknown`[] |

#### Returns

`unknown`[]

#### Defined in

interface.ts:3

---

### arrayMergeUnique

▸ **arrayMergeUnique**(`target`, `source`): `unknown`[]

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `target` | `unknown`[] |
| `source` | `unknown`[] |

#### Returns

`unknown`[]

#### Defined in

interface.ts:3

---

### merge

▸ **merge**<`T`\>(`options`, `t`, ...`s`): `T`

Merge objects with defaults.

Mutates the object depending on the options.clone key.

#### Type parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `T`  | extends `Record`<`PropertyKey`, `any`\> |

#### Parameters

| Name      | Type                                                 |
| :-------- | :--------------------------------------------------- |
| `options` | [`DeepMergeOptions`](interfaces/DeepMergeOptions.md) |
| `t`       | `T`                                                  |
| `...s`    | `DeepPartial`<`T`\>[]                                |

#### Returns

`T`

#### Defined in

merge.ts:15

---

### uniqueArrayFilter

▸ **uniqueArrayFilter**(`item`, `index`, `array`): `boolean`

A standard array filter for filtering it to unique items.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `item`  | `any`    |
| `index` | `number` |
| `array` | `any`[]  |

#### Returns

`boolean`

#### Defined in

utils.ts:6
