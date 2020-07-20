/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { readJsonFile, readTsConfig } from '@nrwl/workspace'
import { readPackageJson } from '@nrwl/workspace/src/core/file-utils'
import { createProjectGraph, ProjectGraph } from '@nrwl/workspace/src/core/project-graph'
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  createTmpTsConfig,
  DependentBuildableProjectNode,
  updateBuildableProjectPackageJsonDependencies
} from '@nrwl/workspace/src/utils/buildable-libs-utils'
import { writeJsonFile } from '@nrwl/workspace/src/utils/fileutils'
import { Logger, mergeDependencies, createDependenciesForProjectFromGraph } from '@webundsoehne/nx-tools'
import { SpawnOptions, ChildProcess } from 'child_process'
import merge from 'deepmerge'
import execa from 'execa'
import { copy, removeSync } from 'fs-extra'
import glob from 'glob'
import { basename, dirname, join, normalize, relative } from 'path'
import { Observable, of, Subscriber } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import treeKill from 'tree-kill'

import { FileInputOutput, NodePackageBuilderOptions, NormalizedBuilderOptions } from './main.interface'

export default createBuilder(runNodePackageBuilder)

let childProcesses: ChildProcess[] = []

export function runNodePackageBuilder (options: NodePackageBuilderOptions, context: BuilderContext) {
  const projGraph = createProjectGraph()
  const normalizedOptions = normalizeOptions(options, context)
  const { target, dependencies } = calculateProjectDependencies(projGraph, context)

  return of(checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(
    switchMap((result) => {
      if (result) {
        return compileTypeScriptFiles(normalizedOptions, context, projGraph, dependencies).pipe(
          tap(() => {
            // update package.json
            updatePackageJson(normalizedOptions, context)

            // this is the default behaviour, lets keep this.
            if (dependencies.length > 0 && options.updateBuildableProjectDepsInPackageJson) {
              updateBuildableProjectPackageJsonDependencies(context, target, dependencies)
            }
          }),
          switchMap(() => copyAssetFiles(normalizedOptions, context))
        )
      } else {
        return of({ success: false })
      }
    }),
    map((value) => {
      return {
        ...value,
        outputPath: normalizedOptions.outputPath
      }
    })
  )
}

function normalizeOptions (options: NodePackageBuilderOptions, context: BuilderContext) {
  const outDir = options.outputPath
  const files: FileInputOutput[] = []

  const globbedFiles = (pattern: string, input = '', ignore: string[] = []): string[] => {
    return glob.sync(pattern, {
      cwd: input,
      nodir: true,
      ignore
    })
  }

  options.assets.forEach((asset) => {
    if (typeof asset === 'string') {
      globbedFiles(asset, context.workspaceRoot).forEach((globbedFile) => {
        files.push({
          input: join(context.workspaceRoot, globbedFile),
          output: join(context.workspaceRoot, outDir, basename(globbedFile))
        })
      })
    } else {
      globbedFiles(asset.glob, join(context.workspaceRoot, asset.input), asset.ignore).forEach((globbedFile) => {
        files.push({
          input: join(context.workspaceRoot, asset.input, globbedFile),
          output: join(context.workspaceRoot, outDir, asset.output, globbedFile)
        })
      })
    }
  })

  // Relative path for the dist directory
  const tsconfig = readJsonFile(join(context.workspaceRoot, options.tsConfig))
  const rootDir = tsconfig.compilerOptions?.rootDir || ''
  const mainFileDir = dirname(options.main)
  const tsconfigDir = dirname(options.tsConfig)

  const relativeMainFileOutput = relative(`${tsconfigDir}/${rootDir}`, mainFileDir)

  return {
    ...options,
    files,
    relativeMainFileOutput,
    normalizedOutputPath: join(context.workspaceRoot, options.outputPath)
  }
}

function compileTypeScriptFiles (
  options: NormalizedBuilderOptions,
  context: BuilderContext,
  projGraph: ProjectGraph,
  projectDependencies: DependentBuildableProjectNode[]
): Observable<BuilderOutput> {
  const logger = new Logger(context)

  if (childProcesses.length > 0) {
    killProcess(context)
  }

  // Cleaning the /dist folder
  removeSync(options.normalizedOutputPath)

  let tsConfigPath = join(context.workspaceRoot, options.tsConfig)

  return Observable.create((subscriber: Subscriber<BuilderOutput>) => {
    if (projectDependencies.length > 0) {
      const libRoot = projGraph.nodes[context.target.project].data.root
      tsConfigPath = createTmpTsConfig(tsConfigPath, context.workspaceRoot, libRoot, projectDependencies)
    }

    try {
      let args = [ '-p', tsConfigPath, '--outDir', options.normalizedOutputPath ]

      if (options.sourceMap) {
        args = [ ...args, '--sourceMap' ]
      }

      const tscPath = join(context.workspaceRoot, '/node_modules/typescript/bin/tsc')
      const tscPathsPath = join(context.workspaceRoot, '/node_modules/tscpaths/cjs/index.js')

      const spawnOptions: SpawnOptions = { stdio: 'inherit' }

      if (options.cwd) {
        spawnOptions.cwd = options.cwd
      }

      if (options.watch) {
        logger.info('Starting TypeScript watch')

        args = [ ...args, '-r', 'tsconfig-paths/register', '--watch' ]

        const tscProcess = execa.node(tscPath, args, spawnOptions )

        childProcesses = [ ...childProcesses, tscProcess ]

        subscriber.next({ success: true })
      } else {
        logger.info('Transpiling TypeScript files...')
        const tscProcess = execa.node(tscPath, args, spawnOptions )

        childProcesses = [ ...childProcesses, tscProcess ]

        tscProcess.on('exit', (code) => {
          if (code === 0) {
            logger.info('Transpiling is done.')
            subscriber.next({ success: true })

            if (options.swapPaths) {
            // create temporary tsconfig.paths
              const tsconfig = readJsonFile(tsConfigPath)

              if (!tsconfig.compilerOptions.outDir) {
                throw new Error('Output directory is not found in TSConfig compiler options.')
              }

              writeJsonFile(tsConfigPath, merge(tsconfig, { compilerOptions: { baseUrl: tsconfig.outDir } }))

              // run the tscpaths application
              args = [ '-p', tsConfigPath, '-s', tsconfig.outDir, '-o', tsconfig.outDir ]

              const tscPathsProcess = execa.node(tscPathsPath, args, spawnOptions)

              childProcesses = [ ...childProcesses, tscPathsProcess ]
            }

          } else {
            subscriber.error('Could not compile Typescript files.')

          }

          subscriber.complete()
        })
      }
    } catch (error) {
      if (childProcesses) {
        killProcess(context)
      }

      subscriber.error(new Error(`Could not compile Typescript files: \n ${error}`))
    }
  })
}

function killProcess (context: BuilderContext): void {
  const logger = new Logger(context)

  childProcesses.forEach((process, i) => {
    return treeKill(process.pid, 'SIGTERM', (error) => {

      if (error) {
        if (Array.isArray(error) && error[0] && error[2]) {
          const errorMessage = error[2]
          logger.error(errorMessage)
        } else if (error.message) {
          logger.error(error.message)
        }

      } else {
        delete childProcesses[i]

      }

      logger.debug(`Stopped PID: ${process.pid}`)
    })

  })
}

function updatePackageJson (options: NormalizedBuilderOptions, context: BuilderContext) {
  const mainFile = basename(options.main, '.ts')
  let packageJson = readJsonFile(options.packageJson ?? join(context.workspaceRoot, 'package.json'))
  const globalPackageJson = readPackageJson()

  // update main file and typings
  packageJson = {
    ...packageJson,
    main: normalize(`./${options.relativeMainFileOutput}/${mainFile}.js`),
    typings: normalize(`./${options.relativeMainFileOutput}/${mainFile}.d.ts`)
  }

  // update implicit dependencies
  const implicitDependencies = {}

  if (packageJson.implicitDependencies) {
    Object.entries(packageJson.implicitDependencies).forEach(([ name, version ]) => {
      implicitDependencies[name] = version === true ? globalPackageJson.dependencies[name] : version
    })
  }

  delete packageJson.implicitDependencies

  // update package dependencies
  const project = context.target.project
  const graph = createProjectGraph()

  packageJson.dependencies = mergeDependencies(createDependenciesForProjectFromGraph(graph, project), packageJson.dependencies, implicitDependencies)

  // write file back
  writeJsonFile(`${options.outputPath}/package.json`, packageJson)
}

function copyAssetFiles (options: NormalizedBuilderOptions, context: BuilderContext): Promise<BuilderOutput> {
  const logger = new Logger(context)

  logger.info('Copying asset files...')

  return Promise.all(
    options.files.map((file) => {
      logger.debug(`Copying "${file.input}" to ${file.output}`)

      return copy(file.input, file.output)
    })
  )
    .then(() => {
      logger.info('Done copying asset files.')
      return {
        success: true
      }
    })
    .catch((err: Error) => {
      return {
        error: err.message,
        success: false
      }
    })
}
