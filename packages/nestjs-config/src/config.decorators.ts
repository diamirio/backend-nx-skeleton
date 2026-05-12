import 'reflect-metadata'

import { CONFIG_PARAMS } from './config.constants'
import { ConfigService } from './config.service'

/**
 * Mark a parameter as config-parameter
 * that will be fetched from the config if not manually set
 *
 * @param {string} path
 * @param {any} defaultValue
 * @constructor
 */
export function ConfigParam<D>(path: string, defaultValue?: D): ParameterDecorator {
  return (target: any, propertyKey: string | symbol, parameterIndex: number): void => {
    const params = Reflect.getMetadata(CONFIG_PARAMS, target, propertyKey) ?? []

    params.push({
      parameterIndex,
      propertyKey,
      path,
      defaultValue
    })

    Reflect.defineMetadata(CONFIG_PARAMS, params, target, propertyKey)
  }
}

/**
 * Required for `@ConfigParam()` to work
 *
 * Replaces each marked parameter with the config value or fallback
 *
 * @constructor
 */
export function Configurable(): MethodDecorator {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor): void => {
    const originalMethod: (...args: any) => any = descriptor.value
    const metadata = Reflect.getMetadata(CONFIG_PARAMS, target, key) ?? []

    descriptor.value = function <R>(...args: any[]): R {
      for (const { parameterIndex, path, defaultValue } of metadata) {
        if (args[parameterIndex] === undefined) {
          args[parameterIndex] = ConfigService.get(path, defaultValue)
        }
      }

      return originalMethod.apply(this, args)
    }
  }
}
