const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'qr-scanner-final': './Code/Vue/JS/qr-scanner-source.js',
    'admin_location_list-final': './Code/Vue/JS/admin_location_list.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'Code/Vue/JS'),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // disable creating additional chunks
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
};