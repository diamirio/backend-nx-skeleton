module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: [ 'CHANGELOG.md', 'package.json', 'README.md', 'API.md' ]
      }
    ],
    [
      '@semantic-release/exec',
      {
        generateNotesCmd: 'yarn docs:toc',
        failCmd: 'echo "Building failed." && exit 127'
      }
    ],
    '@semantic-release/npm'
  ]
}
