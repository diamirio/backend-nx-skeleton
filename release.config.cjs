module.exports = {
  repositoryUrl: 'git@gitlab.tailored-apps.com:bdsm/nx-skeleton.git',
  branches: [
    'main',
    'master',
    'next',
    'next-major',
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
    },
    {
      name: 'rc',
      prerelease: true
    }
  ]
}
