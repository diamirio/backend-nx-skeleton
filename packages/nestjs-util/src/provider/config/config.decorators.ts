import { Inject } from '@nestjs/common'

import { CONFIG_PARAMS } from './config.constants'
import { ConfigService } from './config.service'

export function ConfigParam (path: string, defaultValue?: any): ParameterDecorator {
  return (target: any, propertyKey: string | symbol, parameterIndex: number): void => {
    Reflect.defineMetadata(
      CONFIG_PARAMS,
      [
        ...Reflect.getMetadata(CONFIG_PARAMS, target, propertyKey) || [],
        {
          parameterIndex,
          propertyKey,
          path,
          defaultValue
        }
      ],
      target,
      propertyKey
    )
  }
}

export function Configurable (): MethodDecorator {
  return (target: Record<string, unknown>, key: string | symbol, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]): void {
      (Reflect.getMetadata(CONFIG_PARAMS, target, key) || []).forEach(({ parameterIndex, path, defaultValue }) => {
        if (args[parameterIndex] === undefined) {
          args[parameterIndex] = ConfigService.get(path, defaultValue)
        }
      })

      return originalMethod.apply(this, args)
    }
  }
}

export function InjectConfig (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(ConfigService)
}
