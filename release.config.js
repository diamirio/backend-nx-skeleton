module.exports = {
  extends: 'semantic-release-monorepo',
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
  verifyConditions: ['@semantic-release/changelog', '@semantic-release/git'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'packages/*/CHANGELOG.md', 'README.md', 'packages/*/README.md', 'yarn.lock', 'npm-shrinkwrap.json'],
        message: "chore(release): <%= nextRelease.version %> - <%= new Date().toISOString().slice(0,10).replace(/-/g,'') %> [skip ci]\n\n<%= nextRelease.notes %>"
      }
    ],
    [
      '@semantic-release/gitlab',
      {
        assets: []
      }
    ],
    '@semantic-release/npm'
  ]
}
