[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nestjs-graphql-typeorm-dataloader

[![Version](https://img.shields.io/npm/v/@webundsoehne/nestjs-graphql-typeorm-dataloader.svg)](https://npmjs.org/package/@webundsoehne/nestjs-graphql-typeorm-dataloader) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nestjs-graphql-typeorm-dataloader.svg)](https://npmjs.org/package/@webundsoehne/nestjs-graphql-typeorm-dataloader) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nestjs-graphql-typeorm-dataloader)](https://npmjs.org/package/@webundsoehne/nestjs-graphql-typeorm-dataloader) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

`nestjs-graphql-typeorm-dataloader` implements the middleware and the decorators needed to enable `graphql` `data-loader` in the entity or DTO level. So instead of defining the data loader in every resolve field, it is easier to just define it over a more generic field and let it handle which type of relations does it have to resolve and load the data properly. This also eliminates the setup for how to load the data, for which key to load the data for every field resolver.

- [Changelog](./CHANGELOG.md)
- [API Documentation](./docs/README.md)

<!-- toc -->

- [What it does](#what-it-does)
- [Setup](#setup)
  - [Global Setup for Project](#global-setup-for-project)
    - [Interceptor](#interceptor)
    - [Apollo Plugin](#apollo-plugin)
  - [Field Middleware](#field-middleware)
    - [Injecting to a Specific Field](#injecting-to-a-specific-field)
    - [Injecting it Globally](#injecting-it-globally)
- [Resolving Relations](#resolving-relations)
  - [Generic Setup](#generic-setup)
  - [With Self Key](#with-self-key)
  - [Custom Loader](#custom-loader)
- [Further Process Data](#further-process-data)

<!-- tocstop -->

---

# What it does

- Registering a `nestjs` `interceptor` or `graphql` `plugin` enables to setup the connection to give it a unique id to containarize the request better. This enables the data to be loaded for multiple resolve fields.
- Entities decorated with the `nestjs` `graphql` `extensions` field contains the metadata to how to solve this exact field.
- `field-middleware` that is initiated explicitly for that `field` solves the field fetching according to direction of the `extension` metadata and solves the given relation by the database manager.

# Setup

## Global Setup for Project

This plugin requires a interceptor to keep track of the request ids in a container environment, which could be done by nest itself but the second thing is you inject the connection of `typeorm` to `field-middleware` which `nestjs` does not enable to do. This will write a unique key to every request in the `context` directly. If you are going to use `typeorm` explicitly which this plugin is intended for you have to pass in the connection, since dependency injection is not available to fetch in the `field-middleware`.

You can choose between one of two options.

### Interceptor

Import the interceptor and use it globally or module-scoped in your project.

```typescript
import { getConnection } from 'typeorm'
import { DataLoaderInterceptor } from '@webundsoehne/nestjs-graphql-typeorm-dataloader'

// ...
  @Module({
    providers: [
      // ...
      {
        provide: APP_INTERCEPTOR,
        useFactory: (): DataLoaderInterceptor => new DataLoaderInterceptor({ typeormGetConnection: getConnection })
      }
    ],
    // ...
```

### Apollo Plugin

Initially designed this plugin to use the apollo plugin method, then converted it to a interceptor. Even though they basically do the same thing the `apollo-server-plugin` is also there. This can be only global scoped since it is injected to the `apollo-server` itself.

```typescript
import { getConnection } from 'typeorm'
import { ApolloServerDataLoaderPlugin } from '@webundsoehne/nestjs-graphql-typeorm-dataloader'

...
  @Module({
    providers: [
    imports: [
      GraphQLModule.forRoot({
        autoSchemaFile: join(process.cwd(), '.graphql/schema.gql'),
        context: graphQLContextParser,
        formatError: graphQLErrorParser,
        useGlobalPrefix: true,
        playground: true,
        introspection: true,
        uploads: false,
        path: '/',
        plugins: [ new ApolloServerDataLoaderPlugin({ typeormGetConnection: getConnection })]
      }),
      // ...
```

## Field Middleware

Field middleware can either be injected to `Field`, `FieldResolver` or globally.

Unfortunately `nest.js` does not allow to tamper with the `GraphQL` setup so i could not overwrite the `middleware` field while you are decorating the field with `extension` so this stayed as a manual process.

This is due to `graphql` resolvers and field-resolvers inside the `nest.js` only registered once. Therefore you can not lazily register metadata afterwards, this behavior as I understand it can be seen in [field decorator](https://github.com/nestjs/graphql/blob/853d76b52d49a637ff44651fd922994d14da9ed4/lib/decorators/field.decorator.ts#L86) and [field resolver decorator](https://github.com/nestjs/graphql/blob/853d76b52d49a637ff44651fd922994d14da9ed4/lib/decorators/resolve-field.decorator.ts#L96) and following the behaviour to add [metadata for resolvers](https://github.com/nestjs/graphql/blob/853d76b52d49a637ff44651fd922994d14da9ed4/lib/schema-builder/storages/type-metadata.storage.ts#L196).

### Injecting to a Specific Field

While you will see this making sense in the upcoming examples, it should just be done as follows.

```typescript
@Field(() => [DocumentHistoryEntity], { nullable: true, middleware: [TypeormLoaderMiddleware] })
```

### Injecting it Globally

To inject this middleware for each and every field, which will cause a little overhead but not much since it is pretty basic to check the `context` to have matching keys can be done as follows. But for more specific control over the fields you can always use the injectiong to a specific field approach.

```typescript
import { getConnection } from 'typeorm'
import { ApolloServerDataLoaderPlugin, TypeormLoaderMiddleware } from '@webundsoehne/nestjs-graphql-typeorm-dataloader'

...
  @Module({
    providers: [
    imports: [
      GraphQLModule.forRoot({
        autoSchemaFile: join(process.cwd(), '.graphql/schema.gql'),
        context: graphQLContextParser,
        formatError: graphQLErrorParser,
        useGlobalPrefix: true,
        playground: true,
        introspection: true,
        uploads: false,
        path: '/',
        buildSchemaOptions: {
            fieldMiddleware: [TypeormLoaderMiddleware],
        }
      }),
      // ...
```

# Resolving Relations

Entities or DTOs should be decorated with directions of how to resolve a relation.

The only critical thing here is getting the relation ids of the relation. Since `typeorm` already exposes fetching relation ids, another field can be decorated with `RelationId` and since the parent document will be injected to the function in `TypeormLoaderExtension` as an argument, this relation ids will be resolved and `typeorm` `metadata` will indicate the relation type and it will use the appropiarete `dataLoader` with the given field. You can omit this fields serialization with marking it without a `field` decorator.

You can either use this decorators in the entity, dto or resolver. But the intention is to keep this in the DTOs or entities to define resolving them genericly. You can also further process the output result, the GraphQL way.

**If you define the resolver and extensions at the entity or dto level, you do not need to define any field resolvers for a given field and it will be resolved automatically.**

## Generic Setup

Imagine that `document` is the main class and has `one-to-many` relation with entity `documentSignatories`.

```typescript
import { RelationId } from 'typeorm'
import { TypeormLoaderMiddleware, TypeormLoaderExtension } from '@webundsoehne/nestjs-graphql-typeorm-dataloader'

export class DocumentEntity extends BaseEntityWithPrimary<DocumentEntity> {
  // ...

  @RelationId((document: DocumentEntity) => document.documentHistories)
  documentHistoryIds?: string[]

  @Field(() => [DocumentHistoryEntity], { nullable: true, middleware: [TypeormLoaderMiddleware] })
  @OneToMany(() => DocumentHistoryEntity, (documentHistory) => documentHistory.document, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @TypeormLoaderExtension((document: DocumentEntity) => document.documentHistoryIds)
  documentHistories?: DocumentHistoryEntity[]

  // ...
}
```

This is also the case with the `one-to-one`, `many-to-one` relations.

## With Self Key

`selfKey` option can be set true against properties which have `OneToMany` or `OneToOne` without `JoinColumn` where it has the key already. This will use the id already defined with a relation in the entity itself.

```typescript
import { TypeormLoaderMiddleware, TypeormLoaderExtension } from '@webundsoehne/nestjs-graphql-typeorm-dataloader'

export class DocumentEntity extends BaseEntityWithPrimary<DocumentEntity> {
  // ...
  @Field(() => UUID, { nullable: true, description: 'User id that is assigned to the document. ' })
  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: true
  })
  userId?: string

  @Field(() => [DocumentHistoryEntity], { nullable: true, middleware: [TypeormLoaderMiddleware] })
  @OneToOne(() => DocumentHistoryEntity, (documentHistory) => documentHistory.document, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @TypeormLoaderExtension((document: DocumentEntity) => document.userId, { selfKey: true })
  user?: UserEntity[]

  // ...
}
```

## Custom Loader

You can also define your own data loader, but this time it should be in the resolver itself.

```typescript
import { CustomLoaderExtension, CustomLoaderMiddleware } from '@webundsoehne/nestjs-graphql-typeorm-dataloader'

@Resolver(() => UserEntity)
export class UserResolver {
  @ResolveField('documents', () => UserEntity, {
    nullable: true,
    middleware: [ CustomLoaderMiddleware ]
  })
  @CustomLoaderExtension(async (ids, { context }) => {
    const documents = await this.documentRepository.find({
      where: { user: { id: In(ids) } }
    })

    const documentById = groupBy(documents, 'userId')

    return ids.map((id) => documentById[id] ?? [])
  })
  public resolveUser(@Parent() user: UserEntity): Promise<UserEntity['documents']> {
    return (dataloader: DataLoader<string, DocumentEntity[]>) =>
      dataloader.load(user.id);
    }
  }
}
```

# Further Process Data

Since this will resolve value and use the `next` function to forwart it, you can later process the data utilizing a `field-resolver`.

---

Based on [type-graphql-dataloader](https://github.com/slaypni/type-graphql-dataloader).
