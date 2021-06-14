import { BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { readJsonFile } from '@nrwl/workspace'
import { readPackageJson } from '@nrwl/workspace/src/core/file-utils'
import { createTmpTsConfig, updateBuildableProjectPackageJsonDependencies } from '@nrwl/workspace/src/utils/buildable-libs-utils'
import { fileExists, writeJsonFile } from '@nrwl/workspace/src/utils/fileutils'
import {
  BaseBuilder,
  checkNodeModulesExists,
  deepMerge,
  ExecaArguments,
  FileInputOutput,
  generateBuilderAssets,
  getNodeBinaryPath,
  isVerbose,
  mergeDependencies,
  pipeProcessToLogger,
  runBuilder
} from '@webundsoehne/nx-tools'
import delay from 'delay'
import execa from 'execa'
import { copy, removeSync } from 'fs-extra'
import { EOL } from 'os'
import { basename, dirname, join, normalize, relative } from 'path'
import { Observable, Subscriber } from 'rxjs'

import { NormalizedBuilderOptions, OptionParser, OptionParserModes, ProcessPaths, TscBuilderOptions } from './main.interface'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

// i converted this to a class since it makes not to much sense to have separate functions with tons of same inputs
class Builder extends BaseBuilder<TscBuilderOptions, NormalizedBuilderOptions, ProcessPaths> {
  public init (): void {
    // paths of the programs, more convient than using the api since tscpaths does not have api
    this.paths = {
      typescript: getNodeBinaryPath('tsc'),
      tscpaths: getNodeBinaryPath('tscpaths'),
      tscWatch: getNodeBinaryPath('tsc-watch'),
      tsconfig: join(this.context.workspaceRoot, this.options.tsConfig ?? 'tsconfig.build.json')
    }
  }

  public run (injectSubscriber?: Subscriber<BuilderOutput>): Observable<BuilderOutput> {
    // have to be observable create because of async subscriber, it causes no probs dont worry
    return Observable.create(async (sub: Subscriber<BuilderOutput>): Promise<void> => {
      const subscriber = injectSubscriber ?? sub

      // Cleaning the /dist folder
      removeSync(this.options.normalizedOutputPath)

      try {
        // stop all manager tasks
        await this.manager.stop()

        // check if needed tools are really installed
        checkNodeModulesExists(this.paths)

        const libRoot = this.projectGraph.nodes[this.context.target.project].data.root
        if (this.projectDependencies.length > 0) {
          this.paths.tsconfig = createTmpTsConfig(this.paths.tsconfig, this.context.workspaceRoot, libRoot, this.projectDependencies)
        }

        // add this after since we do not want to patch check it
        this.paths.tsconfigPaths = `${dirname(this.paths.tsconfig)}/${basename(this.paths.tsconfig, '.json')}.paths.json`

        if (this.options.watch) {
          this.logger.info('Starting TypeScript-Watch...')

          this.logger.debug(`tsc-watch path: ${this.paths.tscWatch}`)

          const { args, spawnOptions } = this.normalizeArguments('tsc-watch')

          const instance = this.manager.addPersistent(execa.node(this.paths.tscWatch, args, spawnOptions))

          instance.on('message', async (msg: 'first_success' | 'success' | 'compile_errors') => {
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

          await pipeProcessToLogger(this.context, instance)
        } else {
          // the normal mode of compiling
          this.logger.info('Transpiling TypeScript files...')

          this.logger.debug(`typescript path: ${this.paths.typescript}`)

          const { args, spawnOptions } = this.normalizeArguments('typescript')

          const instance = this.manager.addPersistent(execa.node(this.paths.typescript, args, spawnOptions))

          await pipeProcessToLogger(this.context, instance)

          this.logger.info('Transpiling to TypeScript is done.')

          // perform secondary actions
          await this.secondaryCompileActions()
        }

        subscriber.next({ success: true, outputPath: this.options.normalizedOutputPath })
      } catch (error) {
        if (this.options.watch) {
          // if in watch mode just restart it
          this.logger.error('tsc-watch crashed restarting in 3 secs.')
          this.logger.debug(error)

          await delay(3000)
          await this.manager.stop()
          await this.run(subscriber).toPromise()
        } else {
          subscriber.error(new Error(`Transpiling process has been crashed.${EOL}${error}`))
        }
      } finally {
        // clean up the zombies!
        await this.manager.stop()
        subscriber.complete()
      }
    })
  }

  public normalizeOptions (options: TscBuilderOptions): NormalizedBuilderOptions {
    const outDir = options.outputPath
    const files: FileInputOutput[] = generateBuilderAssets(
      {
        outDir,
        cwd: options.cwd,
        workspaceRoot: this.context.workspaceRoot
      },
      options.assets
    )

    // Relative path for the dist directory
    const tsconfig = readJsonFile(join(this.context.workspaceRoot, options.tsConfig))
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
      normalizedOutputPath: join(this.context.workspaceRoot, options.outputPath)
    }
  }

  // so complicated maybe simplify this?
  public normalizeArguments (mode?: OptionParserModes): ExecaArguments {
    let args: string[] = []
    let spawnOptions: ExecaArguments['spawnOptions']
    spawnOptions = {
      stdio: 'pipe',
      env: {
        ...process.env,
        ...this.options.environment
      }
    }

    const spawnOptionsParser: OptionParser<Record<string, any>> = [
      {
        mode: [ 'typescript', 'tsc-watch' ],
        rules: [ { condition: !!this.options.cwd, args: { cwd: this.options.cwd } } ]
      },
      {
        mode: [ 'tsc-watch' ],
        rules: [ { args: { cwd: this.context.workspaceRoot } } ]
      },
      {
        mode: [ 'runAfterWatch' ],
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
        mode: [ 'typescript', 'tsc-watch' ],
        rules: [
          { args: [ '-p', this.paths.tsconfig, '--outDir', this.options.normalizedOutputPath ] },
          {
            condition: !!this.options.sourceMap,
            args: [ '--sourceMap' ]
          },
          {
            condition: isVerbose(),
            args: [ '--extendedDiagnostics', '--listEmittedFiles' ]
          },
          {
            condition: mode === 'tsc-watch',
            args: [ '--noClear', '--sourceMap' ]
          }
        ]
      },
      {
        mode: [ 'tscpaths' ],
        rules: [
          {
            args: [ '-p', this.paths.tsconfigPaths, '-s', this.options.outputPath, '-o', this.options.outputPath ]
          },
          {
            condition: isVerbose(),
            args: [ '--verbose' ]
          }
        ]
      }
    ]

    argumentParser.forEach((o) => {
      if (typeof o.mode === 'undefined' ? true : o.mode.includes(mode)) {
        o.rules.forEach((r) => {
          if (typeof r.condition === 'undefined' ? true : r.condition) {
            args = [ ...args, ...r.args ]
          }
        })
      }
    })

    return { args, spawnOptions }
  }

  private async secondaryCompileActions (): Promise<[void, void, BuilderOutput]> {
    return Promise.all([ this.swapPaths(), this.updatePackageJson(), this.copyAssetFiles() ])
  }

  private async swapPaths (): Promise<void> {
    // optional swap paths, which will swap all the typescripts to relative paths.
    if (this.options.swapPaths) {
      this.logger.info('Swapping Typescript paths...')

      this.logger.debug(`tscpaths path: ${this.paths.tscpaths}`)

      // create temporary tsconfig.paths
      const tsconfig = readJsonFile(this.paths.tsconfig)

      writeJsonFile(
        this.paths.tsconfigPaths,
        deepMerge(tsconfig, {
          compilerOptions: { outDir: join(this.context.workspaceRoot, this.options.outputPath), baseUrl: join(this.context.workspaceRoot, this.options.outputPath) }
        })
      )

      const { args, spawnOptions } = this.normalizeArguments('tscpaths')

      const instance = this.manager.add(execa.node(this.paths.tscpaths, args, spawnOptions))

      // we dont want errors from this it can be sig terminated
      try {
        await pipeProcessToLogger(this.context, instance, { stderr: true, stdout: false })
      } catch (e) {
        this.logger.debug(e)
      }

      removeSync(this.paths.tsconfigPaths)

      this.logger.info('Swapped TypeScript paths.')
    }
  }

  private updatePackageJson (): void {
    const packageJsonPath = this.options.packageJson
      ? join(this.context.workspaceRoot, this.options.packageJson)
      : join(this.context.workspaceRoot, this.options.cwd, 'package.json')

    this.logger.debug(`package.json path: ${packageJsonPath}`)

    if (!fileExists(packageJsonPath)) {
      this.logger.warn('No implicit package.json file found for the package. Skipping.')
    } else {
      this.logger.info('Processing "package.json"...')

      const packageJson = readJsonFile(packageJsonPath)

      const mainFile = basename(this.options.main, '.ts')
      const globalPackageJson = readPackageJson()

      // made this optional since it was not alway strue
      if (!packageJson?.main) {
        packageJson.main = normalize(`./${this.options.relativeMainFileOutput}/${mainFile}.js`)
      }

      if (!packageJson?.types) {
        packageJson.types = normalize(`./${this.options.relativeMainFileOutput}/${mainFile}.d.ts`)
      }

      // update implicit dependencies
      const implicitDependencies = {}

      if (packageJson?.implicitDependencies && Object.keys(packageJson.implicitDependencies).length > 0) {
        this.logger.info('Processing "package.json" implicit dependencies...')

        Object.entries(packageJson.implicitDependencies).forEach(([ name, version ]) => {
          if (version === true && !globalPackageJson.dependencies[name]) {
            throw new Error(`Package can be not listed as an implicit dependency since it does not exists on global package.json: ${name}`)
          }

          implicitDependencies[name] = version === true ? globalPackageJson.dependencies[name] : version
        })
      }

      delete packageJson.implicitDependencies

      if (Object.keys(implicitDependencies).length > 0) {
        packageJson.dependencies = mergeDependencies(packageJson.dependencies ?? {}, implicitDependencies)
      }

      // write file back
      writeJsonFile(`${this.options.normalizedOutputPath}/package.json`, packageJson)
    }

    // this is the default behaviour, lets keep this.
    if (this.projectDependencies.length > 0) {
      updateBuildableProjectPackageJsonDependencies(this.context, this.projectTarget, this.projectDependencies)
    }

    this.logger.info('Generated "package.json".')
  }

  private async copyAssetFiles (): Promise<BuilderOutput> {
    this.logger.info('Copying asset files...')

    try {
      await Promise.all(
        this.options.files.map((file) => {
          this.logger.debug(`Copying "${file.input}" to ${file.output}`)

          return copy(file.input, file.output)
        })
      )

      this.logger.info('Done copying asset files.')

      return {
        success: true
      }
    } catch (err) {
      return {
        error: err.message,
        success: false
      }
    }
  }
}

export default createBuilder(runBuilder(Builder))
