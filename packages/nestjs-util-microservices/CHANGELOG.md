# @webundsoehne/nestjs-util-microservices 1.0.0 (2022-02-04)


### Bug Fixes

* fix cjs exporting, not use esm in anyplace because of package.json ([b182968](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/b182968fc9ec27c8f3e985b9b6fe011da8c0d64b))


### Performance Improvements

* swap the build system because of 24gb ram usage xd ([4d51c36](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4d51c36c266ae64c82c4387190a72077d8a0976c))
* **nestjs-util:** split in to smaller packages ([39bf50e](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/39bf50e771cb39665cabc9f8c8aae3cee02626c5))


### BREAKING CHANGES

* drops anything less than node16, strictly commonjs still, transpiled to es2021
* **nestjs-util:** this will break older packages due to import points being different





### Dependencies

* **@webundsoehne/nestjs-util:** upgraded to 5.0.0