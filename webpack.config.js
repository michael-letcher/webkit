const path = require('path');
const webpack = require('webpack');

let config = {
  // Starting point of the application
  entry: path.join(__dirname, 'src', 'index'),
  // Bundled output and location
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bower_components')
        ],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};

module.exports = config;