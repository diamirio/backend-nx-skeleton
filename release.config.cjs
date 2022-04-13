module.exports = {
  repositoryUrl: 'git@gitlab.tailored-apps.com:bdsm/nx-skeleton.git',
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
  verifyConditions: ['@semantic-release/changelog', '@semantic-release/git']
}
