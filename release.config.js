module.exports = {
  branches: [
    'master',
    {
      name: 'alpha',
      prerelease: true
    },
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'rc',
      prerelease: true
    }
  ],
  verifyConditions: [ '@semantic-release/changelog', '@semantic-release/git', '@semantic-release/npm' ]
}
