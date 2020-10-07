import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { runInRule } from '@rules/index'

import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'
import { formatFiles, Logger } from '@utils/index'

export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      runInRule(log.info.bind(log), `Creating export files: ${options.template.templates.map((t) => t.output).join(', ')}`, !schema.silent),
      await createApplicationFiles(options),

      !schema.skipFormat ? chain([ runInRule(log.info.bind(log), 'Formatting and linting files.'), formatFiles({ eslint: true, prettier: true }) ]) : noop()
    ])
  }
}
