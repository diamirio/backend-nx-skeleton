## @webundsoehne/nestjs-keycloak-seeder [2.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@2.0.0...@webundsoehne/nestjs-keycloak-seeder@2.0.1) (2022-02-04)

### Bug Fixes

- update all unresolved deps ([4d78589](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4d7858994fae5835df5fb44f89e8b0dd1afc6bdb))

### Dependencies

- **@webundsoehne/deep-merge:** upgraded to 2.0.1
- **@webundsoehne/ts-utility-types:** upgraded to 2.0.1
- **@webundsoehne/nestjs-keycloak:** upgraded to 2.0.1

# @webundsoehne/nestjs-keycloak-seeder [2.0.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.16...@webundsoehne/nestjs-keycloak-seeder@2.0.0) (2022-02-04)

### Bug Fixes

- eslint config utils to auto isolate tsconfig paths ([e71a2a2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e71a2a29cd05677bf635ab580842bf4e57aeac21))
- exports rule to do empty exports ([cd6fbb2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/cd6fbb2a52e8db8172c3592d51d82711eb6207b4))
- fix cjs exporting, not use esm in anyplace because of package.json ([b182968](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/b182968fc9ec27c8f3e985b9b6fe011da8c0d64b))
- update integration for new project based nx ([5a7dd4a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

### Features

- some performance improvements with major bug fixes of initiation and formatting ([5fa68c4](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5fa68c4bdaf7304d0817def307c7115d71f97081))

### Performance Improvements

- linting rules ([48134e6](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/48134e6b81fe366dad82ef980ce592ef3895686e))
- stricter linting rules ([6206f94](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6206f94c7dd0be4b9fee2be21559bcae3afc0949))
- swap the build system because of 24gb ram usage xd ([4d51c36](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4d51c36c266ae64c82c4387190a72077d8a0976c))

### BREAKING CHANGES

- drops anything less than node16, strictly commonjs still, transpiled to es2021
- make everything non-public
- stricter linting rules may cause libraries to not work for typescript version that are older than 4 because of the import type and export type statements. what advantage that it provides is that it wont crash anymore for any of the missing dependencies that are only types

### Dependencies

- **@webundsoehne/deep-merge:** upgraded to 2.0.0
- **@webundsoehne/ts-utility-types:** upgraded to 2.0.0
- **@webundsoehne/nestjs-keycloak:** upgraded to 2.0.0

## @webundsoehne/nestjs-keycloak-seeder [1.0.17-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.16...@webundsoehne/nestjs-keycloak-seeder@1.0.17-beta.1) (2022-01-26)

### Bug Fixes

- exports rule to do empty exports ([cd6fbb2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/cd6fbb2a52e8db8172c3592d51d82711eb6207b4))
- update integration for new project based nx ([5a7dd4a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

### Dependencies

- **@webundsoehne/deep-merge:** upgraded to 1.0.3-beta.1
- **@webundsoehne/ts-utility-types:** upgraded to 1.1.1-beta.1
- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.13-beta.1

## @webundsoehne/nestjs-keycloak-seeder [1.0.16](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.15...@webundsoehne/nestjs-keycloak-seeder@1.0.16) (2022-01-10)

### Bug Fixes

- rollback to half working version ([39dd1d7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/39dd1d73f073eabbf914580801d993c6c982e4b2))
- unglobal module ([4641b9d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4641b9d0e9fbce7802d208ed2e29da7dd45fd309))

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.12

## @webundsoehne/nestjs-keycloak-seeder [1.0.16-beta.3](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.16-beta.2...@webundsoehne/nestjs-keycloak-seeder@1.0.16-beta.3) (2022-01-10)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.12-beta.3

## @webundsoehne/nestjs-keycloak-seeder [1.0.16-beta.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.16-beta.1...@webundsoehne/nestjs-keycloak-seeder@1.0.16-beta.2) (2022-01-07)

### Bug Fixes

- rollback to half working version ([39dd1d7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/39dd1d73f073eabbf914580801d993c6c982e4b2))

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.12-beta.2

## @webundsoehne/nestjs-keycloak-seeder [1.0.16-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.15...@webundsoehne/nestjs-keycloak-seeder@1.0.16-beta.1) (2022-01-07)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.12-beta.1

## @webundsoehne/nestjs-keycloak-seeder [1.0.15](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.14...@webundsoehne/nestjs-keycloak-seeder@1.0.15) (2022-01-07)

### Bug Fixes

- remove module injection ([455cc3a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/455cc3a85499dd18574ffb02386eab55e2d07467))

## @webundsoehne/nestjs-keycloak-seeder [1.0.14](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.13...@webundsoehne/nestjs-keycloak-seeder@1.0.14) (2022-01-07)

### Bug Fixes

- injection problem ([7ff4718](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/7ff471801657d055f63aa3420696dbaf71c54aad))

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.11

## @webundsoehne/nestjs-keycloak-seeder [1.0.13](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.12...@webundsoehne/nestjs-keycloak-seeder@1.0.13) (2022-01-07)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.10

## @webundsoehne/nestjs-keycloak-seeder [1.0.12](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.11...@webundsoehne/nestjs-keycloak-seeder@1.0.12) (2022-01-07)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.9

## @webundsoehne/nestjs-keycloak-seeder [1.0.11](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.10...@webundsoehne/nestjs-keycloak-seeder@1.0.11) (2022-01-05)

### Bug Fixes

- dont export options ([0beb3b7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/0beb3b7b1a528736f783a3e98ca9757603b08a76))

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.8

## @webundsoehne/nestjs-keycloak-seeder [1.0.10](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.9...@webundsoehne/nestjs-keycloak-seeder@1.0.10) (2022-01-05)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.7

## @webundsoehne/nestjs-keycloak-seeder [1.0.9](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.8...@webundsoehne/nestjs-keycloak-seeder@1.0.9) (2022-01-05)

### Bug Fixes

- dont export admin tools ([873c916](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/873c9168e545e0ce55cc3b3df7899681030fea71))

## @webundsoehne/nestjs-keycloak-seeder [1.0.8](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.7...@webundsoehne/nestjs-keycloak-seeder@1.0.8) (2021-12-22)

### Dependencies

- **@webundsoehne/ts-utility-types:** upgraded to 1.1.0

## @webundsoehne/nestjs-keycloak-seeder [1.0.7](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.6...@webundsoehne/nestjs-keycloak-seeder@1.0.7) (2021-12-21)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.6

## @webundsoehne/nestjs-keycloak-seeder [1.0.6](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.5...@webundsoehne/nestjs-keycloak-seeder@1.0.6) (2021-12-20)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.5

## @webundsoehne/nestjs-keycloak-seeder [1.0.5](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.4...@webundsoehne/nestjs-keycloak-seeder@1.0.5) (2021-12-20)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.4

## @webundsoehne/nestjs-keycloak-seeder [1.0.4](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.3...@webundsoehne/nestjs-keycloak-seeder@1.0.4) (2021-12-20)

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.3

## @webundsoehne/nestjs-keycloak-seeder [1.0.3](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.2...@webundsoehne/nestjs-keycloak-seeder@1.0.3) (2021-12-20)

### Bug Fixes

- publish configuration ([e6b13d7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e6b13d7cc0e8be02d3246c72c341d37fec7161db))

### Dependencies

- **@webundsoehne/deep-merge:** upgraded to 1.0.2
- **@webundsoehne/ts-utility-types:** upgraded to 1.0.1
- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.2

## @webundsoehne/nestjs-keycloak-seeder [1.0.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.1...@webundsoehne/nestjs-keycloak-seeder@1.0.2) (2021-12-20)

### Bug Fixes

- pathing ([23c6cd2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/23c6cd2d4dbe0ff03988c7e9c5682b06d9280afe))

### Dependencies

- **@webundsoehne/nestjs-keycloak:** upgraded to 1.0.1

## @webundsoehne/nestjs-keycloak-seeder [1.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak-seeder@1.0.0...@webundsoehne/nestjs-keycloak-seeder@1.0.1) (2021-12-20)

### Dependencies

- **@webundsoehne/deep-merge:** upgraded to 1.0.1

# @webundsoehne/nestjs-keycloak-seeder 1.0.0 (2021-12-20)

### Bug Fixes

- update seed injection ([a108956](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/a1089564a70a9aa191ba38a7182ac0ae00884579))

### Features

- add keycloak packages ([581c003](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/581c0037f2367c366e92360ce15a4867fd078907))
- update package initation ([eb718ae](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/eb718ae0112401c43a32c3f152be3321a12e9e69))

### Dependencies

- **@webundsoehne/ts-utility-types:** upgraded to 1.0.0
