[@webundsoehne/nestjs-util](../README.md) / Request

# Interface: Request

## Hierarchy

- `FastifyRequest`

  ↳ **`Request`**

## Table of contents

### Properties

- [body](Request.md#body)
- [connection](Request.md#connection)
- [context](Request.md#context)
- [headers](Request.md#headers)
- [hostname](Request.md#hostname)
- [id](Request.md#id)
- [ip](Request.md#ip)
- [ips](Request.md#ips)
- [is404](Request.md#is404)
- [log](Request.md#log)
- [method](Request.md#method)
- [params](Request.md#params)
- [protocol](Request.md#protocol)
- [query](Request.md#query)
- [raw](Request.md#raw)
- [req](Request.md#req)
- [routerMethod](Request.md#routermethod)
- [routerPath](Request.md#routerpath)
- [server](Request.md#server)
- [socket](Request.md#socket)
- [state](Request.md#state)
- [url](Request.md#url)
- [validationError](Request.md#validationerror)

### Methods

- [compileValidationSchema](Request.md#compilevalidationschema)
- [getValidationFunction](Request.md#getvalidationfunction)
- [validateInput](Request.md#validateinput)

## Properties

### body

• **body**: `unknown`

#### Inherited from

FastifyRequest.body

#### Defined in

node_modules/fastify/types/request.d.ts:43

___

### connection

• `Readonly` **connection**: `Socket`

#### Inherited from

FastifyRequest.connection

#### Defined in

node_modules/fastify/types/request.d.ts:72

___

### context

• **context**: `FastifyContext`<`unknown`\>

#### Inherited from

FastifyRequest.context

#### Defined in

node_modules/fastify/types/request.d.ts:44

___

### headers

• **headers**: `IncomingHttpHeaders`

#### Inherited from

FastifyRequest.headers

#### Defined in

node_modules/fastify/types/request.d.ts:40

___

### hostname

• `Readonly` **hostname**: `string`

#### Inherited from

FastifyRequest.hostname

#### Defined in

node_modules/fastify/types/request.d.ts:55

___

### id

• **id**: `any`

#### Inherited from

FastifyRequest.id

#### Defined in

node_modules/fastify/types/request.d.ts:36

___

### ip

• `Readonly` **ip**: `string`

#### Inherited from

FastifyRequest.ip

#### Defined in

node_modules/fastify/types/request.d.ts:53

___

### ips

• `Optional` `Readonly` **ips**: `string`[]

#### Inherited from

FastifyRequest.ips

#### Defined in

node_modules/fastify/types/request.d.ts:54

___

### is404

• `Readonly` **is404**: `boolean`

#### Inherited from

FastifyRequest.is404

#### Defined in

node_modules/fastify/types/request.d.ts:61

___

### log

• **log**: `FastifyBaseLogger`

#### Inherited from

FastifyRequest.log

#### Defined in

node_modules/fastify/types/request.d.ts:41

___

### method

• `Readonly` **method**: `string`

#### Inherited from

FastifyRequest.method

#### Defined in

node_modules/fastify/types/request.d.ts:58

___

### params

• **params**: `unknown`

#### Inherited from

FastifyRequest.params

#### Defined in

node_modules/fastify/types/request.d.ts:37

___

### protocol

• `Readonly` **protocol**: ``"http"`` \| ``"https"``

#### Inherited from

FastifyRequest.protocol

#### Defined in

node_modules/fastify/types/request.d.ts:57

___

### query

• **query**: `unknown`

#### Inherited from

FastifyRequest.query

#### Defined in

node_modules/fastify/types/request.d.ts:39

___

### raw

• **raw**: `IncomingMessage`

#### Inherited from

FastifyRequest.raw

#### Defined in

node_modules/fastify/types/request.d.ts:38

___

### req

• `Readonly` **req**: `IncomingMessage`

**`Deprecated`**

Use `raw` property

#### Inherited from

FastifyRequest.req

#### Defined in

node_modules/fastify/types/request.d.ts:52

___

### routerMethod

• `Readonly` **routerMethod**: `string`

#### Inherited from

FastifyRequest.routerMethod

#### Defined in

node_modules/fastify/types/request.d.ts:60

___

### routerPath

• `Readonly` **routerPath**: `string`

#### Inherited from

FastifyRequest.routerPath

#### Defined in

node_modules/fastify/types/request.d.ts:59

___

### server

• **server**: `FastifyInstance`<`RawServerDefault`, `IncomingMessage`, `ServerResponse`<`IncomingMessage`\>, `FastifyBaseLogger`, `FastifyTypeProviderDefault`\>

#### Inherited from

FastifyRequest.server

#### Defined in

node_modules/fastify/types/request.d.ts:42

___

### socket

• `Readonly` **socket**: `Socket`

#### Inherited from

FastifyRequest.socket

#### Defined in

node_modules/fastify/types/request.d.ts:62

___

### state

• **state**: `Record`<`string`, `any`\> & { `setCacheLifetime?`: (`lifetime`: `number`, `useExpiresHeader`: `boolean`) => `void` ; `tokenPayload?`: `Record`<`string`, `any`\>  }

#### Defined in

packages/nestjs-util/src/interface/request.interface.ts:4

___

### url

• `Readonly` **url**: `string`

#### Inherited from

FastifyRequest.url

#### Defined in

node_modules/fastify/types/request.d.ts:56

___

### validationError

• `Optional` **validationError**: `Error` & { `validation`: `any` ; `validationContext`: `string`  }

in order for this to be used the user should ensure they have set the attachValidation option.

#### Inherited from

FastifyRequest.validationError

#### Defined in

node_modules/fastify/types/request.d.ts:47

## Methods

### compileValidationSchema

▸ **compileValidationSchema**(`schema`, `httpPart?`): (`input`: `any`) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `Object` |
| `httpPart?` | `HTTPRequestPart` |

#### Returns

`fn`

▸ (`input`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

##### Returns

`boolean`

#### Inherited from

FastifyRequest.compileValidationSchema

#### Defined in

node_modules/fastify/types/request.d.ts:66

___

### getValidationFunction

▸ **getValidationFunction**(`httpPart`): (`input`: `any`) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `httpPart` | `HTTPRequestPart` |

#### Returns

`fn`

▸ (`input`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

##### Returns

`boolean`

#### Inherited from

FastifyRequest.getValidationFunction

#### Defined in

node_modules/fastify/types/request.d.ts:64

▸ **getValidationFunction**(`schema`): (`input`: `any`) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `Object` |

#### Returns

`fn`

▸ (`input`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

##### Returns

`boolean`

#### Inherited from

FastifyRequest.getValidationFunction

#### Defined in

node_modules/fastify/types/request.d.ts:65

___

### validateInput

▸ **validateInput**(`input`, `schema`, `httpPart?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |
| `schema` | `Object` |
| `httpPart?` | `HTTPRequestPart` |

#### Returns

`boolean`

#### Inherited from

FastifyRequest.validateInput

#### Defined in

node_modules/fastify/types/request.d.ts:67

▸ **validateInput**(`input`, `httpPart?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |
| `httpPart?` | `HTTPRequestPart` |

#### Returns

`boolean`

#### Inherited from

FastifyRequest.validateInput

#### Defined in

node_modules/fastify/types/request.d.ts:68
