# @webundsoehne/nestjs-util-microservices [1.2.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-microservices@1.1.0...@webundsoehne/nestjs-util-microservices@1.2.0) (2022-02-17)

### Features

- infer package version from the workspace version ([76fbd98](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/76fbd986936e62e6da735194649fd1a38de38061))
- use npx or yarn exec like paths instead of hardcoding for windows ([d1172a7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d1172a7ebe345347ba72b8ffa24f544cfeef56c1))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.2.0

# @webundsoehne/nestjs-util-microservices [1.2.0-beta.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-microservices@1.2.0-beta.1...@webundsoehne/nestjs-util-microservices@1.2.0-beta.2) (2022-02-17)

### Features

- infer package version from the workspace version ([76fbd98](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/76fbd986936e62e6da735194649fd1a38de38061))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.2.0-beta.2

# @webundsoehne/nestjs-util-microservices [1.2.0-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-microservices@1.1.0...@webundsoehne/nestjs-util-microservices@1.2.0-beta.1) (2022-02-15)

### Features

- use npx or yarn exec like paths instead of hardcoding for windows ([d1172a7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d1172a7ebe345347ba72b8ffa24f544cfeef56c1))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.2.0-beta.1

# @webundsoehne/nestjs-util-microservices [1.1.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-microservices@1.0.2...@webundsoehne/nestjs-util-microservices@1.1.0) (2022-02-05)

### Features

- dont lint whenever there is no prior configuration, fix builders install ([2cac426](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/2cac4262018cbad0ae0bb172275fcbe31b981fae)), closes [#21](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/issues/21) [#22](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/issues/22)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.1.0

## @webundsoehne/nestjs-util-microservices [1.0.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-microservices@1.0.1...@webundsoehne/nestjs-util-microservices@1.0.2) (2022-02-04)

### Bug Fixes

- initiating builder dependencies ([d2b9617](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d2b961712580fbed82de82058976dfd58b841457))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.0.2

## @webundsoehne/nestjs-util-microservices [1.0.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-microservices@1.0.0...@webundsoehne/nestjs-util-microservices@1.0.1) (2022-02-04)

### Bug Fixes

- update all unresolved deps ([4d78589](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4d7858994fae5835df5fb44f89e8b0dd1afc6bdb))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.0.1

# @webundsoehne/nestjs-util-microservices 1.0.0 (2022-02-04)

### Bug Fixes

- fix cjs exporting, not use esm in anyplace because of package.json ([b182968](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/b182968fc9ec27c8f3e985b9b6fe011da8c0d64b))

### Performance Improvements

- swap the build system because of 24gb ram usage xd ([4d51c36](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4d51c36c266ae64c82c4387190a72077d8a0976c))
- **nestjs-util:** split in to smaller packages ([39bf50e](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/39bf50e771cb39665cabc9f8c8aae3cee02626c5))

### BREAKING CHANGES

- drops anything less than node16, strictly commonjs still, transpiled to es2021
- **nestjs-util:** this will break older packages due to import points being different

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.0.0
