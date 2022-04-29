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

## Properties

### body

• **body**: `unknown`

#### Inherited from

FastifyRequest.body

#### Defined in

node_modules/fastify/types/request.d.ts:32

---

### connection

• `Readonly` **connection**: `Socket`

#### Inherited from

FastifyRequest.connection

#### Defined in

node_modules/fastify/types/request.d.ts:55

---

### context

• **context**: `FastifyContext`<`unknown`\>

#### Inherited from

FastifyRequest.context

#### Defined in

node_modules/fastify/types/request.d.ts:33

---

### headers

• **headers**: `IncomingHttpHeaders`

#### Inherited from

FastifyRequest.headers

#### Defined in

node_modules/fastify/types/request.d.ts:29

---

### hostname

• `Readonly` **hostname**: `string`

#### Inherited from

FastifyRequest.hostname

#### Defined in

node_modules/fastify/types/request.d.ts:44

---

### id

• **id**: `any`

#### Inherited from

FastifyRequest.id

#### Defined in

node_modules/fastify/types/request.d.ts:25

---

### ip

• `Readonly` **ip**: `string`

#### Inherited from

FastifyRequest.ip

#### Defined in

node_modules/fastify/types/request.d.ts:42

---

### ips

• `Optional` `Readonly` **ips**: `string`[]

#### Inherited from

FastifyRequest.ips

#### Defined in

node_modules/fastify/types/request.d.ts:43

---

### is404

• `Readonly` **is404**: `boolean`

#### Inherited from

FastifyRequest.is404

#### Defined in

node_modules/fastify/types/request.d.ts:50

---

### log

• **log**: `FastifyLoggerInstance`

#### Inherited from

FastifyRequest.log

#### Defined in

node_modules/fastify/types/request.d.ts:30

---

### method

• `Readonly` **method**: `string`

#### Inherited from

FastifyRequest.method

#### Defined in

node_modules/fastify/types/request.d.ts:47

---

### params

• **params**: `unknown`

#### Inherited from

FastifyRequest.params

#### Defined in

node_modules/fastify/types/request.d.ts:26

---

### protocol

• `Readonly` **protocol**: `"http"` \| `"https"`

#### Inherited from

FastifyRequest.protocol

#### Defined in

node_modules/fastify/types/request.d.ts:46

---

### query

• **query**: `unknown`

#### Inherited from

FastifyRequest.query

#### Defined in

node_modules/fastify/types/request.d.ts:28

---

### raw

• **raw**: `IncomingMessage`

#### Inherited from

FastifyRequest.raw

#### Defined in

node_modules/fastify/types/request.d.ts:27

---

### req

• `Readonly` **req**: `IncomingMessage`

**`deprecated`** Use `raw` property

#### Inherited from

FastifyRequest.req

#### Defined in

node_modules/fastify/types/request.d.ts:41

---

### routerMethod

• `Readonly` **routerMethod**: `string`

#### Inherited from

FastifyRequest.routerMethod

#### Defined in

node_modules/fastify/types/request.d.ts:49

---

### routerPath

• `Readonly` **routerPath**: `string`

#### Inherited from

FastifyRequest.routerPath

#### Defined in

node_modules/fastify/types/request.d.ts:48

---

### server

• **server**: `FastifyInstance`<`Server`, `IncomingMessage`, `ServerResponse`, `FastifyLoggerInstance`\>

#### Inherited from

FastifyRequest.server

#### Defined in

node_modules/fastify/types/request.d.ts:31

---

### socket

• `Readonly` **socket**: `Socket`

#### Inherited from

FastifyRequest.socket

#### Defined in

node_modules/fastify/types/request.d.ts:51

---

### state

• **state**: `Record`<`string`, `any`\> & { `tokenPayload?`: `Record`<`string`, `any`\> ; `setCacheLifetime?`: (`lifetime`: `number`, `useExpiresHeader`: `boolean`) => `void` }

#### Defined in

packages/nestjs-util/src/interface/request.interface.ts:4

---

### url

• `Readonly` **url**: `string`

#### Inherited from

FastifyRequest.url

#### Defined in

node_modules/fastify/types/request.d.ts:45

---

### validationError

• `Optional` **validationError**: `Error` & { `validation`: `any` ; `validationContext`: `string` }

in order for this to be used the user should ensure they have set the attachValidation option.

#### Inherited from

FastifyRequest.validationError

#### Defined in

node_modules/fastify/types/request.d.ts:36
