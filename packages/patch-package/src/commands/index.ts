import { BaseCommand } from '@cenk1cenk2/oclif-common'

export class CreateCommand extends BaseCommand {
  async run (): Promise<void> {
    // eslint-disable-next-line no-underscore-dangle
    this._help()
  }
}