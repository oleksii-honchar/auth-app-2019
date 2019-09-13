console.log('[config:eslint] config loaded');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    allowImportExportEverywhere: false,
    codeFrame: false,
    ecmaVersion: 2018,
    errorOnUnknownASTType: true,
    errorOnTypeScriptSyntacticAndSemanticIssues: true,
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'space-before-function-paren': [
      'error',
      'always',
    ],
    'class-methods-use-this': 'off',
    'dot-notation': ['error', { 'allowPattern': '^(code)$' }],
    'function-paren-newline': [
      'error',
      'consistent',
    ],
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'max-len': [
      'error',
      {
        code: 90,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-underscore-dangle': ['error', { 'allow': ['_id', '_headers'] }],
    'quote-props': ['error', 'consistent-as-needed'],
    'jest/no-disabled-tests': 1,
    'jest/no-focused-tests': 1,
    'jest/no-identical-title': 2,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals': true
  },
  globals: {
    beforeEach: true,
    afterEach: true,
    describe: true,
    it: true,
    expect: true,
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'json',
    'node',
    'import'
  ],
  settings: {
    'import/extensions': ['.js','.jsx','.ts','.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts','.tsx']
    },
    'import/resolver': {
      'typescript': {
        directory: './configs/tsconfig.json'
      },
      'node': {
        'extensions': ['.js','.jsx','.ts','.tsx']
      }
    }
  },
};
