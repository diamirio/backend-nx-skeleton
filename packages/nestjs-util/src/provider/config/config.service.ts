import { Injectable } from '@nestjs/common'
import config from 'config'

import { Config } from './config.interfaces'

@Injectable()
export class ConfigService {
  /**
   * Get the config or use default value
   *
   * @param {string} path
   * @param {any} defaultValue
   * @returns {any}
   */
  static get (path: string, defaultValue?: any): any {
    let configValue

    try {
      configValue = config.get(path)
    } catch (error) {
      // don't care about this error
    }

    return configValue === undefined ? defaultValue : configValue
  }

  /**
   * Check if the config exists
   *
   * @param {string} path
   * @returns {boolean}
   */
  static has (path: string): boolean {
    return config.has(path)
  }

  /**
   * ALLOW_CONFIG_MUTATIONS=true
   */

  /**
   * Set module config value at runtime
   *
   * __Note:__
   * This only works if the "ALLOW_CONFIG_MUTATIONS" environment variable is set
   *
   * @param {string} moduleName
   * @param {Config} moduleConfig
   * @returns {void}
   */
  static setModuleConfig (moduleName: string, moduleConfig: Config): void {
    config.util.setModuleDefaults(moduleName, moduleConfig)
  }

  public has (path: string): boolean {
    return ConfigService.has(path)
  }

  public get (path: string, defaultValue?: any): any {
    return ConfigService.get(path, defaultValue)
  }

  public setModuleConfig (moduleName: string, moduleConfig: Config): void {
    return ConfigService.setModuleConfig(moduleName, moduleConfig)
  }
}
