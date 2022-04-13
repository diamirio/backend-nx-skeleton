module.exports = {
  repositoryUrl: 'https://gitlab.tailored-apps.com/bdsm/nx-skeleton',
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
  verifyConditions: ['@semantic-release/changelog']
}
