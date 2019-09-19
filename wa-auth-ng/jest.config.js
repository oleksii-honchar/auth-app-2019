const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

console.log('[config:jest] config loaded');
module.exports = {
  displayName: 'wa-auth-ng',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [ '<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer' ]
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  preset: 'jest-preset-angular',
  rootDir: path.resolve(),
  setupFilesAfterEnv: [ '<rootDir>/src/setupJest.ts' ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ]
};
