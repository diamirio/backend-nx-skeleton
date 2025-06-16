import type { PluginConfiguration } from 'nx/src/config/nx-json'

export function addPlugin<T extends { plugins: PluginConfiguration[] }>(content: T, plugin: PluginConfiguration): void {
  const findPlugin = (pluginName: string) => (pluginConfig: PluginConfiguration) => {
    return typeof pluginConfig === 'string' ? pluginConfig === pluginName : pluginConfig.plugin === pluginName
  }
  const name = typeof plugin === 'string' ? plugin : plugin.plugin

  if (!content.plugins?.find(findPlugin(name))) {
    content.plugins = [...(content.plugins ?? []), plugin]
  }
}
