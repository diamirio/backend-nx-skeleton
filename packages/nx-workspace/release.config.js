module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: [ 'CHANGELOG.md', 'README.md', 'API.md' ]
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          // eslint-disable-next-line max-len
          'NPM_REGISTRY=https://verdaccio.dev.webundsoehne.com NPM_USER=$PLUGIN_NPM_USERNAME NPM_PASS=$PLUGIN_NPM_PASSWORD NPM_EMAIL=$PLUGIN_NPM_EMAIL npm-cli-login && npm whoami && yarn docs:toc && yarn docs:jsdoc',
        failCmd: 'echo "Building failed." && exit 127'
      }
    ],
    '@semantic-release/npm'
  ]
}
