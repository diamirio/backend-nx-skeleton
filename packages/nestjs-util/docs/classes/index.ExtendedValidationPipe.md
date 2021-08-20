[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / ExtendedValidationPipe

# Class: ExtendedValidationPipe

[index](../modules/index.md).ExtendedValidationPipe

## Hierarchy

- `ValidationPipe`

  ↳ **`ExtendedValidationPipe`**

## Table of contents

### Constructors

- [constructor](index.ExtendedValidationPipe.md#constructor)

### Properties

- [errorHttpStatusCode](index.ExtendedValidationPipe.md#errorhttpstatuscode)
- [exceptionFactory](index.ExtendedValidationPipe.md#exceptionfactory)
- [expectedType](index.ExtendedValidationPipe.md#expectedtype)
- [isDetailedOutputDisabled](index.ExtendedValidationPipe.md#isdetailedoutputdisabled)
- [isTransformEnabled](index.ExtendedValidationPipe.md#istransformenabled)
- [transformOptions](index.ExtendedValidationPipe.md#transformoptions)
- [validateCustomDecorators](index.ExtendedValidationPipe.md#validatecustomdecorators)
- [validatorOptions](index.ExtendedValidationPipe.md#validatoroptions)

### Methods

- [createExceptionFactory](index.ExtendedValidationPipe.md#createexceptionfactory)
- [flattenValidationErrors](index.ExtendedValidationPipe.md#flattenvalidationerrors)
- [isPrimitive](index.ExtendedValidationPipe.md#isprimitive)
- [loadTransformer](index.ExtendedValidationPipe.md#loadtransformer)
- [loadValidator](index.ExtendedValidationPipe.md#loadvalidator)
- [mapChildrenToValidationErrors](index.ExtendedValidationPipe.md#mapchildrentovalidationerrors)
- [prependConstraintsWithParentProp](index.ExtendedValidationPipe.md#prependconstraintswithparentprop)
- [stripProtoKeys](index.ExtendedValidationPipe.md#stripprotokeys)
- [toEmptyIfNil](index.ExtendedValidationPipe.md#toemptyifnil)
- [toValidate](index.ExtendedValidationPipe.md#tovalidate)
- [transform](index.ExtendedValidationPipe.md#transform)
- [transformPrimitive](index.ExtendedValidationPipe.md#transformprimitive)

## Constructors

### constructor

• **new ExtendedValidationPipe**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ValidationPipeOptions` |

#### Overrides

ValidationPipe.constructor

#### Defined in

packages/nestjs-util/src/pipes/validation.pipe.ts:7

## Properties

### errorHttpStatusCode

• `Protected` **errorHttpStatusCode**: `ErrorHttpStatusCode`

#### Inherited from

ValidationPipe.errorHttpStatusCode

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:21

___

### exceptionFactory

• `Protected` **exceptionFactory**: (`errors`: `ValidationError`[]) => `any`

#### Type declaration

▸ (`errors`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `errors` | `ValidationError`[] |

##### Returns

`any`

#### Inherited from

ValidationPipe.exceptionFactory

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:23

___

### expectedType

• `Protected` **expectedType**: `Type`<`any`\>

#### Inherited from

ValidationPipe.expectedType

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:22

___

### isDetailedOutputDisabled

• `Protected` `Optional` **isDetailedOutputDisabled**: `boolean`

#### Inherited from

ValidationPipe.isDetailedOutputDisabled

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:18

___

### isTransformEnabled

• `Protected` **isTransformEnabled**: `boolean`

#### Inherited from

ValidationPipe.isTransformEnabled

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:17

___

### transformOptions

• `Protected` **transformOptions**: `ClassTransformOptions`

#### Inherited from

ValidationPipe.transformOptions

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:20

___

### validateCustomDecorators

• `Protected` **validateCustomDecorators**: `boolean`

#### Inherited from

ValidationPipe.validateCustomDecorators

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:24

___

### validatorOptions

• `Protected` **validatorOptions**: `ValidatorOptions`

#### Inherited from

ValidationPipe.validatorOptions

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:19

## Methods

### createExceptionFactory

▸ **createExceptionFactory**(): (`validationErrors?`: `ValidationError`[]) => `unknown`

#### Returns

`fn`

▸ (`validationErrors?`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `validationErrors?` | `ValidationError`[] |

##### Returns

`unknown`

#### Inherited from

ValidationPipe.createExceptionFactory

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:29

___

### flattenValidationErrors

▸ `Protected` **flattenValidationErrors**(`validationErrors`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `validationErrors` | `ValidationError`[] |

#### Returns

`string`[]

#### Inherited from

ValidationPipe.flattenValidationErrors

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:35

___

### isPrimitive

▸ `Protected` **isPrimitive**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

`boolean`

#### Inherited from

ValidationPipe.isPrimitive

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:34

___

### loadTransformer

▸ `Protected` **loadTransformer**(): `any`

#### Returns

`any`

#### Inherited from

ValidationPipe.loadTransformer

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:27

___

### loadValidator

▸ `Protected` **loadValidator**(): `any`

#### Returns

`any`

#### Inherited from

ValidationPipe.loadValidator

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:26

___

### mapChildrenToValidationErrors

▸ `Protected` **mapChildrenToValidationErrors**(`error`, `parentPath?`): `ValidationError`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `ValidationError` |
| `parentPath?` | `string` |

#### Returns

`ValidationError`[]

#### Inherited from

ValidationPipe.mapChildrenToValidationErrors

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:36

___

### prependConstraintsWithParentProp

▸ `Protected` **prependConstraintsWithParentProp**(`parentPath`, `error`): `ValidationError`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentPath` | `string` |
| `error` | `ValidationError` |

#### Returns

`ValidationError`

#### Inherited from

ValidationPipe.prependConstraintsWithParentProp

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:37

___

### stripProtoKeys

▸ `Protected` **stripProtoKeys**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Inherited from

ValidationPipe.stripProtoKeys

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:33

___

### toEmptyIfNil

▸ `Protected` **toEmptyIfNil**<`T`, `R`\>(`value`): {} \| `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `R` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

{} \| `R`

#### Inherited from

ValidationPipe.toEmptyIfNil

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:32

___

### toValidate

▸ `Protected` **toValidate**(`metadata`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `ArgumentMetadata` |

#### Returns

`boolean`

#### Inherited from

ValidationPipe.toValidate

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:30

___

### transform

▸ **transform**(`value`, `metadata`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `metadata` | `ArgumentMetadata` |

#### Returns

`Promise`<`any`\>

#### Overrides

ValidationPipe.transform

#### Defined in

packages/nestjs-util/src/pipes/validation.pipe.ts:15

___

### transformPrimitive

▸ `Protected` **transformPrimitive**(`value`, `metadata`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `metadata` | `ArgumentMetadata` |

#### Returns

`any`

#### Inherited from

ValidationPipe.transformPrimitive

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:31
