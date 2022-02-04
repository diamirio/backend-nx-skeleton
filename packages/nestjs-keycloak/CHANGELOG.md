## @webundsoehne/nestjs-keycloak [2.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@2.0.0...@webundsoehne/nestjs-keycloak@2.0.1) (2022-02-04)

### Bug Fixes

- update all unresolved deps ([4d78589](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4d7858994fae5835df5fb44f89e8b0dd1afc6bdb))

# @webundsoehne/nestjs-keycloak [2.0.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.12...@webundsoehne/nestjs-keycloak@2.0.0) (2022-02-04)

### Bug Fixes

- eslint config utils to auto isolate tsconfig paths ([e71a2a2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e71a2a29cd05677bf635ab580842bf4e57aeac21))
- exports rule to do empty exports ([cd6fbb2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/cd6fbb2a52e8db8172c3592d51d82711eb6207b4))
- fix cjs exporting, not use esm in anyplace because of package.json ([b182968](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/b182968fc9ec27c8f3e985b9b6fe011da8c0d64b))
- update dependencies ([f569b85](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f569b85eb955e8e9b23d48b17493e4c6e9d361d2))
- update integration for new project based nx ([5a7dd4a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

### Features

- add development mode for autolinking packages, fixes some bugs ([c104f33](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/c104f33ede397268d06200a2d230314f1bfb2fa6))
- some performance improvements with major bug fixes of initiation and formatting ([5fa68c4](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5fa68c4bdaf7304d0817def307c7115d71f97081))

### Performance Improvements

- swap the build system because of 24gb ram usage xd ([4d51c36](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4d51c36c266ae64c82c4387190a72077d8a0976c))
- **nestjs-util:** split in to smaller packages ([39bf50e](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/39bf50e771cb39665cabc9f8c8aae3cee02626c5))
- linting rules ([48134e6](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/48134e6b81fe366dad82ef980ce592ef3895686e))
- stricter linting rules ([6206f94](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6206f94c7dd0be4b9fee2be21559bcae3afc0949))

### BREAKING CHANGES

- drops anything less than node16, strictly commonjs still, transpiled to es2021
- **nestjs-util:** this will break older packages due to import points being different
- make everything non-public
- stricter linting rules may cause libraries to not work for typescript version that are older than 4 because of the import type and export type statements. what advantage that it provides is that it wont crash anymore for any of the missing dependencies that are only types

## @webundsoehne/nestjs-keycloak [1.0.13-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.12...@webundsoehne/nestjs-keycloak@1.0.13-beta.1) (2022-01-26)

### Bug Fixes

- exports rule to do empty exports ([cd6fbb2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/cd6fbb2a52e8db8172c3592d51d82711eb6207b4))
- update dependencies ([f569b85](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f569b85eb955e8e9b23d48b17493e4c6e9d361d2))
- update integration for new project based nx ([5a7dd4a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

## @webundsoehne/nestjs-keycloak [1.0.12](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.11...@webundsoehne/nestjs-keycloak@1.0.12) (2022-01-10)

### Bug Fixes

- add admin module to exports again ([0d13e0a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/0d13e0a27419280a3bd74df1b53812446d263340))
- add injection for options ([81f1f5b](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/81f1f5b0537825a3904052fc61a9009f14dec294))
- rollback to half working version ([39dd1d7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/39dd1d73f073eabbf914580801d993c6c982e4b2))
- unglobal module ([4641b9d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4641b9d0e9fbce7802d208ed2e29da7dd45fd309))

## @webundsoehne/nestjs-keycloak [1.0.12-beta.3](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.12-beta.2...@webundsoehne/nestjs-keycloak@1.0.12-beta.3) (2022-01-10)

### Bug Fixes

- add injection for options ([81f1f5b](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/81f1f5b0537825a3904052fc61a9009f14dec294))

## @webundsoehne/nestjs-keycloak [1.0.12-beta.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.12-beta.1...@webundsoehne/nestjs-keycloak@1.0.12-beta.2) (2022-01-07)

### Bug Fixes

- rollback to half working version ([39dd1d7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/39dd1d73f073eabbf914580801d993c6c982e4b2))

## @webundsoehne/nestjs-keycloak [1.0.12-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.11...@webundsoehne/nestjs-keycloak@1.0.12-beta.1) (2022-01-07)

### Bug Fixes

- add admin module to exports again ([0d13e0a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/0d13e0a27419280a3bd74df1b53812446d263340))

## @webundsoehne/nestjs-keycloak [1.0.11](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.10...@webundsoehne/nestjs-keycloak@1.0.11) (2022-01-07)

### Bug Fixes

- injection problem ([7ff4718](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/7ff471801657d055f63aa3420696dbaf71c54aad))

## @webundsoehne/nestjs-keycloak [1.0.10](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.9...@webundsoehne/nestjs-keycloak@1.0.10) (2022-01-07)

### Bug Fixes

- update injection ([763face](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/763face99d0b134b3345a760caa3685e07fcd620))

## @webundsoehne/nestjs-keycloak [1.0.9](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.8...@webundsoehne/nestjs-keycloak@1.0.9) (2022-01-07)

### Bug Fixes

- update dependency injection ([a489d13](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/a489d13c18658675e6c91e2839f6c2b95588bd4c))

## @webundsoehne/nestjs-keycloak [1.0.8](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.7...@webundsoehne/nestjs-keycloak@1.0.8) (2022-01-05)

### Bug Fixes

- dont export options ([0beb3b7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/0beb3b7b1a528736f783a3e98ca9757603b08a76))

## @webundsoehne/nestjs-keycloak [1.0.7](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.6...@webundsoehne/nestjs-keycloak@1.0.7) (2022-01-05)

### Bug Fixes

- change injection method for nein bug ([595e228](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/595e228c2b9dce90c0e36c0063d2d180642595e5))

## @webundsoehne/nestjs-keycloak [1.0.6](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.5...@webundsoehne/nestjs-keycloak@1.0.6) (2021-12-21)

### Bug Fixes

- expose a more generic validate ([e4b1375](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e4b137591280e58505e9327be51e8609a704290f))
- make utility protected ([518dd67](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/518dd67c91e1570b19ea850c86cadbcd807db2b6))

## @webundsoehne/nestjs-keycloak [1.0.5](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.4...@webundsoehne/nestjs-keycloak@1.0.5) (2021-12-20)

### Bug Fixes

- remove some deprecations ([380b1b0](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/380b1b0c81d50817c2a8f76084f36589a0ae6d7e))

## @webundsoehne/nestjs-keycloak [1.0.4](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.3...@webundsoehne/nestjs-keycloak@1.0.4) (2021-12-20)

### Bug Fixes

- update decorators ([3ce353b](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/3ce353bff71304107bdcee27519876cf78e568fa))

## @webundsoehne/nestjs-keycloak [1.0.3](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.2...@webundsoehne/nestjs-keycloak@1.0.3) (2021-12-20)

### Bug Fixes

- make request type selectable ([0b87a4f](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/0b87a4f48826b1fa6bce242b8d86cfd8bbceed0f))
- update old type ([7575fdc](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/7575fdc981ce7055e15ab9a3c1405aba15b3c818))

## @webundsoehne/nestjs-keycloak [1.0.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.1...@webundsoehne/nestjs-keycloak@1.0.2) (2021-12-20)

### Bug Fixes

- publish configuration ([e6b13d7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e6b13d7cc0e8be02d3246c72c341d37fec7161db))

## @webundsoehne/nestjs-keycloak [1.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-keycloak@1.0.0...@webundsoehne/nestjs-keycloak@1.0.1) (2021-12-20)

### Bug Fixes

- pathing ([23c6cd2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/23c6cd2d4dbe0ff03988c7e9c5682b06d9280afe))

# @webundsoehne/nestjs-keycloak 1.0.0 (2021-12-20)

### Features

- add keycloak packages ([581c003](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/581c0037f2367c366e92360ce15a4867fd078907))

# @webundsoehne/nestjs-keycloak 1.0.0 (2021-12-17)

### Features

- add keycloak packages ([581c003](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/581c0037f2367c366e92360ce15a4867fd078907))
