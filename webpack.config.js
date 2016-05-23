var path = require('path');
var webpack = require('webpack');
var serverConfig = require('./webpack.config.server')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var clients = require('./pages').getClient();

module.exports = [{
  name: 'client side render',
  entry: clients,
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!css-path-loader!sass-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!css-path-loader!less-loader')
      },
      {
        test: /\.js$/,
        loaders: ['babel', 'html-path-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loaders: [
          'file?hash=sha512&digest=hex&limit=3000&name=font/[hash:8].[name].[ext]'
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 3002,
      proxy: 'http://localhost:8360'
    }),
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
  ]
}, serverConfig]