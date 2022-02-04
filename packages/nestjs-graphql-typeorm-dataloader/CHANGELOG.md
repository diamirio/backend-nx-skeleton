# @webundsoehne/nestjs-graphql-typeorm-dataloader [3.0.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.2...@webundsoehne/nestjs-graphql-typeorm-dataloader@3.0.0) (2022-02-04)


### Bug Fixes

* deprecetad builder entry for executor ([01681ce](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/01681ce79f455af0123ccf0d19434f55a16871bb))
* eslint config utils to auto isolate tsconfig paths ([e71a2a2](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e71a2a29cd05677bf635ab580842bf4e57aeac21))
* fix cjs exporting, not use esm in anyplace because of package.json ([b182968](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/b182968fc9ec27c8f3e985b9b6fe011da8c0d64b))
* swap out tsconfig paths ([6b3be3b](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6b3be3b6de7a4990ca4a5837512e5b508ae5b6c3))
* update dependencies ([f569b85](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f569b85eb955e8e9b23d48b17493e4c6e9d361d2))
* update integration for new project based nx ([5a7dd4a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))


### Features

* add development mode for autolinking packages, fixes some bugs ([c104f33](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/c104f33ede397268d06200a2d230314f1bfb2fa6))
* some performance improvements with major bug fixes of initiation and formatting ([5fa68c4](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5fa68c4bdaf7304d0817def307c7115d71f97081))


### Performance Improvements

* linting rules ([48134e6](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/48134e6b81fe366dad82ef980ce592ef3895686e))
* stricter linting rules ([6206f94](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6206f94c7dd0be4b9fee2be21559bcae3afc0949))
* swap the build system because of 24gb ram usage xd ([4d51c36](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/4d51c36c266ae64c82c4387190a72077d8a0976c))


### BREAKING CHANGES

* drops anything less than node16, strictly commonjs still, transpiled to es2021
* make everything non-public
* stricter linting rules may cause libraries to not work
for typescript version that are older than 4 because of the import type
  and export type statements. what advantage that it provides is that it
  wont crash anymore for any of the missing dependencies that are only
  types
* drops the builders completely due to they being not avaiable in nx anymore
* might break older configurations do to library change

# @webundsoehne/nestjs-graphql-typeorm-dataloader [3.0.0-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.2...@webundsoehne/nestjs-graphql-typeorm-dataloader@3.0.0-beta.1) (2022-01-26)

### Bug Fixes

- deprecetad builder entry for executor ([01681ce](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/01681ce79f455af0123ccf0d19434f55a16871bb))
- swap out tsconfig paths ([6b3be3b](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6b3be3b6de7a4990ca4a5837512e5b508ae5b6c3))
- update dependencies ([f569b85](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f569b85eb955e8e9b23d48b17493e4c6e9d361d2))
- update integration for new project based nx ([5a7dd4a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5a7dd4a938b2755c2c209c55581a6b7eced41ab5))

### BREAKING CHANGES

- drops the builders completely due to they being not avaiable in nx anymore
- might break older configurations do to library change

## @webundsoehne/nestjs-graphql-typeorm-dataloader [2.1.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.1...@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.2) (2021-12-23)

### Bug Fixes

- force publish ([8235127](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/8235127b5be35b15c6355b50a690e9074abcc277))
- loaderr update bug ([f92e4d6](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f92e4d6c57d36297455d769a6639a3dd4f6d9560))

## deploy

## @webundsoehne/nestjs-graphql-typeorm-dataloader [2.1.2-beta.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.1...@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.2-beta.1) (2021-12-23)

### Bug Fixes

- loaderr update bug ([f92e4d6](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f92e4d6c57d36297455d769a6639a3dd4f6d9560))

## @webundsoehne/nestjs-graphql-typeorm-dataloader [2.1.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.0...@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.1) (2021-12-20)

### Bug Fixes

- publish configuration ([e6b13d7](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/e6b13d7cc0e8be02d3246c72c341d37fec7161db))

# @webundsoehne/nestjs-graphql-typeorm-dataloader [2.1.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@2.0.1...@webundsoehne/nestjs-graphql-typeorm-dataloader@2.1.0) (2021-12-17)

### Features

- add keycloak packages ([581c003](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/581c0037f2367c366e92360ce15a4867fd078907))

## @webundsoehne/nestjs-graphql-typeorm-dataloader [2.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@2.0.0...@webundsoehne/nestjs-graphql-typeorm-dataloader@2.0.1) (2021-09-15)

### Bug Fixes

- fix typeorm migration stuff, update versions ([c5cabbc](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/c5cabbcd5e27c39f625be7710a5f87ea38bc43b2))

# @webundsoehne/nestjs-graphql-typeorm-dataloader [2.0.0](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@1.0.3...@webundsoehne/nestjs-graphql-typeorm-dataloader@2.0.0) (2021-08-20)

### Bug Fixes

- update package versions and add more to generator ([0cf3f0d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/0cf3f0df6bebd573d35177564dc82ce49fe4295f))
- update workspace dependencies ([3375252](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/3375252e45fb8d6efddf5f7ab9bced978f0b13c1))

### Features

- adss generator for generating some stuff ([72b00e8](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/72b00e82f0605b70678fb7f6047873528a0e99b5))
- update new version ([ea42e11](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/ea42e1161873e4d31a24a4292b27fc01d7a7fc80))

### Performance Improvements

- update all dependencies ([560f30a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/560f30a9d667cd96118028f0e47657c86d704cd8))

### BREAKING CHANGES

- updates nestjs to 8 and some breaking changes due to playground
- Adds breaking changes because of the nestjs 8 update and rxjs 7 updates.

## @webundsoehne/nestjs-graphql-typeorm-dataloader [1.0.3](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@1.0.2...@webundsoehne/nestjs-graphql-typeorm-dataloader@1.0.3) (2021-06-18)

### Bug Fixes

- add online versions for scripts, faster package manager selection ([5e6e50d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/5e6e50ddde97c2fd37226aa20d7f15f81a44380c))

## @webundsoehne/nestjs-graphql-typeorm-dataloader [1.0.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@1.0.1...@webundsoehne/nestjs-graphql-typeorm-dataloader@1.0.2) (2021-06-01)

### Bug Fixes

- update dependencies and type errors yet again ([968ce16](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/968ce1697140b9651fa520cf19598bb48ed3e089))

## @webundsoehne/nestjs-graphql-typeorm-dataloader [1.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/nestjs-graphql-typeorm-dataloader@1.0.0...@webundsoehne/nestjs-graphql-typeorm-dataloader@1.0.1) (2021-05-27)

### Bug Fixes

- fix database initiation scripts, type errors because of updates ([a4a114d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/a4a114d6878217ac7cf84e113f3d10a43ba9c0cc))
- update nx dependencies only ([6780b6d](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6780b6d3042714d6a83b76072c0a8c2fdddeb997))

# @webundsoehne/nestjs-graphql-typeorm-dataloader 1.0.0 (2021-04-12)

### Bug Fixes

- fix bugs with loading via field testing and update readme ([c7ae736](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/c7ae736f04dece9710dc6a481d70b6b5a57dc70c))

### Features

- initial working version ([0490812](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/0490812db4419d313dfbca199f2d621e3df62458))
- update usability ([6032ca0](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/6032ca0571c52ef1dde732b7b87f628207fca343))
