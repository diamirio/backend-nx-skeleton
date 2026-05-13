# nestjs-seeder

<!-- TOC -->
* [nestjs-seeder](#nestjs-seeder)
  * [Description](#description)
  * [Usage](#usage)
<!-- TOC -->

## Description

A generic seeder to inject services in to and initiate an application programmatically.

## Usage

Register the `SeederModule` module, add the seed providers (the order of the providers is equal to the execution order) and optional dependencies used by the seeder

To add a seed, create a new injectable class extending `Seed`.

```typescript
import { Injectable } from '@nestjs/common'

import { Seed } from '@diamir/nestjs-seeder'

@Injectable()
export class ExampleSeed extends Seed {
  async run (): Promise<void> {
    this.logger.log('Example seed running...')
  }
}
```

Those seeds can inject providers as usual in nestjs and can be used for more than just database seeding.
