[@webundsoehne/nx-tools](../README.md) / Manager

# Class: Manager<Ctx\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends `ListrContext` |

## Hierarchy

- `Manager`<`Ctx`, ``"default"``, ``"verbose"``\>

  ↳ **`Manager`**

## Table of contents

### Constructors

- [constructor](Manager.md#constructor)

### Properties

- [err](Manager.md#err)
- [options](Manager.md#options)

### Accessors

- [ctx](Manager.md#ctx)

### Methods

- [add](Manager.md#add)
- [getRuntime](Manager.md#getruntime)
- [indent](Manager.md#indent)
- [newListr](Manager.md#newlistr)
- [run](Manager.md#run)
- [runAll](Manager.md#runall)

## Constructors

### constructor

• **new Manager**<`Ctx`\>(`context`, `options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `SchematicContext` \| `BuilderContext` \| `ExecutorContext` |
| `options?` | `ListrBaseClassOptions`<`Ctx`, ``"default"``, ``"verbose"``\> |

#### Overrides

BaseManager&lt;Ctx, &#x27;default&#x27;, &#x27;verbose&#x27;\&gt;.constructor

#### Defined in

packages/nx-tools/src/utils/manager.ts:11

## Properties

### err

• **err**: `ListrError`<`Record`<`PropertyKey`, `any`\>\>[]

#### Inherited from

BaseManager.err

#### Defined in

node_modules/listr2/dist/index.d.ts:913

___

### options

• `Optional` **options**: `ListrBaseClassOptions`<`Ctx`, ``"default"``, ``"verbose"``\>

#### Inherited from

BaseManager.options

#### Defined in

node_modules/listr2/dist/index.d.ts:912

## Accessors

### ctx

• `set` **ctx**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |

#### Returns

`void`

#### Inherited from

BaseManager.ctx

#### Defined in

node_modules/listr2/dist/index.d.ts:916

## Methods

### add

▸ **add**<`InjectCtx`\>(`tasks`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InjectCtx` | `Ctx` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `ListrTask`<`InjectCtx`, typeof `DefaultRenderer`\>[] \| (`ctx?`: `InjectCtx`) => `ListrTask`<`InjectCtx`, typeof `DefaultRenderer`\>[] |
| `options?` | `ListrSubClassOptions`<`InjectCtx`, ``"default"``\> |

#### Returns

`void`

#### Inherited from

BaseManager.add

#### Defined in

node_modules/listr2/dist/index.d.ts:917

___

### getRuntime

▸ **getRuntime**(`pipetime`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pipetime` | `number` |

#### Returns

`string`

#### Inherited from

BaseManager.getRuntime

#### Defined in

node_modules/listr2/dist/index.d.ts:922

___

### indent

▸ **indent**<`InjectCtx`\>(`tasks`, `options?`, `taskOptions?`): `ListrTask`<`InjectCtx`, typeof `DefaultRenderer`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InjectCtx` | `Ctx` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `ListrTask`<`InjectCtx`, typeof `DefaultRenderer`\>[] \| (`ctx?`: `InjectCtx`) => `ListrTask`<`InjectCtx`, typeof `DefaultRenderer`\>[] |
| `options?` | `ListrBaseClassOptions`<`InjectCtx`, ``"default"``, ``"verbose"``\> |
| `taskOptions?` | `Omit`<`ListrTask`<`InjectCtx`, typeof `DefaultRenderer`\>, ``"task"``\> |

#### Returns

`ListrTask`<`InjectCtx`, typeof `DefaultRenderer`\>

#### Inherited from

BaseManager.indent

#### Defined in

node_modules/listr2/dist/index.d.ts:920

___

### newListr

▸ **newListr**<`InjectCtx`, `InjectRenderer`, `InjectFallbackRenderer`\>(`tasks`, `options?`): `Listr`<`InjectCtx`, `InjectRenderer`, `InjectFallbackRenderer`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InjectCtx` | `InjectCtx` |
| `InjectRenderer` | extends `ListrRendererValue` = ``"default"`` |
| `InjectFallbackRenderer` | extends `ListrRendererValue` = ``"verbose"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `ListrTask`<`InjectCtx`, `ListrGetRendererClassFromValue`<`InjectRenderer`\>\>[] |
| `options?` | `ListrBaseClassOptions`<`InjectCtx`, `InjectRenderer`, `InjectFallbackRenderer`\> |

#### Returns

`Listr`<`InjectCtx`, `InjectRenderer`, `InjectFallbackRenderer`\>

#### Inherited from

BaseManager.newListr

#### Defined in

node_modules/listr2/dist/index.d.ts:919

___

### run

▸ **run**<`InjectCtx`\>(`tasks`, `options?`): `Promise`<`InjectCtx`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InjectCtx` | `Ctx` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `ListrTask`<`InjectCtx`, typeof `DefaultRenderer`\>[] |
| `options?` | `ListrBaseClassOptions`<`InjectCtx`, ``"default"``, ``"verbose"``\> |

#### Returns

`Promise`<`InjectCtx`\>

#### Inherited from

BaseManager.run

#### Defined in

node_modules/listr2/dist/index.d.ts:921

___

### runAll

▸ **runAll**<`InjectCtx`\>(`options?`): `Promise`<`InjectCtx`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InjectCtx` | `Ctx` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ListrBaseClassOptions`<`InjectCtx`, ``"default"``, ``"verbose"``\> |

#### Returns

`Promise`<`InjectCtx`\>

#### Inherited from

BaseManager.runAll

#### Defined in

node_modules/listr2/dist/index.d.ts:918
