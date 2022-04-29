@webundsoehne/deep-merge

# @webundsoehne/deep-merge

## Table of contents

### Functions

- [deepMerge](README.md#deepmerge)
- [deepMergeWithArrayOverwrite](README.md#deepmergewitharrayoverwrite)
- [deepMergeWithUniqueMergeArray](README.md#deepmergewithuniquemergearray)
- [uniqueArrayFilter](README.md#uniquearrayfilter)

## Functions

### deepMerge

▸ **deepMerge**<`T`\>(`t`, ...`s`): `T`

Merge objects with defaults.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

merge.ts:12

---

### deepMergeWithArrayOverwrite

▸ **deepMergeWithArrayOverwrite**<`T`\>(`t`, ...`s`): `T`

Merge objects with overwriting the target array with source array.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

merge.ts:40

---

### deepMergeWithUniqueMergeArray

▸ **deepMergeWithUniqueMergeArray**<`T`\>(`t`, ...`s`): `T`

Merge objects with array merge and filtering them uniquely.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

merge.ts:25

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

merge.ts:51
