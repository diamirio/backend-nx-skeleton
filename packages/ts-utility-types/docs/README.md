@webundsoehne/ts-utility-types

# @webundsoehne/ts-utility-types

## Table of contents

### Type Aliases

- [ArrayElement](README.md#arrayelement)
- [Await](README.md#await)
- [ConfigEnvironmentVariables](README.md#configenvironmentvariables)
- [DeepPartial](README.md#deeppartial)
- [DeepWriteable](README.md#deepwriteable)
- [InferedObjectType](README.md#inferedobjecttype)
- [ValueOf](README.md#valueof)
- [Writeable](README.md#writeable)

## Type Aliases

### ArrayElement

Ƭ **ArrayElement**<`ArrayType`\>: `ArrayType` extends readonly infer ElementType[] ? `ElementType` : `never`

Fetches a single element from the array if array is homogeneous in types.

#### Type parameters

| Name        | Type                         |
| :---------- | :--------------------------- |
| `ArrayType` | extends readonly `unknown`[] |

#### Defined in

array.ts:4

---

### Await

Ƭ **Await**<`T`\>: `T` extends `PromiseLike`<infer U\> ? `U` : `T`

Since Awaited is missing from older Typescript versions, this takes in place to infer a function after the asynchronity is resolved.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

function.ts:4

---

### ConfigEnvironmentVariables

Ƭ **ConfigEnvironmentVariables**<`T`\>: { [P in keyof T]?: ConfigEnvironmentVariables<T[P]\> \| string \| Record<"\_\_name" \| "\_\_format", string\> }

Updates every key to support node-config environment variable format and makes it DeepPartial.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

config.ts:4

---

### DeepPartial

Ƭ **DeepPartial**<`T`\>: `T` extends `object` ? { [P in keyof T]?: T[P] \| DeepPartial<T[P]\> } : `T`

Makes the object deep partial.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

object.ts:16

---

### DeepWriteable

Ƭ **DeepWriteable**<`T`\>: { -readonly [P in keyof T]: DeepWriteable<T[P]\> }

Removes the readonly properties from the object recursively.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

object.ts:26

---

### InferedObjectType

Ƭ **InferedObjectType**<`T`, `K`\>: [`ArrayElement`](README.md#arrayelement)<`T`\>[`K`] extends infer ObjectProperty ? `ObjectProperty` : `never`

Infers the object type.

#### Type parameters

| Name | Type                                                         |
| :--- | :----------------------------------------------------------- |
| `T`  | extends `Record`<`string`, `any`\>[]                         |
| `K`  | extends keyof [`ArrayElement`](README.md#arrayelement)<`T`\> |

#### Defined in

object.ts:6

---

### ValueOf

Ƭ **ValueOf**<`T`\>: `T`[keyof `T`]

Fetches the type of value of an object property if object is homogeneous.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

object.ts:11

---

### Writeable

Ƭ **Writeable**<`T`\>: { -readonly [P in keyof T]: T[P] }

Removes the readonly properties from the object.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

object.ts:21
