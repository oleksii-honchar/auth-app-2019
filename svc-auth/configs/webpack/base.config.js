const path = require('path');
const webpack = require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

console.log('[config:webpack:snippet] Base loaded');

const pkg = require('../../package.json');

module.exports = (env) => ({
  target: 'node',
  cache: true,
  entry: {
    bundle: './src/index.ts',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html', '.ts', '.tsx'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: './assets/',
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      'PKG_NAME': JSON.stringify(pkg.name),
      'PKG_VERSION': JSON.stringify(pkg.version),
    }),
    new LoaderOptionsPlugin({
      debug: process.env.NODE_ENV !== 'production',
    }),
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
});
