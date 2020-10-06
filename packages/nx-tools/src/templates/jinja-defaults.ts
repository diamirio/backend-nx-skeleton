import nunjucks from 'nunjucks'

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
