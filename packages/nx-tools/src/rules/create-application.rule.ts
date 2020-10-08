import { filter, forEach, move, noop, Rule } from '@angular-devkit/schematics'
import { applyPathTemplate } from '@angular-devkit/schematics/src/rules/template'

import { BaseCreateApplicationFilesOptions, CreateApplicationRuleInterface, CreateApplicationRuleOptions } from '@src/rules/create-application.rule.interface'
import { jinjaTemplate, multipleJinjaTemplate } from '@src/templates/template-engine'
import { formatFiles } from '@src/utils/file-system/format-files'

export function createApplicationRule<T extends BaseCreateApplicationFilesOptions> (
  appRule: CreateApplicationRuleInterface,
  options?: T,
  ruleOptions?: CreateApplicationRuleOptions
): Rule[] {
  return [
    // clean up unwanted folders from tree
    ...appRule.templates?.map((val) => {
      return !val.condition ?? false ? filter((file) => !file.match(`__${val.match}__`)) : noop
    }) ?? [],

    // omit some folders
    ...appRule.omit?.map((val) => {
      return val.condition ?? false ? filter((file) => val.match(file)) : noop()
    }) ?? [],

    // interpolate multiple templates first because we want to remove the jinja file
    ...appRule.multipleTemplates?.map((val) => {
      return val.condition ?? true
        ? multipleJinjaTemplate<Record<string, any>>(
          {
            ...options ?? {}
            // offsetFromRoot: offsetFromRoot(options.root)
          },
          {
            templates: val.templates
          }
        )
        : noop()
    }) ?? [],

    // interpolate the templates
    jinjaTemplate(
      {
        ...options ?? {}
        // offsetFromRoot: offsetFromRoot(options.root)
      },
      { templates: [ '.j2' ] }
    ),

    ...appRule.templates?.map((val) => {
      return forEach(applyPathTemplate({ [val.match.toString()]: val.rename ?? '' }))
    }) ?? [],

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
    options?.root ? move(options.root) : noop()
  ]
}
