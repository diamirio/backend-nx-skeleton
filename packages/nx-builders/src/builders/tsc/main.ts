import type { BuilderOutput } from '@angular-devkit/architect'
import { createBuilder } from '@angular-devkit/architect'
import { readPackageJson } from '@nrwl/workspace/src/core/file-utils'
import { createTmpTsConfig, updateBuildableProjectPackageJsonDependencies } from '@nrwl/workspace/src/utilities/buildable-libs-utils'
import delay from 'delay'
import execa from 'execa'
import { copy, existsSync, readJsonSync, removeSync, writeJsonSync } from 'fs-extra'
import { EOL } from 'os'
import { basename, dirname, join, normalize, relative } from 'path'

import type { NormalizedBuilderOptions, OptionParser, OptionParserModes, ProcessPaths, TscBuilderOptions } from './main.interface'
import {
  BaseExecutor,
  checkPathsExists,
  generateBuilderAssets,
  getNodeBinaryPathExtensions,
  isVerbose,
  mergeDependencies,
  pipeProcessToLogger,
  runExecutor
} from '@webundsoehne/nx-tools'
import type { ExecaArguments, FileInputOutput, NodeBinaryPathExtensions } from '@webundsoehne/nx-tools'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

// i converted this to a class since it makes not too much sense to have separate functions with tons of same inputs
class Executor extends BaseExecutor<TscBuilderOptions, NormalizedBuilderOptions, ProcessPaths> {
  pathExtensions: NodeBinaryPathExtensions

  init (): void {
    this.pathExtensions = getNodeBinaryPathExtensions()

    this.paths = {
      typescript: 'tsc',
      tsconfigReplacePaths: 'tsconfig-replace-paths',
      tscWatch: 'tsc-watch',
      tsconfig: join(this.context.root, this.options.tsConfig ?? 'tsconfig.build.json')
    }
  }

  async run (): Promise<BuilderOutput> {
    // have to be observable create because of async subscriber, it causes no probs dont worry
    // Cleaning the /dist folder
    this.logger.debug('Output path will be: %s', this.options.normalizedOutputPath)
    removeSync(this.options.normalizedOutputPath)

    try {
      // stop all manager tasks
      await this.manager.stop()

      checkPathsExists(this.paths, this.pathExtensions.path)
    } catch (e) {
      this.logger.fatal(e.message)
      this.logger.debug(e.stack)

      return { success: false, error: e.message }
    }

    let success = false
    let error: string
    let outputPath: string

    try {
      const libRoot = this.projectGraph.nodes[this.context.projectName].data.root

      if (this.projectDependencies.length > 0) {
        this.paths.tsconfig = createTmpTsConfig(this.paths.tsconfig, this.context.root, libRoot, this.projectDependencies)
      }

      if (this.options.watch) {
        this.logger.info('Starting TypeScript-Watch...')

        this.logger.debug('tsc-watch path: %s', this.paths.tscWatch)

        const { args, spawnOptions } = this.normalizeArguments('tsc-watch')

        const instance = this.manager.addPersistent(execa(this.paths.tscWatch, args, spawnOptions))

        void instance.on('message', async (msg: 'first_success' | 'success' | 'compile_errors') => {
          switch (msg) {
          case 'success':
            await this.secondaryCompileActions()

            if (this.options.runAfterWatch) {
              await this.manager.kill()
              const subInstance = this.manager.add(execa.command(this.options.runAfterWatch, this.normalizeArguments('runAfterWatch').spawnOptions))

              // we dont want errors from this since it can be killed
              try {
                await pipeProcessToLogger(this.context, subInstance)
              } catch (e) {
                this.logger.debug(e.message)
              }
            } else {
              this.logger.warn('No option for "runAfterWatch" is defined for package. Doing nothing.')
            }

            break

          default:
            break
          }
        })

        await pipeProcessToLogger(this.context, instance, { start: true })
      } else {
        // the normal mode of compiling
        this.logger.info('Transpiling TypeScript files...')

        this.logger.debug('typescript path: %s', this.paths.typescript)

        const { args, spawnOptions } = this.normalizeArguments('typescript')

        const instance = this.manager.addPersistent(execa(this.paths.typescript, args, spawnOptions))

        await pipeProcessToLogger(this.context, instance, { start: true })

        this.logger.info('Transpiling to TypeScript is done.')

        // perform secondary actions
        await this.secondaryCompileActions()
      }

      success = true
      outputPath = this.options.normalizedOutputPath
    } catch (e) {
      if (this.options.watch) {
        // if in watch mode just restart it
        this.logger.error('tsc-watch crashed restarting in 3 secs.')

        await delay(3000)
        await this.manager.stop()

        return this.run()
      } else {
        success = false
        error = `Transpiling process has been crashed.${EOL}${e}`
      }

      success = false
      error = e.message

      this.logger.fatal(e.message)
      this.logger.debug(e.stack)
    } finally {
      // clean up the zombies!
      await this.manager.stop()
    }

    this.logger.debug('Executor finished.')

    return {
      success,
      outputPath,
      error
    }
  }

  normalizeOptions (options: TscBuilderOptions): NormalizedBuilderOptions {
    const outDir = options.outputPath
    const files: FileInputOutput[] = generateBuilderAssets(
      {
        outDir,
        cwd: options.cwd,
        workspaceRoot: this.context.root
      },
      options.assets
    )

    // Relative path for the dist directory
    const tsconfig = readJsonSync(join(this.context.root, options.tsConfig))
    const rootDir = tsconfig.compilerOptions?.rootDir || ''
    const mainFileDir = dirname(options.main)
    const tsconfigDir = dirname(options.tsConfig)

    const relativeMainFileOutput = relative(`${tsconfigDir}/${rootDir}`, mainFileDir)

    return {
      // default behaviour
      swapPaths: true,
      // injected options
      ...options,
      // parsed options
      files,
      relativeMainFileOutput,
      normalizedOutputPath: join(this.context.root, options.outputPath)
    }
  }

  // so complicated maybe simplify this?
  normalizeArguments (mode?: OptionParserModes): ExecaArguments {
    let args: string[] = []
    let spawnOptions: ExecaArguments['spawnOptions']

    spawnOptions = {
      stdio: 'pipe',
      env: {
        ...process.env,
        ...this.options.environment
      }
    }

    if (this.pathExtensions?.key) {
      spawnOptions.env[this.pathExtensions.key] = this.pathExtensions.path
    }

    const spawnOptionsParser: OptionParser<Record<string, any>> = [
      {
        mode: ['typescript', 'tsc-watch'],
        rules: [{ condition: !!this.options.cwd, args: { cwd: this.options.cwd } }]
      },
      {
        mode: ['tsc-watch'],
        rules: [{ args: { cwd: this.context.root } }]
      },
      {
        mode: ['runAfterWatch'],
        rules: [
          {
            args: {
              cwd: this.options.normalizedOutputPath,
              shell: true
            }
          }
        ]
      }
    ]

    spawnOptionsParser.forEach((o) => {
      if (typeof o.mode === 'undefined' ? true : o.mode.includes(mode)) {
        o.rules.forEach((r) => {
          if (typeof r.condition === 'undefined' ? true : r.condition) {
            spawnOptions = { ...spawnOptions, ...r.args }
          }
        })
      }
    })

    const argumentParser: OptionParser<string[]> = [
      {
        mode: ['typescript', 'tsc-watch'],
        rules: [
          { args: ['-p', this.paths.tsconfig, '--outDir', this.options.normalizedOutputPath] },
          {
            condition: isVerbose(),
            args: ['--extendedDiagnostics', '--listEmittedFiles']
          },
          {
            condition: mode === 'tsc-watch',
            args: ['--noClear', '--sourceMap']
          }
        ]
      },
      {
        mode: ['tsconfigReplacePaths'],
        rules: [
          {
            args: ['-p', this.paths.tsconfig]
          },
          {
            args: ['-o', this.options.outputPath]
          },
          {
            condition: isVerbose(),
            args: ['--verbose']
          }
        ]
      }
    ]

    argumentParser.forEach((o) => {
      if (typeof o.mode === 'undefined' ? true : o.mode.includes(mode)) {
        o.rules.forEach((r) => {
          if (typeof r.condition === 'undefined' ? true : r.condition) {
            args = [...args, ...r.args]
          }
        })
      }
    })

    this.logger.debug('Arguments: %o', args)
    this.logger.debug('Spawn options: %o', spawnOptions)

    return { args, spawnOptions }
  }

  private async secondaryCompileActions (): Promise<[void, void, BuilderOutput]> {
    return Promise.all([this.swapPaths(), this.updatePackageJson(), this.copyAssetFiles()])
  }

  private async swapPaths (): Promise<void> {
    // optional swap paths, which will swap all the typescripts to relative paths.
    if (this.options.swapPaths) {
      this.logger.info('Swapping Typescript paths...')

      this.logger.debug('tsconfig-replace-paths path: %s', this.paths.tsconfigReplacePaths)

      const { args, spawnOptions } = this.normalizeArguments('tsconfigReplacePaths')

      const instance = this.manager.add(execa(this.paths.tsconfigReplacePaths, args, spawnOptions))

      // we dont want errors from this, it can be sig terminated
      try {
        await pipeProcessToLogger(this.context, instance, { stderr: true, stdout: false })
      } catch (e) {
        this.logger.debug(e)
      }

      this.logger.info('Swapped TypeScript paths.')
    }
  }

  private updatePackageJson (): void {
    const packageJsonPath = this.options.packageJson ? join(this.context.root, this.options.packageJson) : join(this.context.root, this.options.cwd, 'package.json')

    this.logger.debug('package.json path: %s', packageJsonPath)

    if (!existsSync(packageJsonPath)) {
      this.logger.warn('No implicit package.json file found for the package. Skipping.')
    } else {
      this.logger.info('Processing "package.json"...')

      const packageJson = readJsonSync(packageJsonPath)

      const mainFile = basename(this.options.main, '.ts')
      const globalPackageJson = readPackageJson()

      // made this optional since it was not alway strue
      if (!packageJson?.main) {
        packageJson.main = normalize(`./${this.options.relativeMainFileOutput}/${mainFile}.js`)

        this.logger.debug('Infered the package.json main entrypoint since it was not found on the provided in the package.')
      }

      if (!packageJson?.types) {
        packageJson.types = normalize(`./${this.options.relativeMainFileOutput}/${mainFile}.d.ts`)

        this.logger.debug('Infered the package.json type entrypoint since it was not found on the provided in the package.')
      }

      // if the current package does not have a version use workspace version
      if (!packageJson?.version) {
        packageJson.version = globalPackageJson?.version ?? '1.0.0'

        this.logger.debug('Infered the package.json version since it was not found on the provided in the package.')
      }

      // update implicit dependencies
      const implicitDependencies = {}

      if (packageJson?.implicitDependencies && packageJson.implicitDependencies.length > 0) {
        this.logger.info('Processing "package.json" implicit dependencies...')

        packageJson.implicitDependencies.forEach((name: string) => {
          if (!globalPackageJson.dependencies[name]) {
            throw new Error(`Package can be not listed as an implicit dependency since it does not exists on global package.json: ${name}`)
          }

          implicitDependencies[name] = globalPackageJson.dependencies[name]
        })
      }

      delete packageJson.implicitDependencies

      if (Object.keys(implicitDependencies).length > 0) {
        packageJson.dependencies = mergeDependencies(packageJson.dependencies ?? {}, implicitDependencies)
      }

      // write file back
      writeJsonSync(`${this.options.normalizedOutputPath}/package.json`, packageJson)
    }

    // this is the default behaviour, lets keep this.
    if (this.projectDependencies.length > 0) {
      updateBuildableProjectPackageJsonDependencies(
        this.context.root,
        this.context.projectName,
        this.context.targetName,
        this.context.configurationName,
        this.projectTarget,
        this.projectDependencies
      )
    }

    this.logger.info('Generated "package.json".')
  }

  private async copyAssetFiles (): Promise<BuilderOutput> {
    this.logger.info('Copying asset files...')

    try {
      await Promise.all(
        this.options.files.map((file) => {
          this.logger.debug('Copying: %s -> %s', file.input, file.output)

          return copy(file.input, file.output)
        })
      )

      this.logger.info('Done copying asset files.')

      return {
        success: true
      }
    } catch (err) {
      this.logger.warn('Can not copy some assets: %s', err.message)

      return {
        error: err.message,
        success: false
      }
    }
  }
}

export default createBuilder(runExecutor(Executor))
