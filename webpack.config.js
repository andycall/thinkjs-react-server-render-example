var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var serverConfig = require('./webpack.config.server')
var BrowserSync = require('browser-sync');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  name: 'client side render',
  entry: {
    'home': './view/component/home/index'
  },
  output: {
    path: path.join(__dirname, 'www', 'static', 'output'),
    filename: "[name].bundle.js",
    publicPath: '/static'
  },
  progress: true,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        loaders: ['babel']
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
    })

  ]
}

// var server = new WebpackDevServer(compiler, {
//   publicPath: path.join(__dirname, 'www', 'static'),
//   hot: true,
//   noInfo: false,
//   stats: {
//     colors: true,
//     hash: false,
//     timings: false,
//     assets: true,
//     chunks: true,
//     chunkModules: true,
//     modules: false,
//     children: true
//   },
//   proxy: {
//     '*': 'http://localhost:7890'
//   }
// });


// server.listen(7878, 'localhost', function () {
//   console.log('server running at port 7878');
// });