# nestjs-retry

## Description

Wrap a class method with this decorator to retry it couple of more times. Useful for external service dependent tasks.

The method must return a Promise of any kind.

---

<!-- TOC -->
* [nestjs-retry](#nestjs-retry)
  * [Description](#description)
  * [Usage](#usage)
* [Links](#links)
<!-- TOC -->

---

## Usage

```typescript
import { Retry } from '@diamir/nestjs-retry'

@Retry({
  name: 'example',
  retry: 24, // retry count
  interval: 3 * 1000 // timeout before next try
})
example(): Promise<void> {
    // some logic that could throw
}
```

# Links
- [Diamir](https://diamir.io/)
- [nestjs](https://nestjs.com/)
