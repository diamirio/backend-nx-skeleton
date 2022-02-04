## @webundsoehne/nestjs-util-restful [1.0.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-restful@1.0.1...@webundsoehne/nestjs-util-restful@1.0.2) (2022-02-04)

### Bug Fixes

- initiating builder dependencies ([d2b9617](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d2b961712580fbed82de82058976dfd58b841457))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.0.2

## @webundsoehne/nestjs-util-restful [1.0.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-restful@1.0.0...@webundsoehne/nestjs-util-restful@1.0.1) (2022-02-04)

### Bug Fixes

- update all unresolved deps ([4d78589](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4d7858994fae5835df5fb44f89e8b0dd1afc6bdb))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.0.1

# @webundsoehne/nestjs-util-restful 1.0.0 (2022-02-04)

### Bug Fixes

- build order issue ([b64d3bc](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/b64d3bca447499c86a4e189cbb3e352eb1dac67e))
- fix cjs exporting, not use esm in anyplace because of package.json ([b182968](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/b182968fc9ec27c8f3e985b9b6fe011da8c0d64b))

### Features

- add more decorators for missing scheduler features ([ea37cbe](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/ea37cbedaacd25db7506cdf9a181925f4a9653ba))

### Performance Improvements

- swap the build system because of 24gb ram usage xd ([4d51c36](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4d51c36c266ae64c82c4387190a72077d8a0976c))
- **nestjs-util:** split in to smaller packages ([39bf50e](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/39bf50e771cb39665cabc9f8c8aae3cee02626c5))

### BREAKING CHANGES

- drops anything less than node16, strictly commonjs still, transpiled to es2021
- **nestjs-util:** this will break older packages due to import points being different

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.0.0
