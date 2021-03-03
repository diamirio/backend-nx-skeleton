import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'
import { Help } from '@oclif/plugin-help'

export class CreateCommand extends BaseCommand {
  public async run (): Promise<void> {
    new Help(this.config).showHelp([ '--all' ])
  }
}
