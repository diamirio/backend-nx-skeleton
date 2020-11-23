[![Web&Söhne](https://webundsoehne.com/wp-content/uploads/2016/11/logo.png)](https://webundsoehne.com)

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/eslint-config

[![Version](https://img.shields.io/npm/v/@webundsoehne/eslint-config.svg)](https://npmjs.org/package/@webundsoehne/eslint-config) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/eslint-config.svg)](https://npmjs.org/package/@webundsoehne/eslint-config) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/eslint-config)](https://npmjs.org/package/@webundsoehne/eslint-config) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

`eslint` configuration for company wild projects to ensure code quality and code readability.

- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Rules](#rules)
  - [Default](#default)
  - [Typescript](#typescript)
  - [React](#react)
  - [React-TypeScript](#react-typescript)

<!-- tocstop -->

---

## Rules

For importing the rules no peer dependencies are required except for `eslint`, all comes bundled with the package itself.

### Default

```json
{
  "extends": ["@webundsoehne/eslint-config"]
}
```

### Typescript

```json
{
  "extends": ["@webundsoehne/eslint-config/typescript"]
}
```

### React

```json
{
  "extends": ["@webundsoehne/eslint-config/react"]
}
```

### React-TypeScript

```json
{
  "extends": ["@webundsoehne/eslint-config/react-typescript"]
}
```
