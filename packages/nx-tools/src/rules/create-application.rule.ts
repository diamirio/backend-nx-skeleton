import { filter, forEach, move, noop, Rule, applyPathTemplate } from '@angular-devkit/schematics'

import { BaseCreateApplicationFilesOptions, CreateApplicationRuleInterface, CreateApplicationRuleOptions } from '@rules/create-application.rule.interface'
import { jinjaTemplate, multipleJinjaTemplate } from '@templates/template-engine'
import { formatFiles } from '@utils/file-system/format-files'

/**
 * Returns a general application rule that can be used in schematics.
 * @param appRule
 * @param options
 * @param ruleOptions
 */
export function createApplicationRule<T extends BaseCreateApplicationFilesOptions> (
  appRule: CreateApplicationRuleInterface,
  options?: T,
  ruleOptions?: CreateApplicationRuleOptions
): Rule[] {
  return [
    /**
     * Include files and folders depending on the SchematicFolder infastructure
     * This is mostly for conditional imports of files.
     */
    ...appRule.include
      ? Object.values(appRule.include)?.map((val) => {
        return val.condition ?? true ? noop() : filter((file) => !val.files?.some((f) => file.match(f)))
      })
      : [],

    ...appRule.include
      ? Object.values(appRule.include)?.map((val) => {
        return val.condition ?? true ? noop() : filter((file) => !val.folders?.some((f) => file.match(f)))
      })
      : [],

    /**
     * Cleaning up unwanted files and folders from tree
     * This is mostly for __${NAME}__ like file templates
     */

    // clean up unwanted folders from tree
    ...appRule.templates?.map((val) => {
      return !val.condition ?? false ? filter((file) => !file.match(`__${val.match}__`)) : noop()
    }) ?? [],

    // omit some folders
    ...appRule.omit?.map((val) => {
      return val.condition ?? false ? filter((file) => val.match(file)) : noop()
    }) ?? [],

    /**
     * Generating templates through jinja
     * These templates can be generated from a in-place template or generated multiple by a single template
     */

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

    /**
     * Clean up the file names or do renames
     * Mostly for templates
     */

    // FIXME: This trickery is required in some of the stupid stuff, having two template engines and history merging
    forEach((entry) => {
      if (!entry.path.includes('node_modules')) {
        return applyPathTemplate(
          appRule.templates?.reduce((o, val) => {
            return val.condition ? { ...o, [String(val.match)]: val?.rename ?? '' } : o
          }, {})
        )(entry)
      } else {
        return entry
      }
    }),

    /**
     * Trigger some additional rules
     */

    ...appRule.trigger
      ?.map((val) => {
        return val.condition ?? true ? Array.isArray(val.rule) ? val.rule : [ val.rule ] : noop()
      })
      .flat() ?? [],

    /**
     * Format
     * May be required for diff-merge rules
     */
    // need to format files before putting them through difference, or else it goes crazy.
    appRule.format
      ? formatFiles({
        eslint: true,
        prettier: true,
        ...ruleOptions?.format
      })
      : noop(),

    // move all the files to package root
    options?.root ? move(options.root) : noop()
  ]
}
