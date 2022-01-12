@webundsoehne/ts-utility-types

# @webundsoehne/ts-utility-types

## Table of contents

### Type aliases

- [ArrayElement](README.md#arrayelement)
- [Await](README.md#await)
- [ConfigEnvironmentVariables](README.md#configenvironmentvariables)
- [DeepPartial](README.md#deeppartial)
- [InferedObjectType](README.md#inferedobjecttype)
- [ValueOf](README.md#valueof)

## Type aliases

### ArrayElement

Ƭ **ArrayElement**<`ArrayType`\>: `ArrayType` extends readonly infer ElementType[] ? `ElementType` : `never`

#### Type parameters

| Name        | Type                         |
| :---------- | :--------------------------- |
| `ArrayType` | extends readonly `unknown`[] |

#### Defined in

array.ts:1

---

### Await

Ƭ **Await**<`T`\>: `T` extends `PromiseLike`<infer U\> ? `U` : `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

function.ts:1

---

### ConfigEnvironmentVariables

Ƭ **ConfigEnvironmentVariables**<`T`\>: { [P in keyof T]?: ConfigEnvironmentVariables<T[P]\> \| string \| Record<"\_\_name" \| "\_\_format", string\> }

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

config.ts:1

---

### DeepPartial

Ƭ **DeepPartial**<`T`\>: { [P in keyof T]?: DeepPartial<T[P]\> }

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

object.ts:7

---

### InferedObjectType

Ƭ **InferedObjectType**<`T`, `K`\>: [`ArrayElement`](README.md#arrayelement)<`T`\>[`K`] extends infer ObjectProperty ? `ObjectProperty` : `never`

#### Type parameters

| Name | Type                                                         |
| :--- | :----------------------------------------------------------- |
| `T`  | extends `Record`<`string`, `any`\>[]                         |
| `K`  | extends keyof [`ArrayElement`](README.md#arrayelement)<`T`\> |

#### Defined in

object.ts:3

---

### ValueOf

Ƭ **ValueOf**<`T`\>: `T`[keyof `T`]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

object.ts:5
