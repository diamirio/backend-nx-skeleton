# @webundsoehne/eslint-config [5.1.0-beta.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@5.1.0-beta.1...@webundsoehne/eslint-config@5.1.0-beta.2) (2022-02-17)

### Features

- infer package version from the workspace version ([76fbd98](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/76fbd986936e62e6da735194649fd1a38de38061))

# @webundsoehne/eslint-config [5.1.0-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@5.0.0...@webundsoehne/eslint-config@5.1.0-beta.1) (2022-02-15)

### Features

- use npx or yarn exec like paths instead of hardcoding for windows ([d1172a7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/d1172a7ebe345347ba72b8ffa24f544cfeef56c1))

# @webundsoehne/eslint-config [5.0.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@4.0.1...@webundsoehne/eslint-config@5.0.0) (2022-02-04)

### Bug Fixes

- all linting problems and use it commonly with requires ([e1ed351](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e1ed351a5ff8a9e48d90d71feb82fe8a17d28665))
- deprecetad builder entry for executor ([01681ce](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/01681ce79f455af0123ccf0d19434f55a16871bb))
- eslint config utils to auto isolate tsconfig paths ([e71a2a2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e71a2a29cd05677bf635ab580842bf4e57aeac21))
- update dependencies ([f569b85](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f569b85eb955e8e9b23d48b17493e4c6e9d361d2))
- update rule ([8254c2a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/8254c2a5ca699ea043030551b46165852d0b0e16))

### Features

- add development mode for autolinking packages, fixes some bugs ([c104f33](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/c104f33ede397268d06200a2d230314f1bfb2fa6))
- add import helper ([6137288](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6137288a575e66a98652457273a79743d2952fc4))
- some performance improvements with major bug fixes of initiation and formatting ([5fa68c4](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5fa68c4bdaf7304d0817def307c7115d71f97081))

### Performance Improvements

- linting rules ([48134e6](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/48134e6b81fe366dad82ef980ce592ef3895686e))
- stricter linting rules ([6206f94](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6206f94c7dd0be4b9fee2be21559bcae3afc0949))

### BREAKING CHANGES

- make everything non-public
- stricter linting rules may cause libraries to not work for typescript version that are older than 4 because of the import type and export type statements. what advantage that it provides is that it wont crash anymore for any of the missing dependencies that are only types
- drops the builders completely due to they being not avaiable in nx anymore

# @webundsoehne/eslint-config [5.0.0-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@4.0.1...@webundsoehne/eslint-config@5.0.0-beta.1) (2022-01-26)

### Bug Fixes

- deprecetad builder entry for executor ([01681ce](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/01681ce79f455af0123ccf0d19434f55a16871bb))
- update dependencies ([f569b85](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f569b85eb955e8e9b23d48b17493e4c6e9d361d2))

### BREAKING CHANGES

- drops the builders completely due to they being not avaiable in nx anymore

## @webundsoehne/eslint-config [4.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@4.0.0...@webundsoehne/eslint-config@4.0.1) (2021-08-23)

### Bug Fixes

- errors for parsing html templates on angular application ([4c2d1da](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4c2d1dad3b7c86792e1412f5b0220236a07ca3a2))

# @webundsoehne/eslint-config [4.0.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@3.0.2...@webundsoehne/eslint-config@4.0.0) (2021-08-20)

### Bug Fixes

- update workspace dependencies ([3375252](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/3375252e45fb8d6efddf5f7ab9bced978f0b13c1))

### Performance Improvements

- update all dependencies ([560f30a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/560f30a9d667cd96118028f0e47657c86d704cd8))

### BREAKING CHANGES

- Adds breaking changes because of the nestjs 8 update and rxjs 7 updates.

## @webundsoehne/eslint-config [3.0.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@3.0.1...@webundsoehne/eslint-config@3.0.2) (2021-06-01)

### Bug Fixes

- update dependencies and type errors yet again ([968ce16](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/968ce1697140b9651fa520cf19598bb48ed3e089))

## @webundsoehne/eslint-config [3.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@3.0.0...@webundsoehne/eslint-config@3.0.1) (2021-05-27)

### Bug Fixes

- update nx dependencies only ([6780b6d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6780b6d3042714d6a83b76072c0a8c2fdddeb997))

# @webundsoehne/eslint-config [3.0.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@2.1.2...@webundsoehne/eslint-config@3.0.0) (2021-03-04)

### Performance Improvements

- update all the packages ([59d13d4](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/59d13d4e3ba351f8876522f6c723350e953756dc))

### BREAKING CHANGES

- There is ton of breaking changes due to angular, nx base libraries.

Fixed the bug with the apollo-server not liking fastify2 for playground by using beta. Updated everything to latest version therefore contains a lot of breaking changes.

## @webundsoehne/eslint-config [2.1.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@2.1.1...@webundsoehne/eslint-config@2.1.2) (2021-02-09)

### Bug Fixes

- bump packages of eslint that is failing ([839f06a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/839f06a7d903b3894a0d2e0eb8f6ee798ff00d38))

## @webundsoehne/eslint-config [2.1.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@2.1.0...@webundsoehne/eslint-config@2.1.1) (2020-11-26)

### Bug Fixes

- add gitlab releases ([df1f1fa](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/df1f1fae5a87a8ea65b26608999c9de3b988e429))
- cleanup and changelogs ([a44fc4b](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/a44fc4b0e74b66c6a75109436f710dec803cd2e9))

# @webundsoehne/eslint-config [2.1.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@2.0.0...@webundsoehne/eslint-config@2.1.0) (2020-11-26)

### Features

- bump all ([f44d875](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f44d8759906a5c0050c7b711e3f1a923b3303ca3))

## @webundsoehne/eslint-config [1.1.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@1.1.0...@webundsoehne/eslint-config@1.1.1) (2020-11-25)

### Bug Fixes

- fix ([8ef15e6](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/8ef15e6bdd637ddad3dcc6eb3828fcdf2abefeb2))

### Performance Improvements

- force publish ([cd7fad3](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/cd7fad3bc192d33b145decfbe019c99f89863b96))

## @webundsoehne/eslint-config [1.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config@1.0.0...@webundsoehne/eslint-config@1.0.1) (2020-11-24)

### Bug Fixes

- retry ([9e329de](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/9e329deb362657a98e97ac3a9e17abb5476516b1))

yarn run v1.22.4 $ markdown-toc README.md --bullets='-' -i Done in 0.18s.

# @webundsoehne/eslint-config 1.0.0 (2020-11-24)

### Bug Fixes

- update lint setupo ([8c58401](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/8c58401fe579c63d487b3405f1a4b5a6b467133f))
- **builders:** added to use ts-node-dev locally only ([89b7f95](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/89b7f9505f7713d58881cfc7729873affe82c611))
- add react eslint config while i am at it ([3402233](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/3402233a020de72d27fa9b1e3bcd197e324332a8))
- fixed husky setup ([006cd1e](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/006cd1eb262bf60d510fc52335995e69b13d1624))
- **brownie:** added a lot ([ea98990](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/ea989905334126ac479359fe12a29250c484eafc))
- trying for gitdiffmerge ([b42e623](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/b42e623a370317f7b37d6173d9f1b84fe08b4935))
- **eslint-config:** added local eslint-config ([25b0776](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/25b0776e16998fb8be7f0ec0961a232f601c14bd))

### Features

- added brownie docker module ([90da911](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/90da911ebd3deeae43526e4e8849ff065e13dfec))
- added new workspace package, cleaned up eslint ignore ([4cd1d67](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4cd1d6705d6494af02e8ab0e7766f11d9494ba7f))
- added workspace and the scafolding of it ([dbec287](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/dbec28797b1ae6f230940d6ab43c3716776cc32b))
- finished exports generated documentation ([84e8411](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/84e8411c3bfaf3df6b14beabd255831816cff4f9))
- started brownie finished microservices ([c4750a3](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/c4750a3e970e68242e83d4e8ea2b5a04e03e047f))
- **nx-builders:** cleaned up builders mostly ([5cf213d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5cf213dd5efa99d239909262a56137841a77d16c))

yarn run v1.22.4 $ markdown-toc README.md --bullets='-' -i Done in 0.14s.

# [@webundsoehne/eslint-config-v1.1.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config-v1.0.2...@webundsoehne/eslint-config-v1.1.0) (2020-10-14)

### Features

- added new workspace package, cleaned up eslint ignore ([4cd1d67](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4cd1d6705d6494af02e8ab0e7766f11d9494ba7f))
- added workspace and the scafolding of it ([dbec287](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/dbec28797b1ae6f230940d6ab43c3716776cc32b))
- finished exports generated documentation ([84e8411](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/84e8411c3bfaf3df6b14beabd255831816cff4f9))

# [@webundsoehne/eslint-config-v1.0.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config-v1.0.1...@webundsoehne/eslint-config-v1.0.2) (2020-09-23)

### Bug Fixes

- update lint setupo ([8c58401](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/8c58401fe579c63d487b3405f1a4b5a6b467133f))

# [@webundsoehne/eslint-config-v1.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/eslint-config-v1.0.0...@webundsoehne/eslint-config-v1.0.1) (2020-09-18)

### Bug Fixes

- **builders:** added to use ts-node-dev locally only ([89b7f95](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/89b7f9505f7713d58881cfc7729873affe82c611))

# @webundsoehne/eslint-config-v1.0.0 (2020-08-18)

### Bug Fixes

- add react eslint config while i am at it ([3402233](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/3402233a020de72d27fa9b1e3bcd197e324332a8))
- fixed husky setup ([006cd1e](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/006cd1eb262bf60d510fc52335995e69b13d1624))
- **brownie:** added a lot ([ea98990](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/ea989905334126ac479359fe12a29250c484eafc))
- trying for gitdiffmerge ([b42e623](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/b42e623a370317f7b37d6173d9f1b84fe08b4935))
- **eslint-config:** added local eslint-config ([25b0776](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/25b0776e16998fb8be7f0ec0961a232f601c14bd))

### Features

- **nx-builders:** cleaned up builders mostly ([5cf213d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5cf213dd5efa99d239909262a56137841a77d16c))
