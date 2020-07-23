module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: [ 'camelCase', 'PascalCase' ]
      },

      {
        selector: 'variable',
        format: [ 'camelCase', 'UPPER_CASE', 'PascalCase' ]
      },

      {
        selector: 'parameter',
        format: [ 'camelCase' ],
        leadingUnderscore: 'allow'
      },

      {
        selector: 'memberLike',
        modifiers: [ 'private' ],
        format: [ 'camelCase' ],
        leadingUnderscore: 'forbid'
      },

      {
        selector: 'enumMember',
        format: [ 'camelCase', 'UPPER_CASE' ]
      },

      {
        selector: 'typeLike',
        format: [ 'PascalCase' ]
      },

      {
        selector: 'interface',
        format: [ 'PascalCase' ],
        custom: {
          regex: '^I[A-Z]',
          match: false
        }
      }
    ]
  }
}
