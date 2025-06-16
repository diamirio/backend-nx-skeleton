import config from 'config'

export class ConfigService {
  /**
   * Get the config or use default value
   *
   * @param {string} path
   * @param {any} defaultValue
   * @returns {any}
   */
  static get<T = any>(path: string, defaultValue?: T): T {
    let configValue: T

    try {
      configValue = config.get(path)
    } catch (_error) {
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
  static has(path: string): boolean {
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
   * @param {Record<string, any>} moduleConfig
   * @returns {void}
   */
  static setModuleConfig(moduleName: string, moduleConfig: Record<string, any>): void {
    config.util.setModuleDefaults(moduleName, moduleConfig)
  }
}
