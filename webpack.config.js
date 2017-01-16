var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config = {
  entry: './app/main.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    // // extract CSS into separate file
    // new ExtractTextPlugin('app.bundle.css')
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
       test: /\.(jpe?g|gif|png)$/,
       loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
      }
    ],
  },
};

var ENV_PRODUCTION = process.env.NODE_ENV || false;

if (ENV_PRODUCTION) {
  // If it's `production`, let's add production bundler plugins

  // For example: Minify asset if `NODE_ENV` is `production`
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({minimize: true}) //.UglifyJsPlugin
  )
}

module.exports = config;
