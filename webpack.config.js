const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    'qr-scanner-final': './Code/Vue/JS/qr-scanner-source.js',
    'qr-generator-final': './Code/Vue/JS/qr-generator-source.js',
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
};