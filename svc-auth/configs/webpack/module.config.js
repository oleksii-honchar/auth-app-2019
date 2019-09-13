console.log('[config:webpack:snippet] Module loaded');

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.[tj]sx?$/,
        use: 'source-map-loader',
      },
      {
        test: /\.[tj]sx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: [
          /\.(spec|e2e|d)\.[tj]sx?$/,
          /node_modules/,
        ],
      },
    ],
    noParse: [
      /\.(spec|e2e|d)\.[tj]sx?$/,
      /LICENSE/,
      /README.md/,
    ],
  }
};
