import type { UseRetryOptions } from '@util'
import { useRetry } from '@util'

export function Retry (options: Exclude<UseRetryOptions, 'name'>): MethodDecorator {
  return function (_target: Record<string, any>, _propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    const originalFn = descriptor.value

    descriptor.value = async function (...args: any[]): Promise<any> {
      return useRetry(() => originalFn.apply(this, args), { name: originalFn.name, ...options })
    }

    descriptor.value.name = originalFn.name

    return descriptor
  }
}
