<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nestjs-util-graphql

[![Version](https://img.shields.io/npm/v/@webundsoehne/nestjs-util-graphql.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util-graphql) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nestjs-util-graphql.svg)](https://npmjs.org/package/@webundsoehne/nestjs-util-graphql) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nestjs-util-graphql)](https://npmjs.org/package/@webundsoehne/nestjs-util-graphql) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Description

This is a collection of useful modules for creating a [NestJS](https://github.com/nestjs/nest) project. Mostly all of these modules are used by the in-house boilerplate of Web & Söhne.

## Modules

- **[Read The API Documentation](./docs/README.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Filters](#filters)
  - [GraphQL Error Parser](#graphql-error-parser)
- [Stay in touch](#stay-in-touch)

<!-- tocstop -->

## Filters

### GraphQL Error Parser

Since `nest.js` lets `GraphQL` handle its errors in its own way, `graphqlErrorParser` is just a function instead of a filter. This will format the errors in the same way of the HTTP errors, so you can also throw `HTTP_STATUS` errors instead of plain `GraphQLError` for more distinction and using the status code directly in the frontend. It will also add the GraphQL error field of which field this error is coming from.

**Usage**

Just add the error parser to the GraphQL Module itself.

```typescript
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLErrorParser } from '@webundsoehne/nestjs-util-graphql'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    GraphQLModule.forRoot({
      formatError: GraphQLErrorParser
    })
  ]
})
export class ServerModule {}
```

## Stay in touch

- Author: [Backend Team](mailto:backend@webundsoehne.com)
- Website: [Web & Söhne](https://webundsoehne.com)
