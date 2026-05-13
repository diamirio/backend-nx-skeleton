# eslint-config

## Description

Base set of 

- [eslint](https://www.npmjs.com/package/eslint)
- [typescript-eslint](https://www.npmjs.com/package/typescript-eslint)
- [@stylistic/eslint-plugin](https://www.npmjs.com/package/@stylistic/eslint-plugin)
- [eslint-plugin-import-x](https://www.npmjs.com/package/eslint-plugin-import-x)

linting rules.

## Configs

Import config package on their own via `import { configs } from '@diamir/eslint-config'`

- `configs.base` ... basic eslint rules like `eqeqeq`, `no-eval`, `no-shadow`
- `configs.typescript` ... import order and typescript rules like `@typescript-eslint/naming-convention`
- `configs.style` ... stylistic rules like `@stylistic/quotes`, `@stylistic/semi`

and use them like 

```ts
// eslint.config.mjs
import { configs, utils } from '@diamir/eslint-config'

export default utils.defineConfig(
  globalIgnores(['dist/**']),
  configs.base,
  configs.typescript
)
```

### Minimal

Predefined config for base + TypeScript, including global ignores for `dist` and `migration` folder.

```ts
// eslint.config.mjs
import { minimal } from '@diamir/eslint-config'

export default minimal
```

### Recommended

Predefined config for base + typescript + stylistic, including global ignores for `dist` and `migration` folder.

```ts
// eslint.config.mjs
import { recommended } from '@diamir/eslint-config'

export default recommended
```

## Utils

Imported via `import { utils } from '@diamir/eslint-config'`

### Define-Config

Re-Export of `typescript-eslint` `config` helper. 

```ts
import { utils } from '@diamir/eslint-config'

export default utils.defineConfigs(
  // eslint configs go here
)
```

### Internal Package Import

If using libs with an internal scope (as in tsconfig paths) you can use `internalPackageImport()` to define a regex that identifies those packages to correctly order the imports.

```ts
// eslint.config.mjs
import { recommended, utils } from '@diamir/eslint-config'

export default utils.defineConfig(
  utils.internalPackageImport('^@scope/'),
  recommended
)
```
