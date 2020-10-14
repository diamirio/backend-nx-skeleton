module.exports = {
  extends: [ './index' ],
  overrides: [
    {
      files: [ '*.jsx' ],
      plugins: [ 'react', 'react-hooks' ],
      parserOptions: {
        project: null,
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
      },
      settings: {
        react: {
          version: 'detect'
        }
      },
      rules: {
        'no-unused-vars': 'off',
        indent: 'off',
        'react/jsx-indent': [ 'error', 2 ],
        'react/jsx-indent-props': [ 'error', 2 ],
        'react/jsx-curly-newline': [ 'error', 'consistent' ],
        'react/jsx-fragments': [ 'error', 'element' ],
        'react/require-render-return': 'error',
        'react/self-closing-comp': [
          'error',
          {
            component: true,
            html: true
          }
        ],
        'react/jsx-tag-spacing': [
          'error',
          {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never'
          }
        ],
        'react/jsx-closing-tag-location': 'error',
        'react/jsx-curly-brace-presence': [ 'error', { props: 'never', children: 'never' } ],
        'react/jsx-equals-spacing': [ 'error', 'never' ],
        'react/jsx-first-prop-new-line': [ 'error', 'multiline' ],
        'react/jsx-props-no-multi-spaces': 'error',
        'react/jsx-wrap-multilines': [
          'error',
          {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'ignore',
            logical: 'ignore',
            prop: 'ignore'
          }
        ]
      }
    }
  ]
}
