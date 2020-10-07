import { filter, move, noop, Rule, template } from '@angular-devkit/schematics'
import { offsetFromRoot } from '@nrwl/workspace'

import { BaseCreateApplicationFilesOptions, CreateApplicationRuleInterface, CreateApplicationRuleOptions } from '@src/rules/create-application.rule.interface'
import { jinjaTemplate, multipleJinjaTemplate } from '@src/templates/template-engine'
import { formatFiles } from '@src/utils/file-system/format-files'

export function createApplicationRule<T extends BaseCreateApplicationFilesOptions> (
  appRule: CreateApplicationRuleInterface,
  options: T,
  ruleOptions?: CreateApplicationRuleOptions
): Rule[] {
  return [
    // clean up unwanted folders from tree
    ...[ ...appRule.templates ?? [], ...appRule.multipleTemplates ?? [] ].map((val) => {
      return !val.condition ?? false ? filter((file) => !file.match(`__${val.match}__`)) : noop
    }) ?? [],

    // omit some folders
    ...appRule.omit?.map((val) => {
      return val.condition ?? false ? filter((file) => val.match(file)) : noop()
    }) ?? [],

    // interpolate multiple templates first because we want to remove the jinja file
    ...appRule.multipleTemplates?.map((val) => {
      return val.condition ?? true
        ? multipleJinjaTemplate<T>(
          {
            ...options
            // offsetFromRoot: offsetFromRoot(options.root)
          },
          {
            templates: val.templates as any
          }
        )
        : noop()
    }) ?? [],

    // interpolate the templates
    jinjaTemplate(
      {
        ...options
        // offsetFromRoot: offsetFromRoot(options.root)
      },
      { templates: [ '.j2' ] }
    ),

    // clean up rest of the names
    template({
      // offsetFromRoot: offsetFromRoot(options.root),
      ...options,
      // replace __*__ from files
      ...[ ...appRule.templates ?? [], ...appRule.multipleTemplates ?? [] ].reduce((o, val) => ({ ...o, [val.match.toString()]: (val as any)?.rename ?? '' }), {})
    }),

    ...appRule.trigger
      ?.map((val) => {
        return val.condition ?? true ? Array.isArray(val.rule) ? val.rule : [ val.rule ] : noop()
      })
      .flat() ?? [],

    // need to format files before putting them through difference, or else it goes crazy.
    formatFiles({
      eslint: true,
      prettier: true,
      ...ruleOptions?.format
    }),

    // move all the files to package root
    move(options.root)
  ]
}
