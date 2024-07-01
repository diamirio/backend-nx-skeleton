import type { Tree } from '@nrwl/devkit'
import {
  addDependenciesToPackageJson,
  formatFiles,
  getProjects,
  logger,
  readJson,
  readWorkspaceConfiguration,
  removeDependenciesFromPackageJson,
  updateJson,
  updateProjectConfiguration,
  visitNotIgnoredFiles
} from '@nrwl/devkit'
import { basename, join } from 'path'

const defaultAssets = [
  {
    glob: '*',
    input: '{projectRoot}/config',
    output: 'config'
  },
  {
    glob: '.dockerignore',
    input: '{projectRoot}',
    output: '.'
  },
  {
    glob: 'Dockerfile',
    input: '{projectRoot}',
    output: '.'
  },
  {
    glob: '*',
    input: 'patches',
    output: 'patches'
  }
]

export default async function (tree: Tree): Promise<void> {
  if (!tree.exists('nx.json')) {
    return
  }

  updateGitIgnore(tree)
  updateProjects(tree)
  updateImplicitDependencies(tree)
  updateEslintConfig(tree)
  updateJestConfig(tree)
  await updatePackageJson(tree)
  updateNxJson(tree)

  await formatFiles(tree)
}

// remove the old packages and install the new one
// add ts-patch and new path-replacer
async function updatePackageJson (tree: Tree): Promise<void> {
  logger.info('Update to new nx and nx-executors packages')

  updateJson(tree, 'package.json', (content) => {
    content.scripts = {
      ...content.scripts ?? {},
      prepare: 'ts-patch install -s'
    }

    return content
  })
  updateJson(tree, 'tsconfig.json', (content) => {
    content.compilerOptions = {
      ...content.compilerOptions ?? {},
      plugins: [{ transform: 'typescript-transform-paths' }]
    }

    return content
  })

  removeDependenciesFromPackageJson(
    tree,
    [],
    [
      '@angular-devkit/architect',
      '@angular-devkit/core',
      '@angular-devkit/schematics',
      '@nrwl/cli',
      '@nrwl/eslint-plugin-nx',
      '@nrwl/jest',
      '@nrwl/linter',
      '@nrwl/tao',
      '@nrwl/workspace',
      '@webundsoehne/nx-tools',
      '@webundsoehne/nx-builders',
      'tsc-watch',
      'tsconfig-loader',
      'tsconfig-paths',
      'tsconfig-replace-paths',
      // installed with new version
      '@types/jest',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-config-prettier',
      'jest',
      'ts-jest'
    ]
  )
  await addDependenciesToPackageJson(
    tree,
    /* eslint-disable @typescript-eslint/naming-convention */
    {},
    {
      '@nx/eslint': '^19.3.0',
      '@nx/eslint-plugin': '^19.3.0',
      '@nx/workspace': '^19.3.0',
      '@types/jest': '^29.4.0',
      '@typescript-eslint/eslint-plugin': '^7.3.0',
      '@typescript-eslint/parser': '^7.3.0',
      '@webundsoehne/nx-executors': '^1.0.0-beta.1', // new executors
      'eslint-config-prettier': '^9.1.0',
      jest: '^29.4.0',
      nx: '^19.3.0',
      'ts-jest': '^29.1.0',
      'ts-patch': '^3',
      'typescript-transform-paths': '^3'
    }
    /* eslint-enable */
  )()
}

// add new nx cache folder to gitignore
function updateGitIgnore (tree: Tree): void {
  const file = '.gitignore'

  if (tree.isFile(file)) {
    const gitignore = tree.read(file)
    const toIgnore = ['', '# nx cache']

    for (const folder of ['.nx/cache', '.nx/workspace-data']) {
      if (!gitignore.includes(folder)) {
        toIgnore.push(folder)
      }
    }

    tree.write(file, Buffer.concat([gitignore, Buffer.from(toIgnore.join('\n'))]))
  }
}

// remove workspace.json and update nx.json
function updateNxJson (tree: Tree): void {
  logger.info('Update to new nx.json, set defaultTargets and plugins')

  const nxJson = readWorkspaceConfiguration(tree)
  const updatedNxJson: any = {
    $schema: './node_modules/nx/schemas/nx-schema.json'
  }

  updatedNxJson.workspaceLayout = nxJson.workspaceLayout
  updatedNxJson.cli = nxJson.cli
  updatedNxJson.namedInputs = {
    default: ['{projectRoot}/**/*', 'sharedGlobals'],
    production: [
      'default',
      '!{projectRoot}/.eslintrc*',
      '!{projectRoot}/tsconfig.spec.json',
      '!{projectRoot}/**/(jest|jest-e2e).config.[jt]s',
      '!{projectRoot}/**/?(*.)?(e2e-)+(spec|test).[jt]s?(x)?(.snap)'
    ],
    sharedGlobals: []
  }
  updatedNxJson.targetDefaults = {
    serve: {
      options: {
        watchConfig: true
      }
    },
    build: {
      options: {
        assets: defaultAssets
      }
    }
  }
  updatedNxJson.plugins = [
    {
      plugin: '@nx/eslint/plugin',
      options: {
        targetName: 'lint'
      }
    },
    {
      plugin: '@webundsoehne/nx-executors/plugin'
    }
  ]

  updateJson(tree, 'nx.json', () => updatedNxJson)
  tree.delete('workspace.json')
}

// update project configurations
function updateProjects (tree: Tree): void {
  logger.info('Update project.json to use plugins')
  const projects = getProjects(tree)

  for (const [name, project] of projects) {
    const buildTarget = project.targets?.build

    // remove targets that will be covered by the nx-executors/plugin
    // and try to update the old `:run` targets to work without manual updates
    project.targets = Object.fromEntries(
      Object.entries(project.targets ?? {})
        .filter(([target]) => !['build', 'serve', 'test', 'lint'].includes(target))
        .map(([target, value]) => {
          if (value.executor.includes('nx-builders:run')) {
            value.executor = '@webundsoehne/nx-executors:run'
            const options: any = {}

            if (value.options?.environment) {
              options.env = value.options?.environment
            }

            if (value.options?.command?.startsWith('./')) {
              options.command = `ts-node ${value.options.command}`
            } else {
              options.tsNode = true
            }

            value.options = options
          }

          return [target, value]
        })
    )

    // keep non default assets in the project.json
    if (buildTarget) {
      const uniqueAssets = buildTarget.options?.assets?.filter((asset: { input: string, glob: string }) => {
        return (
          asset.glob !== 'package-lock.json' &&
          !defaultAssets.find(({ input, glob }) => {
            return asset.input === input.replace('{projectRoot}', project.root) && asset.glob === glob
          })
        )
      })

      if (uniqueAssets?.length) {
        project.targets.build = {
          options: {
            assets: uniqueAssets
          }
        } as any
      }
    }

    updateProjectConfiguration(tree, name, project)

    updateJson(tree, join(project.root, 'tsconfig.json'), (content) => {
      content.exclude = content.exclude?.filter((e: string) => !['test', '**/*.spec.ts'].includes(e)) ?? []

      return content
    })
  }
}

// update projects package.json implicit dependencies
function updateImplicitDependencies (tree: Tree): void {
  logger.info('Update projects package.json implicitDependencies')
  const projects = getProjects(tree)
  const workspacePackages = readJson(tree, 'package.json')?.dependencies ?? {}

  for (const data of projects) {
    const packageJsonFile = join(data[1]?.root, 'package.json')

    if (tree.isFile(packageJsonFile)) {
      updateJson(tree, packageJsonFile, (content) => {
        const dependencies = {}

        for (const implicitDependency of content?.implicitDependencies ?? []) {
          dependencies[implicitDependency] = workspacePackages[implicitDependency]
        }

        content.dependencies = Object.fromEntries(Object.entries(dependencies).filter(([key, value]) => !!key && !!value))
        delete content.implicitDependencies

        return content
      })
    }
  }
}

function updateEslintConfig (tree: Tree): void {
  const eslintFileNames = [
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
    'eslint.config.js' // new format that requires `ESLINT_USE_FLAT_CONFIG=true`
  ]

  visitNotIgnoredFiles(tree, '.', (path) => {
    if (eslintFileNames.includes(basename(path))) {
      let contents = tree.read(path).toString()

      if (!contents.includes('@nrwl/nx')) {
        return
      }

      contents = contents.replace(new RegExp('@nrwl/nx', 'g'), '@nx')

      tree.write(path, contents)
    }
  })
}

function updateJestConfig (tree: Tree): void {
  logger.info('Update jest configs and set preset files')

  tree.write(
    'jest.preset.js',
    `module.exports = {
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).[jt]s'],
  transform: {
    '^.+\\\\.(ts|js)$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.json' }
    ]
  }
}`
  )
  tree.write(
    'jest-e2e.preset.js',
    `module.exports = {
  testMatch: ['<rootDir>/test/**/?(*.)e2e-+(spec|test).[jt]s'],
    transform: {
    '^.+\\\\.(ts|js)$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.json' }
    ]
  }
}`
  )

  const projects = getProjects(tree)

  for (const [name, project] of projects) {
    const jestConfig = `export default {
  displayName: "${name}",
  rootDir: '../',
  preset: '../../jest.preset.js',
}`
    const jestE2eConfig = `export default {
  displayName: "${name}-e2e",
  rootDir: '../',
  preset: '../../jest-e2e.preset.js',
}`

    const testTsconfig = join(project.root, 'test', 'tsconfig.json')
    const testConfig = join(project.root, 'test', 'jest.config.js')
    const testE2eConfig = join(project.root, 'test', 'jest-e2e.config.js')

    if (tree.exists(testTsconfig)) {
      tree.delete(testTsconfig)
    }

    if (tree.exists(testConfig)) {
      tree.write(testConfig.replace('.js', '.ts'), jestConfig)
      tree.delete(testConfig)
    }

    if (tree.exists(testE2eConfig)) {
      tree.write(testE2eConfig.replace('.js', '.ts'), jestE2eConfig)
      tree.delete(testE2eConfig)
    }
  }
}
