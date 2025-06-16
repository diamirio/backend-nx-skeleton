module.exports = {
  // only fix changed files
  '*.{js,ts,json}': 'biome check --write --no-errors-on-unmatched',
  // on eslintrc change fix the whole project (without appending files)
  'biome.json': () => 'biome check --write --no-errors-on-unmatched'
}
