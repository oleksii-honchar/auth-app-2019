console.log('[config:babel] config loaded');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          // browsers: [
          //   'last 3 versions',
          //   '> 0.25%',
          //   'not dead',
          //   'not ie <= 11',
          //   'not op_mini all',
          // ],
          node: '12',
        },
        // 'modules': false,
        // 'corejs': '3.0.0',
        // 'shippedProposals': true,
        // 'useBuiltIns': 'entry'
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'lodash',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
          'package.json': './package.json'
        }
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      'const-enum',
      {
        'transform': 'removeConst'
      },
    ],
  ],
};
