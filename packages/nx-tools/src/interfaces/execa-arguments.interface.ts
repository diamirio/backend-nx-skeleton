import execa from 'execa'

export interface ExecaArguments {
  args: string[]
  spawnOptions: execa.Options
}