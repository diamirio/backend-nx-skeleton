import type { PluginConfiguration } from 'nx/src/config/nx-json'

export function addPlugin<T extends { plugins: PluginConfiguration[] }> (content: T, plugin: PluginConfiguration): void {
  const findPlugin = (pluginName: string) => (plugin: PluginConfiguration) => {
    return typeof plugin === 'string' ? plugin === pluginName : plugin.plugin === pluginName
  }
  const pluginName = typeof plugin === 'string' ? plugin : plugin.plugin

  if (!content.plugins?.find(findPlugin(pluginName))) {
    content.plugins = [...content.plugins ?? [], plugin]
  }
}
