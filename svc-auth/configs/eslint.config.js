console.log('[config:eslint] config loaded');

module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: {
    'space-before-function-paren': [
      'error',
      'always',
    ],
    'class-methods-use-this': ['error', {
      exceptMethods: [
        'render',
      ],
    }],
    'function-paren-newline': [
      'error',
      'consistent',
    ],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'React',
      },
    ],
    'import/prefer-default-export': 'off',
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
    'quote-props': ['error', 'consistent-as-needed'],
    'jest/no-disabled-tests': 1,
    'jest/no-focused-tests': 1,
    'jest/no-identical-title': 2,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals': true
  },
  globals: {
    PKG: true,
    beforeEach: true,
    afterEach: true,
    describe: true,
    it: true,
    expect: true,
  },
  plugins: [
    'babel',
    'jest',
    'json',
    'node'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: false,
    codeFrame: false,
    ecmaVersion: 2018,
    ecmaFeatures: {
      modules: true,
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
        '*.json',
      ],
      excludedFiles: [
        '*.d.ts',
        '*.js'
      ],
    },
  ],
};
