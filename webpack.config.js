const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
      // Babel
      {
        test: /\.js$/,
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
      },
      // SASS
      {
        test: /\.scss$/,
        // sass-loader compiles SCSS, css-loader allows us to require the SCSS and style-loader injects it to our page
        // loader: ['style-loader', 'css-loader', 'sass-loader'],
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader' // fallback for any CSS not extracted
        }),
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bower_components')
        ],
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('style.css') // call the plugin constructor and name the CSS file
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    inline: true,
    open: true
  }
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin() // call the uglify plugin
  );
}