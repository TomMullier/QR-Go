const path = require('path');
const webpack = require('webpack');

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
};