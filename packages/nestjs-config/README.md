# nestjs-config

<!-- TOC -->
* [nestjs-config](#nestjs-config)
  * [Description](#description)
  * [Usage](#usage)
    * [Decorator](#decorator)
  * [Migration](#migration)
<!-- TOC -->

## Description

This is a wrapper for the great [config](https://github.com/lorenwest/node-config) library adding typescript support, fallback values and custom decorators.

## Usage

The basic usage is the same as using the `config` package itself

```typescript
import { ConfigService } from '@diamir/nestjs-config'

// get value
const config = ConfigService.get<string>('path.to.config', 'fallback')

// check for value
if (!ConfigSerivce.has('some.other.path')) {
  // do something
}
```

### Decorator

**Important**

The `@Configurable()` has to be the last decorator before the function is initiated.

```typescript
import { ConfigParam, ConfigService, Configurable, InjectConfig } from '@diamir/nestjs-util'

class CustomService {
  @SomeOtherDecorator()
  @Configurable()
  customMethod (@ConfigParam('path.to.config', 'default-value') config?: string) {
    // ...
  }
}
```

## Migration

To migrate from the old `@webundsoehne/nestjs-util` to `@diamir/nestjs-config`:
- replace the imports
- switch any injected `ConfigService` to the static methods
