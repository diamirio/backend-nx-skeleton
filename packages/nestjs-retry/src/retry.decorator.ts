import { useRetry } from './use-retry'
import type { UseRetryOptions } from './use-retry-options.interface'

export function Retry(options: Exclude<UseRetryOptions, 'name'>): MethodDecorator {
  return (
    _target: Record<string, any>,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> => {
    const originalFn = descriptor.value

    descriptor.value = async function (...args: any[]): Promise<any> {
      return useRetry(() => originalFn.apply(this, args), { name: propertyKey, ...options })
    }

    return descriptor
  }
}
