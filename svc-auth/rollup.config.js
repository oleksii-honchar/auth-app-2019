import path from 'path';

import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    typescript({
      tsconfigOverride: {
        target: 'es5'
      },
      typescript: require('typescript'),
      tsconfig: path.join(__dirname, 'tsconfig.json')
    }),
    resolve(),
    commonjs({
      namedExports: {
        mongoose: [
          'Schema',
          'model'
        ],
        express: [
          'Router',
          'static'
        ],
        assert: [
          'AssertionError'
        ]
      },
      ignore: [
        'saslprep',
        'mongodb-client-encryption'
      ]
    })
  ],
  onwarn: (warning, rollupWarn) => {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      rollupWarn(warning);
    }
  }
};
