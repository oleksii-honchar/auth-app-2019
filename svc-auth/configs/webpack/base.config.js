const path = require('path');
const webpack = require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

console.log('[config:webpack:snippet] Base loaded');

const pkg = require('../../package.json');

module.exports = (env) => ({
  target: 'node',
  cache: true,
  entry: {
    bundle: './src/index.ts',
  },
  stats: {
    warnings: false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html', '.ts', '.tsx'],
    modules: [
      'src',
      'node_modules',
    ],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: path.join(__dirname, '../../tsconfig.json')
      })
    ]
  },
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: './assets/',
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new LoaderOptionsPlugin({
      debug: process.env.NODE_ENV !== 'production',
    }),
    new CopyWebpackPlugin([
      { from: './src/assets', to: './assets', ignore: ['*.js.map', '*.css.map'] },
      { from: './src/swagger.json', to: './swagger.json' },
    ])

    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  node: { // for wa should be false
    fs: 'empty',
    global: true,
    crypto: 'empty',
    process: true,
    console: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    __dirname: false,
    __filename: false
  },
  watchOptions: {
    aggregateTimeout: 3000,
  } 
});
