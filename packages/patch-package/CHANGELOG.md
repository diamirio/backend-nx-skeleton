## @webundsoehne/patch-package [1.0.2](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/patch-package@1.0.1...@webundsoehne/patch-package@1.0.2) (2021-03-05)


### Bug Fixes

* add missing deps ([aaa2d2c](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/aaa2d2c4d7116c80581a2dcd2db712c2f3ca4336))

## @webundsoehne/patch-package [1.0.1](https://gitlab.tailored-apps.com/ckilic/nx-test/compare/@webundsoehne/patch-package@1.0.0...@webundsoehne/patch-package@1.0.1) (2021-03-04)


### Bug Fixes

* add class transformer fix ([60b6785](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/60b6785807150349c384850f08085c846bacabf9))

# @webundsoehne/patch-package 1.0.0 (2021-03-04)


### Bug Fixes

* adds patching packages module, bump packages ([cac9597](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/cac9597b2c3baab1396b2dc8ca3141e235508f00))
* fix again how command is handled ([117ef1a](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/117ef1aba9a466b99187d44200363ff05ce11ac4))
* improve grouping of patches ([f7c07d1](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/f7c07d11b2e9104737b482bf3a729501a1ad938e))


### Features

* update patch-package to use globs ([762b989](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/762b989d372dd0fe0faacf3d6dcde8366338df19))


### Performance Improvements

* update all the packages ([59d13d4](https://gitlab.tailored-apps.com/ckilic/nx-test/commit/59d13d4e3ba351f8876522f6c723350e953756dc))


### BREAKING CHANGES

* There is ton of breaking changes due to angular, nx base libraries.

Fixed the bug with the apollo-server not liking fastify2 for playground by using beta.
Updated everything to latest version therefore contains a lot of breaking changes.
