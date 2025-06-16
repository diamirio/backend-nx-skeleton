<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# nestjs-retry

<!-- TOC -->
* [nestjs-retry](#nestjs-retry)
  * [Description](#description)
<!-- TOC -->

## Description

Wrap a class method with this decorator to retry it couple of more times. Useful for external service dependent tasks.

The method must return a Promise of any kind.

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
