const addChannelNpm = require('@semantic-release/npm/lib/add-channel')
const getPkg = require('@semantic-release/npm/lib/get-pkg')
const prepareNpm = require('@semantic-release/npm/lib/prepare')
const publishNpm = require('@semantic-release/npm/lib/publish')
const verifyNpmConfig = require('@semantic-release/npm/lib/verify-config')
const AggregateError = require('aggregate-error')
const { defaultTo, castArray } = require('lodash')
const tempy = require('tempy')

const verifyNpmAuth = require('./lib/verify-auth')

async function verifyConditions (pluginConfig, context) {
  // If the npm publish plugin is used and has `npmPublish`, `tarballDir` or `pkgRoot` configured, validate them now in order to prevent any release if the configuration is wrong
  if (context.options.publish) {
    const publishPlugin = castArray(context.options.publish).find((config) => config.path && config.path === '@semantic-release/npm') || {}

    pluginConfig.npmPublish = defaultTo(pluginConfig.npmPublish, publishPlugin.npmPublish)
    pluginConfig.tarballDir = defaultTo(pluginConfig.tarballDir, publishPlugin.tarballDir)
    pluginConfig.pkgRoot = defaultTo(pluginConfig.pkgRoot, publishPlugin.pkgRoot)
  }

  const npmrc = tempy.file({ name: '.npmrc' })

  console.log(`Generated new .npmrc for ${context.cwd} with ${npmrc}.`)

  context.INJECT_NPM_RC = npmrc
}

async function prepare (pluginConfig, context) {
  await prepareNpm(context.INJECT_NPM_RC, pluginConfig, context)
}

async function publish (pluginConfig, context) {
  console.info(`Publishing against rc file for ${context.cwd}: ${context.INJECT_NPM_RC ?? 'unknown'}`)

  await prepareNpm(context.INJECT_NPM_RC, pluginConfig, context)

  const pkg = await internalVerify(pluginConfig, context)

  return publishNpm(context.INJECT_NPM_RC, pluginConfig, pkg, context)
}

async function addChannel (pluginConfig, context) {
  const pkg = await internalVerify(pluginConfig, context)

  return addChannelNpm(context.INJECT_NPM_RC, pluginConfig, pkg, context)
}

async function internalVerify (pluginConfig, context) {
  let pkg
  const errors = verifyNpmConfig(pluginConfig) ?? []

  try {
    // Reload package.json in case a previous external step updated it
    pkg = await getPkg(pluginConfig, context)

    if (pluginConfig.npmPublish !== false && pkg.private !== true) {
      await verifyNpmAuth(context.INJECT_NPM_RC, pkg, context)
    }
  } catch (error) {
    if (Array.isArray(error)) {
      errors.push(...error)
    } else {
      errors.push(error)
    }
  }

  if (errors.length > 0) {
    throw new AggregateError(errors)
  }

  return pkg
}

module.exports = {
  verifyConditions,
  prepare,
  publish,
  addChannel
}
