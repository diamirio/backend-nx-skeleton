import { ESLint } from 'eslint'
import prettier from 'prettier'
import { parentPort, workerData } from 'worker_threads'

export interface ThreadWorkerOptions {
  systemPath: string
  treePath: string
  content: string
  prettier?: boolean
  eslint?: boolean
  isDebug?: boolean
  prettierIgnored?: string[]
}

export interface ThreadWorkerResponse {
  prettier?: boolean
  eslint?: boolean
  content?: string
  prettierTime?: number
  eslintTime?: number
}

async function run (options: ThreadWorkerOptions): Promise<void> {
  const response: ThreadWorkerResponse = {}

  if (options.prettier) {
    const start = Date.now()

    let config: prettier.Options = {
      filepath: options.systemPath
    }

    const localConfig = await prettier.resolveConfig(options.systemPath)

    if (localConfig) {
      config = {
        ...config,
        ...localConfig
      }
    }

    const support = await prettier.getFileInfo(options.systemPath)

    if (support.ignored || !support.inferredParser || options?.prettierIgnored.some((ignore) => options.treePath.includes(ignore))) {
      if (options.isDebug) {
        response.prettier = false

        response.prettierTime = Date.now() - start
      }

      return
    }

    // takes around 500ms
    // dont remove await, eventhough it is not marked as promise it is
    // eslint-disable-next-line @typescript-eslint/await-thenable
    response.content = await prettier.format(options.content, config)

    if (options.isDebug) {
      response.prettier = true

      response.prettierTime = Date.now() - start
    }
  }

  if (options.eslint) {
    const start = Date.now()

    const config: any = {
      filePath: options.systemPath
    }

    // creating new eslint class takes around 25ms
    const eslint = new ESLint({ fix: true })

    // have to exclude json files manually until i found a better solution because overriding exts not work with lintText!
    if (await eslint.isPathIgnored(options.systemPath)) {
      if (options.isDebug) {
        response.eslint = false

        response.eslintTime = Date.now() - start
      }

      return
    }

    // linting takes around 4 seconds
    const results = await eslint.lintText(options.content, config)

    if (results?.[0]?.output) {
      response.content = results[0].output

      if (options.isDebug) {
        response.eslint = true

        response.eslintTime = Date.now() - start
      }
    }
  }

  parentPort.postMessage(response)
}

void run(workerData)
