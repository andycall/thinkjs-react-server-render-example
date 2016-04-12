var path = require('path');

module.exports = {
  name: 'server side render',
  entry: {
    'home': './www/client/home/server'
  },

  output: {
    path: path.join(__dirname, 'share'),
    filename: "[name].bundle.js",
    libraryTarget: "commonjs2",
    chunkFilename: '[name].[id].js?[chunkhash]',
    publicPath: '/static/'
  },
  target: 'node',
  externals: /^[a-z\-0-9\/]+$/,
  module: {
    loaders: [
      {
        test: /\.(css|less|scss|sass)$/,
        loaders: ['ignore-stylesheet']
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
  ]
}
