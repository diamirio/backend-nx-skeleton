const getError = require('@semantic-release/npm/lib/get-error')
const AggregateError = require('aggregate-error')
const { outputFile, readFile } = require('fs-extra')
const nerfDart = require('nerf-dart')
const path = require('path')
const rc = require('rc')
const getAuthToken = require('registry-auth-token')

module.exports = async (npmrc, registry, { cwd, env: { NPM_TOKEN, NPM_CONFIG_USERCONFIG, NPM_USERNAME, NPM_PASSWORD, NPM_EMAIL } }) => {
  console.info(`Verify authentication for registry ${registry} for cwd ${cwd}.`)

  const { configs, ...rcConfig } = rc('npm', { registry: 'https://registry.npmjs.org/' }, { config: NPM_CONFIG_USERCONFIG || path.resolve(cwd, '.npmrc') })

  if (configs) {
    console.info(`Reading npm config from: ${configs.join(', ')}`)
  }

  const currentConfig = configs ? (await Promise.all(configs.map((config) => readFile(config)))).join('\n') : ''

  if (getAuthToken(registry, { npmrc: rcConfig })) {
    await outputFile(npmrc, currentConfig)
    return
  }

  if (NPM_USERNAME && NPM_PASSWORD && NPM_EMAIL) {
    console.info('Will generate token from username, password, email.')

    const TOKEN = Buffer.from(`${NPM_USERNAME}:${NPM_PASSWORD}`, 'utf8').toString('base64')

    console.log(npmrc, `${currentConfig ? `${currentConfig}\n` : ''}_auth = ${TOKEN}\nemail = ${NPM_EMAIL}`)
    await outputFile(npmrc, `${currentConfig ? `${currentConfig}\n` : ''}_auth = ${TOKEN}\nemail = ${NPM_EMAIL}`)

    console.info(`Wrote NPM_USERNAME, NPM_PASSWORD and NPM_EMAIL to ${npmrc}`)
  } else if (NPM_TOKEN) {
    await outputFile(npmrc, `${currentConfig ? `${currentConfig}\n` : ''}${nerfDart(registry)}:_authToken = ${NPM_TOKEN}`)

    console.info(`Wrote NPM_TOKEN to ${npmrc}`)
  } else {
    throw new AggregateError([ getError('ENONPMTOKEN', { registry }) ])
  }
}
