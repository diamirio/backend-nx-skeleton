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
        prepareCmd: 'yarn docs:toc && yarn docs:jsdoc',
        failCmd: 'echo "Building failed." && exit 127'
      }
    ],
    '@semantic-release/npm'
  ]
}
