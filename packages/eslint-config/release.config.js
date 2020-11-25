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
        prepareCmd: 'NPM_USER=$PLUGIN_NPM_USERNAME NPM_PASS=$PLUGIN_NPM_PASSWORD NPM_EMAIL=$PLUGIN_NPM_EMAIL npm-cli-login && npm whoami && yarn docs:toc',
        failCmd: 'echo "Building failed." && exit 127'
      }
    ],
    '@semantic-release/npm'
  ]
}
