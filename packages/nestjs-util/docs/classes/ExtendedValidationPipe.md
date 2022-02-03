[@webundsoehne/nestjs-util](../README.md) / ExtendedValidationPipe

# Class: ExtendedValidationPipe

## Hierarchy

- `ValidationPipe`

  ↳ **`ExtendedValidationPipe`**

## Table of contents

### Constructors

- [constructor](ExtendedValidationPipe.md#constructor)

### Properties

- [errorHttpStatusCode](ExtendedValidationPipe.md#errorhttpstatuscode)
- [exceptionFactory](ExtendedValidationPipe.md#exceptionfactory)
- [expectedType](ExtendedValidationPipe.md#expectedtype)
- [isDetailedOutputDisabled](ExtendedValidationPipe.md#isdetailedoutputdisabled)
- [isTransformEnabled](ExtendedValidationPipe.md#istransformenabled)
- [transformOptions](ExtendedValidationPipe.md#transformoptions)
- [validateCustomDecorators](ExtendedValidationPipe.md#validatecustomdecorators)
- [validatorOptions](ExtendedValidationPipe.md#validatoroptions)

### Methods

- [createExceptionFactory](ExtendedValidationPipe.md#createexceptionfactory)
- [flattenValidationErrors](ExtendedValidationPipe.md#flattenvalidationerrors)
- [isPrimitive](ExtendedValidationPipe.md#isprimitive)
- [loadTransformer](ExtendedValidationPipe.md#loadtransformer)
- [loadValidator](ExtendedValidationPipe.md#loadvalidator)
- [mapChildrenToValidationErrors](ExtendedValidationPipe.md#mapchildrentovalidationerrors)
- [prependConstraintsWithParentProp](ExtendedValidationPipe.md#prependconstraintswithparentprop)
- [stripProtoKeys](ExtendedValidationPipe.md#stripprotokeys)
- [toEmptyIfNil](ExtendedValidationPipe.md#toemptyifnil)
- [toValidate](ExtendedValidationPipe.md#tovalidate)
- [transform](ExtendedValidationPipe.md#transform)
- [transformPrimitive](ExtendedValidationPipe.md#transformprimitive)
- [validate](ExtendedValidationPipe.md#validate)

## Constructors

### constructor

• **new ExtendedValidationPipe**(`options?`)

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `options?` | `ValidationPipeOptions` |

#### Overrides

ValidationPipe.constructor

#### Defined in

packages/nestjs-util/src/pipes/validation.pipe.ts:8

## Properties

### errorHttpStatusCode

• `Protected` **errorHttpStatusCode**: `ErrorHttpStatusCode`

#### Inherited from

ValidationPipe.errorHttpStatusCode

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:25

---

### exceptionFactory

• `Protected` **exceptionFactory**: (`errors`: `ValidationError`[]) => `any`

#### Type declaration

▸ (`errors`): `any`

##### Parameters

| Name     | Type                |
| :------- | :------------------ |
| `errors` | `ValidationError`[] |

##### Returns

`any`

#### Inherited from

ValidationPipe.exceptionFactory

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:27

---

### expectedType

• `Protected` **expectedType**: `Type`<`any`\>

#### Inherited from

ValidationPipe.expectedType

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:26

---

### isDetailedOutputDisabled

• `Protected` `Optional` **isDetailedOutputDisabled**: `boolean`

#### Inherited from

ValidationPipe.isDetailedOutputDisabled

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:22

---

### isTransformEnabled

• `Protected` **isTransformEnabled**: `boolean`

#### Inherited from

ValidationPipe.isTransformEnabled

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:21

---

### transformOptions

• `Protected` **transformOptions**: `ClassTransformOptions`

#### Inherited from

ValidationPipe.transformOptions

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:24

---

### validateCustomDecorators

• `Protected` **validateCustomDecorators**: `boolean`

#### Inherited from

ValidationPipe.validateCustomDecorators

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:28

---

### validatorOptions

• `Protected` **validatorOptions**: `ValidatorOptions`

#### Inherited from

ValidationPipe.validatorOptions

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:23

## Methods

### createExceptionFactory

▸ **createExceptionFactory**(): (`validationErrors?`: `ValidationError`[]) => `unknown`

#### Returns

`fn`

▸ (`validationErrors?`): `unknown`

##### Parameters

| Name                | Type                |
| :------------------ | :------------------ |
| `validationErrors?` | `ValidationError`[] |

##### Returns

`unknown`

#### Inherited from

ValidationPipe.createExceptionFactory

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:33

---

### flattenValidationErrors

▸ `Protected` **flattenValidationErrors**(`validationErrors`): `string`[]

#### Parameters

| Name               | Type                |
| :----------------- | :------------------ |
| `validationErrors` | `ValidationError`[] |

#### Returns

`string`[]

#### Inherited from

ValidationPipe.flattenValidationErrors

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:40

---

### isPrimitive

▸ `Protected` **isPrimitive**(`value`): `boolean`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `unknown` |

#### Returns

`boolean`

#### Inherited from

ValidationPipe.isPrimitive

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:38

---

### loadTransformer

▸ `Protected` **loadTransformer**(`transformerPackage?`): `TransformerPackage`

#### Parameters

| Name                  | Type                 |
| :-------------------- | :------------------- |
| `transformerPackage?` | `TransformerPackage` |

#### Returns

`TransformerPackage`

#### Inherited from

ValidationPipe.loadTransformer

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:31

---

### loadValidator

▸ `Protected` **loadValidator**(`validatorPackage?`): `ValidatorPackage`

#### Parameters

| Name                | Type               |
| :------------------ | :----------------- |
| `validatorPackage?` | `ValidatorPackage` |

#### Returns

`ValidatorPackage`

#### Inherited from

ValidationPipe.loadValidator

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:30

---

### mapChildrenToValidationErrors

▸ `Protected` **mapChildrenToValidationErrors**(`error`, `parentPath?`): `ValidationError`[]

#### Parameters

| Name          | Type              |
| :------------ | :---------------- |
| `error`       | `ValidationError` |
| `parentPath?` | `string`          |

#### Returns

`ValidationError`[]

#### Inherited from

ValidationPipe.mapChildrenToValidationErrors

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:41

---

### prependConstraintsWithParentProp

▸ `Protected` **prependConstraintsWithParentProp**(`parentPath`, `error`): `ValidationError`

#### Parameters

| Name         | Type              |
| :----------- | :---------------- |
| `parentPath` | `string`          |
| `error`      | `ValidationError` |

#### Returns

`ValidationError`

#### Inherited from

ValidationPipe.prependConstraintsWithParentProp

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:42

---

### stripProtoKeys

▸ `Protected` **stripProtoKeys**(`value`): `void`

#### Parameters

| Name    | Type                       |
| :------ | :------------------------- |
| `value` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Inherited from

ValidationPipe.stripProtoKeys

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:37

---

### toEmptyIfNil

▸ `Protected` **toEmptyIfNil**<`T`, `R`\>(`value`): {} \| `R`

#### Type parameters

| Name | Type  |
| :--- | :---- |
| `T`  | `any` |
| `R`  | `any` |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `T`  |

#### Returns

{} \| `R`

#### Inherited from

ValidationPipe.toEmptyIfNil

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:36

---

### toValidate

▸ `Protected` **toValidate**(`metadata`): `boolean`

#### Parameters

| Name       | Type               |
| :--------- | :----------------- |
| `metadata` | `ArgumentMetadata` |

#### Returns

`boolean`

#### Inherited from

ValidationPipe.toValidate

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:34

---

### transform

▸ **transform**(`value`, `metadata`): `Promise`<`any`\>

#### Parameters

| Name       | Type               |
| :--------- | :----------------- |
| `value`    | `any`              |
| `metadata` | `ArgumentMetadata` |

#### Returns

`Promise`<`any`\>

#### Overrides

ValidationPipe.transform

#### Defined in

packages/nestjs-util/src/pipes/validation.pipe.ts:16

---

### transformPrimitive

▸ `Protected` **transformPrimitive**(`value`, `metadata`): `any`

#### Parameters

| Name       | Type               |
| :--------- | :----------------- |
| `value`    | `any`              |
| `metadata` | `ArgumentMetadata` |

#### Returns

`any`

#### Inherited from

ValidationPipe.transformPrimitive

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:35

---

### validate

▸ `Protected` **validate**(`object`, `validatorOptions?`): `ValidationError`[] \| `Promise`<`ValidationError`[]\>

#### Parameters

| Name                | Type               |
| :------------------ | :----------------- |
| `object`            | `object`           |
| `validatorOptions?` | `ValidatorOptions` |

#### Returns

`ValidationError`[] \| `Promise`<`ValidationError`[]\>

#### Inherited from

ValidationPipe.validate

#### Defined in

node_modules/@nestjs/common/pipes/validation.pipe.d.ts:39
