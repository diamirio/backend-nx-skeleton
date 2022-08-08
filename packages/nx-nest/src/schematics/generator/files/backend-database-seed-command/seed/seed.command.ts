import { CommandRunner, Command } from 'nest-commander'

import { InjectSeederService, SeederService } from '@webundsoehne/nestjs-seeder'

@Command({ name: 'seed', description: 'Run the seeds for the application.' })
export class SeedCommand extends CommandRunner {
  constructor(@InjectSeederService() private seeder: SeederService) {
    super()
  }

  run(): Promise<void> {
    return this.seeder.init()
  }
}
