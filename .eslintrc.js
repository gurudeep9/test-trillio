module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'import/no-duplicates': 'error',
    // Evitar asignaciones innecesarias de variables
    'no-unused-vars': 'error',

    // Enforce consistent line breaks before and after dots
    'dot-location': ['error', 'property'],

    // Enforce spacing before and after semicolons
    'semi-spacing': ['error', { before: false, after: true }],

    // Enforce spacing after commas
    'comma-spacing': ['error', { before: false, after: true }],

    // Enforce consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],

    // Enforce consistent spacing inside object curly braces
    'object-curly-spacing': ['error', 'always'],

    // Enforce consistent spacing inside computed property brackets
    'computed-property-spacing': ['error', 'never'],

    // Disallow trailing spaces at the end of lines
    'no-trailing-spaces': 'error',

    // Disallow spaces between function identifiers and their invocations
    'func-call-spacing': ['error', 'never'],

    // Disallow multiple empty lines

    // react hooks validations
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    // suppress errors for missing "import React" in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'consistent-return': 2,
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ],
    'no-else-return': 1,
    semi: [1, 'never'],
    'space-unary-ops': 2,
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'one-var': [2, 'never'],
    'no-var': 'error',
    'arrow-body-style': ['error', 'always'],
    'no-console': 'error',
    'no-multi-spaces': [
      'error',
      {
        exceptions: {
          BinaryExpression: true
        }
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxBOF: 2
      }
    ],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-sort-props': [
      'error',
      {
        noSortAlphabetically: false
      }
    ],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: {
          single: 2,
          multi: 1
        }
      }
    ],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned']
  }
}
