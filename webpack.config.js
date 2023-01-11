const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './Code/Vue/JS/qr-scanner-source.js',
  output: {
    filename: 'qr-scanner-final.js',
    path: path.resolve(__dirname, 'Code/Vue/JS'),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // disable creating additional chunks
    })
  ],
};