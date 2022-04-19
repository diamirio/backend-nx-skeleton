[@webundsoehne/nestjs-keycloak](../README.md) / graphql

# Module: graphql

## Table of contents

### Classes

- [AuthGuard](../classes/graphql.AuthGuard.md)

### Functions

- [GetToken](graphql.md#gettoken)
- [GetUser](graphql.md#getuser)
- [Token](graphql.md#token)
- [User](graphql.md#user)

## Functions

### GetToken

▸ **GetToken**(...`dataOrPipes`): `ParameterDecorator`

Fetch the current user access token from the request.
This only works for GraphQL applications, please check the alternative one if you require it for a REST API.

**`alias`** {GetToken,Token}

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

connect/decorators/token-graphql.decorator.ts:12

___

### GetUser

▸ **GetUser**(...`dataOrPipes`): `ParameterDecorator`

Inject the current Keycloak user to a variable.
This only works for GraphQL applications, please check the alternative one if you require it for a REST API.

**`alias`** {GetUser,User}

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`string` \| `PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

connect/decorators/user-graphql.decorator.ts:12

___

### Token

▸ **Token**(...`dataOrPipes`): `ParameterDecorator`

Fetch the current user access token from the request.
This only works for GraphQL applications, please check the alternative one if you require it for a REST API.

**`alias`** {GetToken,Token}

**`deprecated`** Use GetToken instead because of the more generic naming scheme.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

connect/decorators/token-graphql.decorator.ts:24

___

### User

▸ **User**(...`dataOrPipes`): `ParameterDecorator`

Inject the current Keycloak user to a variable.
This only works for GraphQL applications, please check the alternative one if you require it for a REST API.

**`alias`** {GetUser,User}

**`deprecated`** Use GetUser instead because of the more generic naming scheme.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`string` \| `PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

connect/decorators/user-graphql.decorator.ts:24
