// publish-
module.exports = {
  ...require('../../release.config.cjs'),
  pkgRoot: 'dist',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'README.md', 'docs/']
      }
    ],
    '@semantic-release/npm'
  ]
}
