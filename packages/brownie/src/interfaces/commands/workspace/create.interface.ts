export class WorkspaceCreateCommandCtx {
  prompts: {
    repo?: string
    branch?: string
    packageEdit?: boolean
    package?: Record<string, any>
  }
  branches: string[]
  skeletons: Record<string, string>
  gitInit: boolean
  gitDir: {
    top?: string
  }
  cwd: string
  scope: string

  constructor () {
    this.prompts = {}
    this.branches = []
    this.gitDir = {}
  }
}
