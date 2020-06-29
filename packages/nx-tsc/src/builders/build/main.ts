/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect'
import { readJsonFile } from '@nrwl/workspace'
import {
  createProjectGraph,
  ProjectGraph
} from '@nrwl/workspace/src/core/project-graph'
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  createTmpTsConfig,
  DependentBuildableProjectNode,
  updateBuildableProjectPackageJsonDependencies
} from '@nrwl/workspace/src/utils/buildable-libs-utils'
import { writeJsonFile } from '@nrwl/workspace/src/utils/fileutils'
import { logProject } from '@webundsoehne/nx-tools'
import { ChildProcess, fork } from 'child_process'
import { copy, removeSync } from 'fs-extra'
import glob from 'glob'
import { basename, dirname, join, normalize, relative } from 'path'
import { Observable, of, Subscriber } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import treeKill from 'tree-kill'

import { FileInputOutput, NodePackageBuilderOptions, NormalizedBuilderOptions } from './schema.d'

export default createBuilder(runNodePackageBuilder)

export function runNodePackageBuilder (
  options: NodePackageBuilderOptions,
  context: BuilderContext
) {
  const projGraph = createProjectGraph()
  const normalizedOptions = normalizeOptions(options, context)
  const { target, dependencies } = calculateProjectDependencies(
    projGraph,
    context
  )

  return of(checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(
    switchMap((result) => {
      if (result) {
        return compileTypeScriptFiles(
          normalizedOptions,
          context,
          projGraph,
          dependencies
        ).pipe(
          tap(() => {
            updatePackageJson(normalizedOptions, context)
            if (
              dependencies.length > 0 &&
              options.updateBuildableProjectDepsInPackageJson
            ) {
              updateBuildableProjectPackageJsonDependencies(
                context,
                target,
                dependencies
              )
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

function normalizeOptions (
  options: NodePackageBuilderOptions,
  context: BuilderContext
) {
  const outDir = options.outputPath
  const files: FileInputOutput[] = []

  const globbedFiles = (
    pattern: string,
    input = '',
    ignore: string[] = []
  ): string[] => {
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
      globbedFiles(
        asset.glob,
        join(context.workspaceRoot, asset.input),
        asset.ignore
      ).forEach((globbedFile) => {
        files.push({
          input: join(context.workspaceRoot, asset.input, globbedFile),
          output: join(
            context.workspaceRoot,
            outDir,
            asset.output,
            globbedFile
          )
        })
      })
    }
  })

  // Relative path for the dist directory
  const tsconfig = readJsonFile(join(context.workspaceRoot, options.tsConfig))
  const rootDir = tsconfig.compilerOptions?.rootDir || ''
  const mainFileDir = dirname(options.main)
  const tsconfigDir = dirname(options.tsConfig)

  const relativeMainFileOutput = relative(
    `${tsconfigDir}/${rootDir}`,
    mainFileDir
  )

  return {
    ...options,
    files,
    relativeMainFileOutput,
    normalizedOutputPath: join(context.workspaceRoot, options.outputPath)
  }
}

let tscProcess: ChildProcess
function compileTypeScriptFiles (
  options: NormalizedBuilderOptions,
  context: BuilderContext,
  projGraph: ProjectGraph,
  projectDependencies: DependentBuildableProjectNode[]
): Observable<BuilderOutput> {
  if (tscProcess) {
    killProcess(context)
  }
  // Cleaning the /dist folder
  removeSync(options.normalizedOutputPath)
  let tsConfigPath = join(context.workspaceRoot, options.tsConfig)

  return Observable.create((subscriber: Subscriber<BuilderOutput>) => {
    if (projectDependencies.length > 0) {
      const libRoot = projGraph.nodes[context.target.project].data.root
      tsConfigPath = createTmpTsConfig(
        tsConfigPath,
        context.workspaceRoot,
        libRoot,
        projectDependencies
      )
    }

    try {
      const args = [ '-p', tsConfigPath, '--outDir', options.normalizedOutputPath ]

      if (options.sourceMap) {
        args.push('--sourceMap')
      }

      const tscPath = join(
        context.workspaceRoot,
        '/node_modules/typescript/bin/tsc'
      )
      if (options.watch) {
        logProject('info', context, 'Starting TypeScript watch')
        args.push('--watch')
        tscProcess = fork(tscPath, args, { stdio: [ 0, 1, 2, 'ipc' ] })
        subscriber.next({ success: true })
      } else {
        logProject('info', context,
          'Transpiling TypeScript files...'
        )
        tscProcess = fork(tscPath, args, { stdio: [ 0, 1, 2, 'ipc' ] })
        tscProcess.on('exit', (code) => {
          if (code === 0) {
            logProject('info', context,
              'Transpiling is done.'
            )
            subscriber.next({ success: true })
          } else {
            subscriber.error('Could not compile Typescript files')
          }
          subscriber.complete()
        })
      }
    } catch (error) {
      if (tscProcess) {
        killProcess(context)
      }
      subscriber.error(
        new Error(`Could not compile Typescript files: \n ${error}`)
      )
    }
  })
}

function killProcess (context: BuilderContext): void {
  return treeKill(tscProcess.pid, 'SIGTERM', (error) => {
    tscProcess = null
    if (error) {
      if (Array.isArray(error) && error[0] && error[2]) {
        const errorMessage = error[2]
        logProject('error', context, errorMessage)
      } else if (error.message) {
        logProject('error', context, error.message)
      }
    }
  })
}

function updatePackageJson (
  options: NormalizedBuilderOptions,
  context: BuilderContext
) {
  const mainFile = basename(options.main, '.ts')
  const typingsFile = `${mainFile}.d.ts`
  const mainJsFile = `${mainFile}.js`
  const packageJson = readJsonFile(
    join(context.workspaceRoot, options.packageJson)
  )

  packageJson.main = normalize(
    `./${options.relativeMainFileOutput}/${mainJsFile}`
  )
  packageJson.typings = normalize(
    `./${options.relativeMainFileOutput}/${typingsFile}`
  )

  writeJsonFile(`${options.outputPath}/package.json`, packageJson)
}

function copyAssetFiles (
  options: NormalizedBuilderOptions,
  context: BuilderContext
): Promise<BuilderOutput> {
  logProject('info', context, 'Copying asset files...')
  return Promise.all(options.files.map((file) => copy(file.input, file.output)))
    .then(() => {
      logProject('info', context, 'Done copying asset files.')
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
