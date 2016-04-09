var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var serverConfig = require('./webpack.config.server')

module.exports = [
  {
    name: 'client side render',
    entry: {
      'home': "./www/client/home/index.js" 
    },
    output: {
        path: path.join(__dirname, 'www', 'static', 'output'),
        filename: "[name].bundle.js",
        publicPath: '/static'
    },
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
          loaders: ['babel', 'html-path-loader']
        }
      ]
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin()
    ]
  },
  serverConfig   
];

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