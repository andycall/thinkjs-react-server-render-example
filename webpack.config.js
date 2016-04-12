var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var serverConfig = require('./webpack.config.server')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
  name: 'client side render',
  entry: {
    'home': './www/client/home/index',
    'login': './www/client/admin/login/index',
    'dashboard': './www/client/admin/dashboard/index',
    'json-designer': './www/client/json-designer/index'
  },
  output: {
    path: path.join(__dirname, 'www', 'static'),
    filename: "[name].bundle.js",
    publicPath: '/static/'
  },
  progress: true,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.js$/,
        loaders: ['babel']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 3002,
      proxy: 'http://localhost:7890'
    }),
    new ExtractTextPlugin("[name].css")
  ]
}, serverConfig]