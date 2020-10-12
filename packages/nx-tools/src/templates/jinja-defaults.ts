import nunjucks from 'nunjucks'

/**
 * Default settings for jinja compatible nunjucks.
 * @param options
 */
export function getJinjaDefaults (options?: nunjucks.ConfigureOptions): typeof nunjucks {
  // nunjucks configuration
  nunjucks.configure({
    autoescape: false,
    throwOnUndefined: true,
    trimBlocks: true,
    lstripBlocks: false,
    ...options
  })

  return nunjucks
}
