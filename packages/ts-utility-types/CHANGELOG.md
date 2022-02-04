## @webundsoehne/ts-utility-types [2.0.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/ts-utility-types@2.0.1...@webundsoehne/ts-utility-types@2.0.2) (2022-02-04)

### Bug Fixes

- initiating builder dependencies ([d2b9617](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/d2b961712580fbed82de82058976dfd58b841457))

## @webundsoehne/ts-utility-types [2.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/ts-utility-types@2.0.0...@webundsoehne/ts-utility-types@2.0.1) (2022-02-04)

### Bug Fixes

- update all unresolved deps ([4d78589](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4d7858994fae5835df5fb44f89e8b0dd1afc6bdb))

# @webundsoehne/ts-utility-types [2.0.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/ts-utility-types@1.1.0...@webundsoehne/ts-utility-types@2.0.0) (2022-02-04)

### Bug Fixes

- eslint config utils to auto isolate tsconfig paths ([e71a2a2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e71a2a29cd05677bf635ab580842bf4e57aeac21))
- fix cjs exporting, not use esm in anyplace because of package.json ([b182968](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/b182968fc9ec27c8f3e985b9b6fe011da8c0d64b))
- update integration for new project based nx ([5a7dd4a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

### Performance Improvements

- stricter linting rules ([6206f94](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6206f94c7dd0be4b9fee2be21559bcae3afc0949))
- swap the build system because of 24gb ram usage xd ([4d51c36](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4d51c36c266ae64c82c4387190a72077d8a0976c))

### BREAKING CHANGES

- drops anything less than node16, strictly commonjs still, transpiled to es2021
- stricter linting rules may cause libraries to not work for typescript version that are older than 4 because of the import type and export type statements. what advantage that it provides is that it wont crash anymore for any of the missing dependencies that are only types

## @webundsoehne/ts-utility-types [1.1.1-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/ts-utility-types@1.1.0...@webundsoehne/ts-utility-types@1.1.1-beta.1) (2022-01-26)

### Bug Fixes

- update integration for new project based nx ([5a7dd4a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

# @webundsoehne/ts-utility-types [1.1.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/ts-utility-types@1.0.1...@webundsoehne/ts-utility-types@1.1.0) (2021-12-22)

### Features

- add new variable for node-config ([e25123b](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e25123b176a1129c3cf5c20f4d852b84dd5b13c6))

## @webundsoehne/ts-utility-types [1.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/ts-utility-types@1.0.0...@webundsoehne/ts-utility-types@1.0.1) (2021-12-20)

### Bug Fixes

- publish configuration ([e6b13d7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e6b13d7cc0e8be02d3246c72c341d37fec7161db))

# @webundsoehne/ts-utility-types 1.0.0 (2021-12-20)

### Features

- add keycloak packages ([581c003](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/581c0037f2367c366e92360ce15a4867fd078907))
