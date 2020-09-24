import { filter, move, noop, Rule, template } from '@angular-devkit/schematics'
import { names, offsetFromRoot } from '@nrwl/workspace'

import { BaseCreateApplicationFilesOptions, CreateApplicationRuleInterface, CreateApplicationRuleOptions } from './create-application-rule.interface'
import { formatFiles } from '@utils/format-files'
import { jinjaTemplate } from '@utils/template-engine'

export function createApplicationRule<T extends BaseCreateApplicationFilesOptions> (
  files: CreateApplicationRuleInterface,
  options: T,
  ruleOptions?: CreateApplicationRuleOptions
): Rule[] {
  return [
    // clean up unwanted folders from tree
    ...files.templates.map((val) => {
      return val.condition ? filter((file) => !file.match(`__${val.match}__`)) : noop
    }),

    // interpolate the templates
    jinjaTemplate(
      {
        ...names(options.name),
        ...options,
        offsetFromRoot: offsetFromRoot(options.root)
      },
      { templates: [ '.j2' ] }
    ),

    // clean up rest of the names
    template({
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.root),
      // replace __*__ from files
      ...files.templates.reduce((o, val) => ({ ...o, [val.match.toString()]: '' }), {})
    }),

    // omit some folders
    ...files.omitFolders.map((val) => {
      return val.condition ? filter((file) => val.match(file)) : noop()
    }),

    // need to format files before putting them through difference, or else it goes crazy.
    formatFiles({
      ...ruleOptions?.format,
      eslint: true,
      prettier: true
    }),

    // move all the files to package root
    move(options.root)
  ]
}
