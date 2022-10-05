[@webundsoehne/nestjs-keycloak](../README.md) / restful

# Module: restful

## Table of contents

### Classes

- [AuthGuard](../classes/restful.AuthGuard.md)

### Functions

- [GetToken](restful.md#gettoken)
- [GetUser](restful.md#getuser)
- [Token](restful.md#token)
- [User](restful.md#user)

## Functions

### GetToken

▸ **GetToken**(...`dataOrPipes`): `ParameterDecorator`

Fetch the current user access token from the request.
This only works for REST API applications, please check the alternative one if you require it for a REST API.

**`Alias`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

node_modules/@nestjs/common/decorators/http/create-route-param-metadata.decorator.d.ts:10

___

### GetUser

▸ **GetUser**(...`dataOrPipes`): `ParameterDecorator`

Inject the current Keycloak user to a variable.
This only works for RESTFUL applications, please check the alternative one if you require it for a REST API.

**`Alias`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`string` \| `PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

node_modules/@nestjs/common/decorators/http/create-route-param-metadata.decorator.d.ts:10

___

### Token

▸ **Token**(...`dataOrPipes`): `ParameterDecorator`

Fetch the current user access token from the request.
This only works for REST API applications, please check the alternative one if you require it for a REST API.

**`Alias`**

**`Deprecated`**

Use GetToken instead because of the more generic naming scheme.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

node_modules/@nestjs/common/decorators/http/create-route-param-metadata.decorator.d.ts:10

___

### User

▸ **User**(...`dataOrPipes`): `ParameterDecorator`

Inject the current Keycloak user to a variable.
This only works for RESTFUL applications, please check the alternative one if you require it for a REST API.

**`Alias`**

**`Deprecated`**

Use GetUser instead because of the more generic naming scheme.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`string` \| `PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

node_modules/@nestjs/common/decorators/http/create-route-param-metadata.decorator.d.ts:10
