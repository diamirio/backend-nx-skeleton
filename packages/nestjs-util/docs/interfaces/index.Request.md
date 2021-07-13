[@webundsoehne/nestjs-util](../README.md) / [index](../modules/index.md) / Request

# Interface: Request

[index](../modules/index.md).Request

## Hierarchy

- `FastifyRequest`

  ↳ **`Request`**

## Table of contents

### Properties

- [body](index.Request.md#body)
- [connection](index.Request.md#connection)
- [headers](index.Request.md#headers)
- [hostname](index.Request.md#hostname)
- [id](index.Request.md#id)
- [ip](index.Request.md#ip)
- [ips](index.Request.md#ips)
- [is404](index.Request.md#is404)
- [log](index.Request.md#log)
- [method](index.Request.md#method)
- [params](index.Request.md#params)
- [protocol](index.Request.md#protocol)
- [query](index.Request.md#query)
- [raw](index.Request.md#raw)
- [req](index.Request.md#req)
- [routerMethod](index.Request.md#routermethod)
- [routerPath](index.Request.md#routerpath)
- [socket](index.Request.md#socket)
- [state](index.Request.md#state)
- [url](index.Request.md#url)
- [validationError](index.Request.md#validationerror)

## Properties

### body

• **body**: `unknown`

#### Inherited from

FastifyRequest.body

#### Defined in

node_modules/fastify/types/request.d.ts:26

___

### connection

• `Readonly` **connection**: `Socket`

#### Inherited from

FastifyRequest.connection

#### Defined in

node_modules/fastify/types/request.d.ts:49

___

### headers

• `Readonly` **headers**: `IncomingHttpHeaders`

#### Inherited from

FastifyRequest.headers

#### Defined in

node_modules/fastify/types/request.d.ts:35

___

### hostname

• `Readonly` **hostname**: `string`

#### Inherited from

FastifyRequest.hostname

#### Defined in

node_modules/fastify/types/request.d.ts:38

___

### id

• **id**: `any`

#### Inherited from

FastifyRequest.id

#### Defined in

node_modules/fastify/types/request.d.ts:21

___

### ip

• `Readonly` **ip**: `string`

#### Inherited from

FastifyRequest.ip

#### Defined in

node_modules/fastify/types/request.d.ts:36

___

### ips

• `Optional` `Readonly` **ips**: `string`[]

#### Inherited from

FastifyRequest.ips

#### Defined in

node_modules/fastify/types/request.d.ts:37

___

### is404

• `Readonly` **is404**: `boolean`

#### Inherited from

FastifyRequest.is404

#### Defined in

node_modules/fastify/types/request.d.ts:44

___

### log

• **log**: `FastifyLoggerInstance`

#### Inherited from

FastifyRequest.log

#### Defined in

node_modules/fastify/types/request.d.ts:25

___

### method

• `Readonly` **method**: `string`

#### Inherited from

FastifyRequest.method

#### Defined in

node_modules/fastify/types/request.d.ts:41

___

### params

• **params**: `unknown`

#### Inherited from

FastifyRequest.params

#### Defined in

node_modules/fastify/types/request.d.ts:22

___

### protocol

• `Readonly` **protocol**: ``"http"`` \| ``"https"``

#### Inherited from

FastifyRequest.protocol

#### Defined in

node_modules/fastify/types/request.d.ts:40

___

### query

• **query**: `unknown`

#### Inherited from

FastifyRequest.query

#### Defined in

node_modules/fastify/types/request.d.ts:24

___

### raw

• **raw**: `IncomingMessage`

#### Inherited from

FastifyRequest.raw

#### Defined in

node_modules/fastify/types/request.d.ts:23

___

### req

• `Readonly` **req**: `IncomingMessage`

**`deprecated`** Use `raw` property

#### Inherited from

FastifyRequest.req

#### Defined in

node_modules/fastify/types/request.d.ts:34

___

### routerMethod

• `Readonly` **routerMethod**: `string`

#### Inherited from

FastifyRequest.routerMethod

#### Defined in

node_modules/fastify/types/request.d.ts:43

___

### routerPath

• `Readonly` **routerPath**: `string`

#### Inherited from

FastifyRequest.routerPath

#### Defined in

node_modules/fastify/types/request.d.ts:42

___

### socket

• `Readonly` **socket**: `Socket`

#### Inherited from

FastifyRequest.socket

#### Defined in

node_modules/fastify/types/request.d.ts:45

___

### state

• **state**: `State`

#### Defined in

packages/nestjs-util/src/interface.ts:14

___

### url

• `Readonly` **url**: `string`

#### Inherited from

FastifyRequest.url

#### Defined in

node_modules/fastify/types/request.d.ts:39

___

### validationError

• `Optional` **validationError**: `Error` & { `validation`: `any` ; `validationContext`: `string`  }

in order for this to be used the user should ensure they have set the attachValidation option.

#### Inherited from

FastifyRequest.validationError

#### Defined in

node_modules/fastify/types/request.d.ts:29
