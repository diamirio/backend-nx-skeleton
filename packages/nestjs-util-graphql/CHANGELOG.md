# @webundsoehne/nestjs-util-graphql [4.0.0-beta.5](https://gitlab.diamir.tech/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@4.0.0-beta.4...@webundsoehne/nestjs-util-graphql@4.0.0-beta.5) (2023-12-01)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 8.0.0-beta.5

# @webundsoehne/nestjs-util-graphql [4.0.0-beta.4](https://gitlab.diamir.tech/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@4.0.0-beta.3...@webundsoehne/nestjs-util-graphql@4.0.0-beta.4) (2023-12-01)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 8.0.0-beta.4

# @webundsoehne/nestjs-util-graphql [4.0.0-beta.3](https://gitlab.diamir.tech/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@4.0.0-beta.2...@webundsoehne/nestjs-util-graphql@4.0.0-beta.3) (2023-12-01)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 8.0.0-beta.3

# @webundsoehne/nestjs-util-graphql [4.0.0-beta.2](https://gitlab.diamir.tech/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@4.0.0-beta.1...@webundsoehne/nestjs-util-graphql@4.0.0-beta.2) (2023-12-01)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 8.0.0-beta.2

# @webundsoehne/nestjs-util-graphql [4.0.0-beta.1](https://gitlab.diamir.tech/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.12...@webundsoehne/nestjs-util-graphql@4.0.0-beta.1) (2023-12-01)

### Performance Improvements

- **nestjs-util:** rewrite filters ([17fb359](https://gitlab.diamir.tech/bdsm/nx-skeleton/commit/17fb359ad164272eb9343d708fded212e997814e))

### BREAKING CHANGES

- **nestjs-util:** - GlobalExceptionFilter stays in the @webundsoehne/nestjs-util

* BadRequestExceptionFilter is deleted since it now utilizes ClassValidatorException and ExtendedValidationPipe to throw the error directly as HttpException
* RpcGlobalExceptionFilter is deleted and GlobalExceptionFilter can be used for it directly since with the newer nestjs versions it seems to parse the context correctly
* From anywhere in your code you can throw ClassValidatorException to throw arbitrary validation errors if you do validateOrReject().
* error stack trace is propagated to the service directly (see 1th screenshot) and it will write the service name in front if it to designate it as external error (for now only configrued for rmq)
* seems to handle all kinds of messages i can think of see rest of the screenshots
* refactored the class validator error a bit more. for child properties it includes the parent property name like parent.child.test etc. (see last screenshots)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 8.0.0-beta.1

## @webundsoehne/nestjs-util-graphql [3.0.12](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.11...@webundsoehne/nestjs-util-graphql@3.0.12) (2023-10-12)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.1.7

## @webundsoehne/nestjs-util-graphql [3.0.11](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.10...@webundsoehne/nestjs-util-graphql@3.0.11) (2023-07-20)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.1.6

## @webundsoehne/nestjs-util-graphql [3.0.10](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.9...@webundsoehne/nestjs-util-graphql@3.0.10) (2023-07-20)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.1.5

## @webundsoehne/nestjs-util-graphql [3.0.9](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.8...@webundsoehne/nestjs-util-graphql@3.0.9) (2023-04-17)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.1.4

## @webundsoehne/nestjs-util-graphql [3.0.8](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.7...@webundsoehne/nestjs-util-graphql@3.0.8) (2023-02-27)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.1.3

## @webundsoehne/nestjs-util-graphql [3.0.7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.6...@webundsoehne/nestjs-util-graphql@3.0.7) (2023-02-27)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.1.2

## @webundsoehne/nestjs-util-graphql [3.0.6](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.5...@webundsoehne/nestjs-util-graphql@3.0.6) (2023-02-23)

### Bug Fixes

- **deps:** update for breaking changes in deep-merge library ([08b00ad](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/08b00ad22f5e6e1af6a5d28bb4ed78a79df5e8db))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.1.1

## @webundsoehne/nestjs-util-graphql [3.0.5](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.4...@webundsoehne/nestjs-util-graphql@3.0.5) (2023-02-23)

### Bug Fixes

- **nestjs-util:** update graphql error parsing to handle direct graphql errors ([660f30c](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/660f30ccf635fed8791b9e74f726b695caabedbb))

## @webundsoehne/nestjs-util-graphql [3.0.4](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.3...@webundsoehne/nestjs-util-graphql@3.0.4) (2023-02-23)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.1.0

## @webundsoehne/nestjs-util-graphql [3.0.3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.2...@webundsoehne/nestjs-util-graphql@3.0.3) (2023-02-22)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.0.3

## @webundsoehne/nestjs-util-graphql [3.0.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.1...@webundsoehne/nestjs-util-graphql@3.0.2) (2023-02-22)

### Bug Fixes

- issues with graphql error filter ([0e9f5e8](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/0e9f5e8bb657fefcefb8c446fef830f97bfcd175))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.0.2

## @webundsoehne/nestjs-util-graphql [3.0.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.0...@webundsoehne/nestjs-util-graphql@3.0.1) (2023-02-22)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.0.1

# @webundsoehne/nestjs-util-graphql [3.0.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.9...@webundsoehne/nestjs-util-graphql@3.0.0) (2023-02-22)

### Bug Fixes

- update graphql error parsing ([2de5d54](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/2de5d543dea2bc5d9c5b827d59d57bbff806330f))

### Performance Improvements

- **nestjs-util:** error handling and filters ([f49d8aa](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/f49d8aa3dbadf5f60c7b64342bee28b71a63860f))

### BREAKING CHANGES

- **nestjs-util:** Completely breaks how errors was handled before to mitigate always getting 500 errors.

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.0.0

# @webundsoehne/nestjs-util-graphql [3.0.0-beta.3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.0-beta.2...@webundsoehne/nestjs-util-graphql@3.0.0-beta.3) (2023-02-22)

### Bug Fixes

- update graphql error parsing ([2de5d54](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/2de5d543dea2bc5d9c5b827d59d57bbff806330f))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.0.0-beta.3

# @webundsoehne/nestjs-util-graphql [3.0.0-beta.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@3.0.0-beta.1...@webundsoehne/nestjs-util-graphql@3.0.0-beta.2) (2023-02-22)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.0.0-beta.2

# @webundsoehne/nestjs-util-graphql [3.0.0-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.9...@webundsoehne/nestjs-util-graphql@3.0.0-beta.1) (2023-02-22)

### Performance Improvements

- **nestjs-util:** error handling and filters ([f49d8aa](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/f49d8aa3dbadf5f60c7b64342bee28b71a63860f))

### BREAKING CHANGES

- **nestjs-util:** Completely breaks how errors was handled before to mitigate always getting 500 errors.

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 7.0.0-beta.1

## @webundsoehne/nestjs-util-graphql [2.0.9](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.8...@webundsoehne/nestjs-util-graphql@2.0.9) (2023-02-07)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.9

## @webundsoehne/nestjs-util-graphql [2.0.8](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.7...@webundsoehne/nestjs-util-graphql@2.0.8) (2023-02-07)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.8

## @webundsoehne/nestjs-util-graphql [2.0.7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.6...@webundsoehne/nestjs-util-graphql@2.0.7) (2023-02-07)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.7

## @webundsoehne/nestjs-util-graphql [2.0.6](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.5...@webundsoehne/nestjs-util-graphql@2.0.6) (2022-11-23)

### Bug Fixes

- do not bundle and swap typescript paths manually from jsfiles ([e9b13f0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/e9b13f07eed2c3648bb5b3370f731daaef1377b1))
- issue with bundling ([7afe3d0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/7afe3d035343c5dd19d0c5fe962888e7492f3b68))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.6

## @webundsoehne/nestjs-util-graphql [2.0.5](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.4...@webundsoehne/nestjs-util-graphql@2.0.5) (2022-11-14)

### Bug Fixes

- remove upper limits on peer deps ([116df4e](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/116df4e4c3ad3e2a6745d908d1d73e7baaa2c7b5))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.5

## @webundsoehne/nestjs-util-graphql [2.0.4](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.3...@webundsoehne/nestjs-util-graphql@2.0.4) (2022-11-04)

### Bug Fixes

- issues with missing types on packages ([de76566](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/de76566d5010c050398723c812a6761f9b63a4de))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.4

## @webundsoehne/nestjs-util-graphql [2.0.3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.2...@webundsoehne/nestjs-util-graphql@2.0.3) (2022-11-02)

### Bug Fixes

- update build mechanism for all repositories, fix tsc-watch for builders ([df4a61e](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/df4a61ed8ab9b15a76089f22daadb33acfa693fe))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.3

## @webundsoehne/nestjs-util-graphql [2.0.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.1...@webundsoehne/nestjs-util-graphql@2.0.2) (2022-10-25)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.2

## @webundsoehne/nestjs-util-graphql [2.0.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.0...@webundsoehne/nestjs-util-graphql@2.0.1) (2022-10-06)

### Bug Fixes

- update deps ([5d18ba7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/5d18ba77d558bffd6a235a0e4e0143b785378328))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.1

# @webundsoehne/nestjs-util-graphql [2.0.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.8...@webundsoehne/nestjs-util-graphql@2.0.0) (2022-10-05)

### Bug Fixes

- **deps:** bump dependendencies ([1c5c2df](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/1c5c2df6274de822c73edc4f083ebf835d5039f7))
- update packages ([3d04baf](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/3d04baf77fe95b2914b145d4d4313dfdfc4e520f))

### Performance Improvements

- nx14 upgrade ([968801a](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/968801a20dc1978c5baf7dfa71f21375e59809e9))
- update depednencies for cli apps ([dbdd8d6](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/dbdd8d668a23664aef2b59cfe5d0337c3b4d4a64))
- updates underlying library versions ([0bc345f](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/0bc345f89c46cca58977ff9b9f7db2a7ef64d515))

### BREAKING CHANGES

- uses the new library

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.0

# @webundsoehne/nestjs-util-graphql [2.0.0-beta.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@2.0.0-beta.1...@webundsoehne/nestjs-util-graphql@2.0.0-beta.2) (2022-10-05)

### Performance Improvements

- updates underlying library versions ([0bc345f](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/0bc345f89c46cca58977ff9b9f7db2a7ef64d515))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.0-beta.3

# @webundsoehne/nestjs-util-graphql [2.0.0-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.8...@webundsoehne/nestjs-util-graphql@2.0.0-beta.1) (2022-09-19)

### Bug Fixes

- **deps:** bump dependendencies ([1c5c2df](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/1c5c2df6274de822c73edc4f083ebf835d5039f7))
- update packages ([3d04baf](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/3d04baf77fe95b2914b145d4d4313dfdfc4e520f))

### Performance Improvements

- nx14 upgrade ([968801a](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/968801a20dc1978c5baf7dfa71f21375e59809e9))
- update depednencies for cli apps ([dbdd8d6](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/dbdd8d668a23664aef2b59cfe5d0337c3b4d4a64))

### BREAKING CHANGES

- uses the new library

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 6.0.0-beta.2

## @webundsoehne/nestjs-util-graphql [1.3.8-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.7...@webundsoehne/nestjs-util-graphql@1.3.8-beta.1) (2022-08-08)

### Bug Fixes

- **deps:** bump dependendencies ([1c5c2df](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/1c5c2df6274de822c73edc4f083ebf835d5039f7))

### Performance Improvements

- nx14 upgrade ([968801a](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/968801a20dc1978c5baf7dfa71f21375e59809e9))

## @webundsoehne/nestjs-util-graphql [1.3.8](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.7...@webundsoehne/nestjs-util-graphql@1.3.8) (2022-09-15)

### Dependencies

<<<<<<< HEAD

- # **@webundsoehne/nestjs-util:** upgraded to 6.0.0-beta.1
- **@webundsoehne/nestjs-util:** upgraded to 5.5.5
  > > > > > > > master

## @webundsoehne/nestjs-util-graphql [1.3.7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.6...@webundsoehne/nestjs-util-graphql@1.3.7) (2022-08-03)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.5.4

## @webundsoehne/nestjs-util-graphql [1.3.6](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.5...@webundsoehne/nestjs-util-graphql@1.3.6) (2022-06-09)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.5.3

## @webundsoehne/nestjs-util-graphql [1.3.5](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.4...@webundsoehne/nestjs-util-graphql@1.3.5) (2022-06-07)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.5.2

## @webundsoehne/nestjs-util-graphql [1.3.4](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.3...@webundsoehne/nestjs-util-graphql@1.3.4) (2022-06-02)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.5.1

## @webundsoehne/nestjs-util-graphql [1.3.3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.2...@webundsoehne/nestjs-util-graphql@1.3.3) (2022-06-02)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.5.0

## @webundsoehne/nestjs-util-graphql [1.3.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.1...@webundsoehne/nestjs-util-graphql@1.3.2) (2022-05-03)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.4.3

## @webundsoehne/nestjs-util-graphql [1.3.2-beta.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.2-beta.1...@webundsoehne/nestjs-util-graphql@1.3.2-beta.2) (2022-05-02)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.4.3-beta.2

## @webundsoehne/nestjs-util-graphql [1.3.2-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.1...@webundsoehne/nestjs-util-graphql@1.3.2-beta.1) (2022-05-02)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.4.3-beta.1

## @webundsoehne/nestjs-util-graphql [1.3.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.3.0...@webundsoehne/nestjs-util-graphql@1.3.1) (2022-04-19)

### Bug Fixes

- disable gitlab while releasing for now ([e30a432](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/e30a43247f725b38fd59a7634c71c85d52331291))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.4.2

# @webundsoehne/nestjs-util-graphql [1.3.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.2.2...@webundsoehne/nestjs-util-graphql@1.3.0) (2022-04-19)

### Bug Fixes

- add back gitlab releases to try ([d4bc21f](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d4bc21f7667f3fda4ccb6c8173ce7667d8fd372e))
- bump release ([ab310c3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/ab310c3c2f0db48bdbf9fff9c31ff4f171055e01))
- fixes previous publishing fix ([4365bbe](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4365bbe69e840e563097dd629c1cd9352a89956c))
- janitoring, README.md updates ([fe8a4c4](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/fe8a4c47bba245fe6338988fef4c5c025e455666))
- republish packages ([3f2b2e3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/3f2b2e339fc78c4e11263981fc78d787034472ff))
- update base package to esm for new multi-semantic-release versions ([d0798b8](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d0798b822e3f25968a573712b998a189292159c7))
- update repo url ([bbc48e3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/bbc48e30f42691ef3513eb47b0776b9658409bc1))

### Features

- get over semantic-release hang ([5f83281](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/5f83281a01242f536ce2b57a98f049c42c6684ab))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.4.1

# @webundsoehne/nestjs-util-graphql [1.3.0-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.2.3-beta.1...@webundsoehne/nestjs-util-graphql@1.3.0-beta.1) (2022-04-19)

### Bug Fixes

- bump release ([ab310c3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/ab310c3c2f0db48bdbf9fff9c31ff4f171055e01))
- fixes previous publishing fix ([4365bbe](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4365bbe69e840e563097dd629c1cd9352a89956c))
- janitoring, README.md updates ([fe8a4c4](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/fe8a4c47bba245fe6338988fef4c5c025e455666))
- republish packages ([3f2b2e3](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/3f2b2e339fc78c4e11263981fc78d787034472ff))
- update base package to esm for new multi-semantic-release versions ([d0798b8](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d0798b822e3f25968a573712b998a189292159c7))

### Features

- get over semantic-release hang ([5f83281](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/5f83281a01242f536ce2b57a98f049c42c6684ab))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.4.0-beta.1

## @webundsoehne/nestjs-util-graphql [1.2.3-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.2.2...@webundsoehne/nestjs-util-graphql@1.2.3-beta.1) (2022-04-04)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.3.2-beta.1

## @webundsoehne/nestjs-util-graphql [1.2.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.2.1...@webundsoehne/nestjs-util-graphql@1.2.2) (2022-03-04)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.3.1

## @webundsoehne/nestjs-util-graphql [1.2.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.2.0...@webundsoehne/nestjs-util-graphql@1.2.1) (2022-02-17)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.3.0

# @webundsoehne/nestjs-util-graphql [1.2.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.1.0...@webundsoehne/nestjs-util-graphql@1.2.0) (2022-02-17)

### Features

- infer package version from the workspace version ([76fbd98](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/76fbd986936e62e6da735194649fd1a38de38061))
- use npx or yarn exec like paths instead of hardcoding for windows ([d1172a7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d1172a7ebe345347ba72b8ffa24f544cfeef56c1))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.2.0

# @webundsoehne/nestjs-util-graphql [1.2.0-beta.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.2.0-beta.1...@webundsoehne/nestjs-util-graphql@1.2.0-beta.2) (2022-02-17)

### Features

- infer package version from the workspace version ([76fbd98](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/76fbd986936e62e6da735194649fd1a38de38061))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.2.0-beta.2

# @webundsoehne/nestjs-util-graphql [1.2.0-beta.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.1.0...@webundsoehne/nestjs-util-graphql@1.2.0-beta.1) (2022-02-15)

### Features

- use npx or yarn exec like paths instead of hardcoding for windows ([d1172a7](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d1172a7ebe345347ba72b8ffa24f544cfeef56c1))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.2.0-beta.1

# @webundsoehne/nestjs-util-graphql [1.1.0](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.0.2...@webundsoehne/nestjs-util-graphql@1.1.0) (2022-02-05)

### Features

- dont lint whenever there is no prior configuration, fix builders install ([2cac426](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/2cac4262018cbad0ae0bb172275fcbe31b981fae)), closes [#21](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/issues/21) [#22](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/issues/22)

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.1.0

## @webundsoehne/nestjs-util-graphql [1.0.2](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.0.1...@webundsoehne/nestjs-util-graphql@1.0.2) (2022-02-04)

### Bug Fixes

- initiating builder dependencies ([d2b9617](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/d2b961712580fbed82de82058976dfd58b841457))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.0.2

## @webundsoehne/nestjs-util-graphql [1.0.1](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/compare/@webundsoehne/nestjs-util-graphql@1.0.0...@webundsoehne/nestjs-util-graphql@1.0.1) (2022-02-04)

### Bug Fixes

- update all unresolved deps ([4d78589](https://gitlab.tailored-apps.com/bdsm/nx-skeleton/commit/4d7858994fae5835df5fb44f89e8b0dd1afc6bdb))

### Dependencies

- **@webundsoehne/nestjs-util:** upgraded to 5.0.1

# @webundsoehne/nestjs-util-graphql 1.0.0 (2022-02-04)

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
