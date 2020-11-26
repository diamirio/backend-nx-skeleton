const getError = require('@semantic-release/npm/lib/get-error')
const getRegistry = require('@semantic-release/npm/lib/get-registry')
const AggregateError = require('aggregate-error')
const execa = require('execa')
const normalizeUrl = require('normalize-url')

const setNpmrcAuth = require('./set-npmrc-auth')

module.exports = async (npmrc, pkg, context) => {
  const { cwd,
    env: { DEFAULT_NPM_REGISTRY = 'https://registry.npmjs.org/', ...env },
    stdout,
    stderr } = context
  const registry = getRegistry(pkg, context)

  await setNpmrcAuth(npmrc, registry, context)

  if (normalizeUrl(registry) === normalizeUrl(DEFAULT_NPM_REGISTRY)) {
    try {
      const whoamiResult = execa('npm', [ 'whoami', '--userconfig', npmrc, '--registry', registry ], { cwd, env })
      whoamiResult.stdout.pipe(stdout, { end: false })
      whoamiResult.stderr.pipe(stderr, { end: false })
      await whoamiResult
    } catch {
      throw new AggregateError([ getError('EINVALIDNPMTOKEN', { registry }) ])
    }
  }
}
