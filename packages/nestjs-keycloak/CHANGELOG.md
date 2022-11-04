## @webundsoehne/nestjs-keycloak [3.0.4](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@3.0.3...@webundsoehne/nestjs-keycloak@3.0.4) (2022-11-04)


### Bug Fixes

* issues with missing types on packages ([de76566](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/de76566d5010c050398723c812a6761f9b63a4de))

## @webundsoehne/nestjs-keycloak [3.0.3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@3.0.2...@webundsoehne/nestjs-keycloak@3.0.3) (2022-11-02)


### Bug Fixes

* update build mechanism for all repositories, fix tsc-watch for builders ([df4a61e](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/df4a61ed8ab9b15a76089f22daadb33acfa693fe))

## @webundsoehne/nestjs-keycloak [3.0.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@3.0.1...@webundsoehne/nestjs-keycloak@3.0.2) (2022-10-25)


### Bug Fixes

* fix issues with null exceptions in rule ([c53143a](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/c53143af06eefe9709ffefa027f850e20c0375a1))

## @webundsoehne/nestjs-keycloak [3.0.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@3.0.0...@webundsoehne/nestjs-keycloak@3.0.1) (2022-10-06)


### Bug Fixes

* update deps ([5d18ba7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/5d18ba77d558bffd6a235a0e4e0143b785378328))

# @webundsoehne/nestjs-keycloak [3.0.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.3.2...@webundsoehne/nestjs-keycloak@3.0.0) (2022-10-05)


### Bug Fixes

* **deps:** bump dependendencies ([1c5c2df](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/1c5c2df6274de822c73edc4f083ebf835d5039f7))
* update packages ([3d04baf](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/3d04baf77fe95b2914b145d4d4313dfdfc4e520f))


### Performance Improvements

* extend templates ([4c380c5](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4c380c51dfba2d340d09a48df3d0ca4f02374042))
* nx14 upgrade ([968801a](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/968801a20dc1978c5baf7dfa71f21375e59809e9))
* update depednencies for cli apps ([dbdd8d6](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/dbdd8d668a23664aef2b59cfe5d0337c3b4d4a64))
* updates underlying library versions ([0bc345f](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/0bc345f89c46cca58977ff9b9f7db2a7ef64d515))


### BREAKING CHANGES

* uses the new library
* this is not compatible with older versions of the nx-nest generator

- express/fastify is now selectable when selecting a server
- moved database stuff to backend-database from backend-interface
- extend generator to accept injecting arguments
- use the migration module for mongodb
- ditch typeorm-seeding for generic seeder
- add relevant command for seeding to nestjs itself due to dependency injection

# @webundsoehne/nestjs-keycloak [3.0.0-beta.3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@3.0.0-beta.2...@webundsoehne/nestjs-keycloak@3.0.0-beta.3) (2022-10-05)


### Performance Improvements

* updates underlying library versions ([0bc345f](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/0bc345f89c46cca58977ff9b9f7db2a7ef64d515))

# @webundsoehne/nestjs-keycloak [3.0.0-beta.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@3.0.0-beta.1...@webundsoehne/nestjs-keycloak@3.0.0-beta.2) (2022-09-19)


### Bug Fixes

* update packages ([3d04baf](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/3d04baf77fe95b2914b145d4d4313dfdfc4e520f))


### Performance Improvements

* update depednencies for cli apps ([dbdd8d6](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/dbdd8d668a23664aef2b59cfe5d0337c3b4d4a64))


### BREAKING CHANGES

* uses the new library

# @webundsoehne/nestjs-keycloak [3.0.0-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.3.2...@webundsoehne/nestjs-keycloak@3.0.0-beta.1) (2022-08-08)


### Bug Fixes

* **deps:** bump dependendencies ([1c5c2df](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/1c5c2df6274de822c73edc4f083ebf835d5039f7))


### Performance Improvements

* extend templates ([4c380c5](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4c380c51dfba2d340d09a48df3d0ca4f02374042))
* nx14 upgrade ([968801a](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/968801a20dc1978c5baf7dfa71f21375e59809e9))


### BREAKING CHANGES

* this is not compatible with older versions of the nx-nest generator

- express/fastify is now selectable when selecting a server
- moved database stuff to backend-database from backend-interface
- extend generator to accept injecting arguments
- use the migration module for mongodb
- ditch typeorm-seeding for generic seeder
- add relevant command for seeding to nestjs itself due to dependency injection

## @webundsoehne/nestjs-keycloak [2.3.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.3.1...@webundsoehne/nestjs-keycloak@2.3.2) (2022-04-19)

### Bug Fixes

- disable gitlab while releasing for now ([e30a432](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/e30a43247f725b38fd59a7634c71c85d52331291))

## @webundsoehne/nestjs-keycloak [2.3.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.3.0...@webundsoehne/nestjs-keycloak@2.3.1) (2022-04-19)

### Bug Fixes

- update repo url ([bbc48e3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/bbc48e30f42691ef3513eb47b0776b9658409bc1))

# @webundsoehne/nestjs-keycloak [2.3.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.2.0...@webundsoehne/nestjs-keycloak@2.3.0) (2022-04-19)

### Bug Fixes

- add back gitlab releases to try ([d4bc21f](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d4bc21f7667f3fda4ccb6c8173ce7667d8fd372e))
- bump release ([ab310c3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/ab310c3c2f0db48bdbf9fff9c31ff4f171055e01))
- fixes previous publishing fix ([4365bbe](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4365bbe69e840e563097dd629c1cd9352a89956c))
- housekeeping, swap links to oss repos on github ([7e0f209](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/7e0f2093cf8c9afddd3d2f9228ec81896eb2d5e6))
- janitoring, README.md updates ([fe8a4c4](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/fe8a4c47bba245fe6338988fef4c5c025e455666))
- linters gonna lint ([6d7e3e0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/6d7e3e0bfee76e363ab9868d1244adab5a3546ec))
- republish packages ([3f2b2e3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/3f2b2e339fc78c4e11263981fc78d787034472ff))
- update base package to esm for new multi-semantic-release versions ([d0798b8](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d0798b822e3f25968a573712b998a189292159c7))

### Features

- get over semantic-release hang ([5f83281](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/5f83281a01242f536ce2b57a98f049c42c6684ab))

# @webundsoehne/nestjs-keycloak [2.3.0-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.2.0...@webundsoehne/nestjs-keycloak@2.3.0-beta.1) (2022-04-19)

### Bug Fixes

- bump release ([ab310c3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/ab310c3c2f0db48bdbf9fff9c31ff4f171055e01))
- fixes previous publishing fix ([4365bbe](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4365bbe69e840e563097dd629c1cd9352a89956c))
- housekeeping, swap links to oss repos on github ([7e0f209](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/7e0f2093cf8c9afddd3d2f9228ec81896eb2d5e6))
- janitoring, README.md updates ([fe8a4c4](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/fe8a4c47bba245fe6338988fef4c5c025e455666))
- linters gonna lint ([6d7e3e0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/6d7e3e0bfee76e363ab9868d1244adab5a3546ec))
- republish packages ([3f2b2e3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/3f2b2e339fc78c4e11263981fc78d787034472ff))
- update base package to esm for new multi-semantic-release versions ([d0798b8](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d0798b822e3f25968a573712b998a189292159c7))

### Features

- get over semantic-release hang ([5f83281](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/5f83281a01242f536ce2b57a98f049c42c6684ab))

# @webundsoehne/nestjs-keycloak [2.2.0](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.1.0...@webundsoehne/nestjs-keycloak@2.2.0) (2022-02-17)

### Features

- infer package version from the workspace version ([76fbd98](https://github.com/tailoredmedia/backend-nx-skeleton/commit/76fbd986936e62e6da735194649fd1a38de38061))
- use npx or yarn exec like paths instead of hardcoding for windows ([d1172a7](https://github.com/tailoredmedia/backend-nx-skeleton/commit/d1172a7ebe345347ba72b8ffa24f544cfeef56c1))

# @webundsoehne/nestjs-keycloak [2.2.0-beta.2](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.2.0-beta.1...@webundsoehne/nestjs-keycloak@2.2.0-beta.2) (2022-02-17)

### Features

- infer package version from the workspace version ([76fbd98](https://github.com/tailoredmedia/backend-nx-skeleton/commit/76fbd986936e62e6da735194649fd1a38de38061))

# @webundsoehne/nestjs-keycloak [2.2.0-beta.1](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.1.0...@webundsoehne/nestjs-keycloak@2.2.0-beta.1) (2022-02-15)

### Features

- use npx or yarn exec like paths instead of hardcoding for windows ([d1172a7](https://github.com/tailoredmedia/backend-nx-skeleton/commit/d1172a7ebe345347ba72b8ffa24f544cfeef56c1))

# @webundsoehne/nestjs-keycloak [2.1.0](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.0.2...@webundsoehne/nestjs-keycloak@2.1.0) (2022-02-05)

### Features

- dont lint whenever there is no prior configuration, fix builders install ([2cac426](https://github.com/tailoredmedia/backend-nx-skeleton/commit/2cac4262018cbad0ae0bb172275fcbe31b981fae)), closes [#21](https://github.com/tailoredmedia/backend-nx-skeleton/issues/21) [#22](https://github.com/tailoredmedia/backend-nx-skeleton/issues/22)

## @webundsoehne/nestjs-keycloak [2.0.2](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.0.1...@webundsoehne/nestjs-keycloak@2.0.2) (2022-02-04)

### Bug Fixes

- initiating builder dependencies ([d2b9617](https://github.com/tailoredmedia/backend-nx-skeleton/commit/d2b961712580fbed82de82058976dfd58b841457))

## @webundsoehne/nestjs-keycloak [2.0.1](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@2.0.0...@webundsoehne/nestjs-keycloak@2.0.1) (2022-02-04)

### Bug Fixes

- update all unresolved deps ([4d78589](https://github.com/tailoredmedia/backend-nx-skeleton/commit/4d7858994fae5835df5fb44f89e8b0dd1afc6bdb))

# @webundsoehne/nestjs-keycloak [2.0.0](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.12...@webundsoehne/nestjs-keycloak@2.0.0) (2022-02-04)

### Bug Fixes

- eslint config utils to auto isolate tsconfig paths ([e71a2a2](https://github.com/tailoredmedia/backend-nx-skeleton/commit/e71a2a29cd05677bf635ab580842bf4e57aeac21))
- exports rule to do empty exports ([cd6fbb2](https://github.com/tailoredmedia/backend-nx-skeleton/commit/cd6fbb2a52e8db8172c3592d51d82711eb6207b4))
- fix cjs exporting, not use esm in anyplace because of package.json ([b182968](https://github.com/tailoredmedia/backend-nx-skeleton/commit/b182968fc9ec27c8f3e985b9b6fe011da8c0d64b))
- update dependencies ([f569b85](https://github.com/tailoredmedia/backend-nx-skeleton/commit/f569b85eb955e8e9b23d48b17493e4c6e9d361d2))
- update integration for new project based nx ([5a7dd4a](https://github.com/tailoredmedia/backend-nx-skeleton/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

### Features

- add development mode for autolinking packages, fixes some bugs ([c104f33](https://github.com/tailoredmedia/backend-nx-skeleton/commit/c104f33ede397268d06200a2d230314f1bfb2fa6))
- some performance improvements with major bug fixes of initiation and formatting ([5fa68c4](https://github.com/tailoredmedia/backend-nx-skeleton/commit/5fa68c4bdaf7304d0817def307c7115d71f97081))

### Performance Improvements

- swap the build system because of 24gb ram usage xd ([4d51c36](https://github.com/tailoredmedia/backend-nx-skeleton/commit/4d51c36c266ae64c82c4387190a72077d8a0976c))
- **nestjs-util:** split in to smaller packages ([39bf50e](https://github.com/tailoredmedia/backend-nx-skeleton/commit/39bf50e771cb39665cabc9f8c8aae3cee02626c5))
- linting rules ([48134e6](https://github.com/tailoredmedia/backend-nx-skeleton/commit/48134e6b81fe366dad82ef980ce592ef3895686e))
- stricter linting rules ([6206f94](https://github.com/tailoredmedia/backend-nx-skeleton/commit/6206f94c7dd0be4b9fee2be21559bcae3afc0949))

### BREAKING CHANGES

- drops anything less than node16, strictly commonjs still, transpiled to es2021
- **nestjs-util:** this will break older packages due to import points being different
- make everything non-public
- stricter linting rules may cause libraries to not work for typescript version that are older than 4 because of the import type and export type statements. what advantage that it provides is that it wont crash anymore for any of the missing dependencies that are only types

## @webundsoehne/nestjs-keycloak [1.0.13-beta.1](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.12...@webundsoehne/nestjs-keycloak@1.0.13-beta.1) (2022-01-26)

### Bug Fixes

- exports rule to do empty exports ([cd6fbb2](https://github.com/tailoredmedia/backend-nx-skeleton/commit/cd6fbb2a52e8db8172c3592d51d82711eb6207b4))
- update dependencies ([f569b85](https://github.com/tailoredmedia/backend-nx-skeleton/commit/f569b85eb955e8e9b23d48b17493e4c6e9d361d2))
- update integration for new project based nx ([5a7dd4a](https://github.com/tailoredmedia/backend-nx-skeleton/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

## @webundsoehne/nestjs-keycloak [1.0.12](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.11...@webundsoehne/nestjs-keycloak@1.0.12) (2022-01-10)

### Bug Fixes

- add admin module to exports again ([0d13e0a](https://github.com/tailoredmedia/backend-nx-skeleton/commit/0d13e0a27419280a3bd74df1b53812446d263340))
- add injection for options ([81f1f5b](https://github.com/tailoredmedia/backend-nx-skeleton/commit/81f1f5b0537825a3904052fc61a9009f14dec294))
- rollback to half working version ([39dd1d7](https://github.com/tailoredmedia/backend-nx-skeleton/commit/39dd1d73f073eabbf914580801d993c6c982e4b2))
- unglobal module ([4641b9d](https://github.com/tailoredmedia/backend-nx-skeleton/commit/4641b9d0e9fbce7802d208ed2e29da7dd45fd309))

## @webundsoehne/nestjs-keycloak [1.0.12-beta.3](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.12-beta.2...@webundsoehne/nestjs-keycloak@1.0.12-beta.3) (2022-01-10)

### Bug Fixes

- add injection for options ([81f1f5b](https://github.com/tailoredmedia/backend-nx-skeleton/commit/81f1f5b0537825a3904052fc61a9009f14dec294))

## @webundsoehne/nestjs-keycloak [1.0.12-beta.2](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.12-beta.1...@webundsoehne/nestjs-keycloak@1.0.12-beta.2) (2022-01-07)

### Bug Fixes

- rollback to half working version ([39dd1d7](https://github.com/tailoredmedia/backend-nx-skeleton/commit/39dd1d73f073eabbf914580801d993c6c982e4b2))

## @webundsoehne/nestjs-keycloak [1.0.12-beta.1](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.11...@webundsoehne/nestjs-keycloak@1.0.12-beta.1) (2022-01-07)

### Bug Fixes

- add admin module to exports again ([0d13e0a](https://github.com/tailoredmedia/backend-nx-skeleton/commit/0d13e0a27419280a3bd74df1b53812446d263340))

## @webundsoehne/nestjs-keycloak [1.0.11](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.10...@webundsoehne/nestjs-keycloak@1.0.11) (2022-01-07)

### Bug Fixes

- injection problem ([7ff4718](https://github.com/tailoredmedia/backend-nx-skeleton/commit/7ff471801657d055f63aa3420696dbaf71c54aad))

## @webundsoehne/nestjs-keycloak [1.0.10](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.9...@webundsoehne/nestjs-keycloak@1.0.10) (2022-01-07)

### Bug Fixes

- update injection ([763face](https://github.com/tailoredmedia/backend-nx-skeleton/commit/763face99d0b134b3345a760caa3685e07fcd620))

## @webundsoehne/nestjs-keycloak [1.0.9](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.8...@webundsoehne/nestjs-keycloak@1.0.9) (2022-01-07)

### Bug Fixes

- update dependency injection ([a489d13](https://github.com/tailoredmedia/backend-nx-skeleton/commit/a489d13c18658675e6c91e2839f6c2b95588bd4c))

## @webundsoehne/nestjs-keycloak [1.0.8](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.7...@webundsoehne/nestjs-keycloak@1.0.8) (2022-01-05)

### Bug Fixes

- dont export options ([0beb3b7](https://github.com/tailoredmedia/backend-nx-skeleton/commit/0beb3b7b1a528736f783a3e98ca9757603b08a76))

## @webundsoehne/nestjs-keycloak [1.0.7](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.6...@webundsoehne/nestjs-keycloak@1.0.7) (2022-01-05)

### Bug Fixes

- change injection method for nein bug ([595e228](https://github.com/tailoredmedia/backend-nx-skeleton/commit/595e228c2b9dce90c0e36c0063d2d180642595e5))

## @webundsoehne/nestjs-keycloak [1.0.6](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.5...@webundsoehne/nestjs-keycloak@1.0.6) (2021-12-21)

### Bug Fixes

- expose a more generic validate ([e4b1375](https://github.com/tailoredmedia/backend-nx-skeleton/commit/e4b137591280e58505e9327be51e8609a704290f))
- make utility protected ([518dd67](https://github.com/tailoredmedia/backend-nx-skeleton/commit/518dd67c91e1570b19ea850c86cadbcd807db2b6))

## @webundsoehne/nestjs-keycloak [1.0.5](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.4...@webundsoehne/nestjs-keycloak@1.0.5) (2021-12-20)

### Bug Fixes

- remove some deprecations ([380b1b0](https://github.com/tailoredmedia/backend-nx-skeleton/commit/380b1b0c81d50817c2a8f76084f36589a0ae6d7e))

## @webundsoehne/nestjs-keycloak [1.0.4](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.3...@webundsoehne/nestjs-keycloak@1.0.4) (2021-12-20)

### Bug Fixes

- update decorators ([3ce353b](https://github.com/tailoredmedia/backend-nx-skeleton/commit/3ce353bff71304107bdcee27519876cf78e568fa))

## @webundsoehne/nestjs-keycloak [1.0.3](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.2...@webundsoehne/nestjs-keycloak@1.0.3) (2021-12-20)

### Bug Fixes

- make request type selectable ([0b87a4f](https://github.com/tailoredmedia/backend-nx-skeleton/commit/0b87a4f48826b1fa6bce242b8d86cfd8bbceed0f))
- update old type ([7575fdc](https://github.com/tailoredmedia/backend-nx-skeleton/commit/7575fdc981ce7055e15ab9a3c1405aba15b3c818))

## @webundsoehne/nestjs-keycloak [1.0.2](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.1...@webundsoehne/nestjs-keycloak@1.0.2) (2021-12-20)

### Bug Fixes

- publish configuration ([e6b13d7](https://github.com/tailoredmedia/backend-nx-skeleton/commit/e6b13d7cc0e8be02d3246c72c341d37fec7161db))

## @webundsoehne/nestjs-keycloak [1.0.1](https://github.com/tailoredmedia/backend-nx-skeleton/compare/@webundsoehne/nestjs-keycloak@1.0.0...@webundsoehne/nestjs-keycloak@1.0.1) (2021-12-20)

### Bug Fixes

- pathing ([23c6cd2](https://github.com/tailoredmedia/backend-nx-skeleton/commit/23c6cd2d4dbe0ff03988c7e9c5682b06d9280afe))

# @webundsoehne/nestjs-keycloak 1.0.0 (2021-12-20)

### Features

- add keycloak packages ([581c003](https://github.com/tailoredmedia/backend-nx-skeleton/commit/581c0037f2367c366e92360ce15a4867fd078907))

# @webundsoehne/nestjs-keycloak 1.0.0 (2021-12-17)

### Features

- add keycloak packages ([581c003](https://github.com/tailoredmedia/backend-nx-skeleton/commit/581c0037f2367c366e92360ce15a4867fd078907))
