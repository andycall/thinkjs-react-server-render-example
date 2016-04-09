var path = require('path');


module.exports = {
    name: 'server side render',
    entry: {
      'home': "./view/component/home/server.js" 
    },
    output: {
        path: path.join(__dirname, 'view', 'output'),
        filename: "[name].bundle.js",
        libraryTarget: "commonjs2",
        publicPath: '/static'
    },
    target: 'node',
    externals: /^[a-z\-0-9\/]+$/,
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: [path.join(__dirname, 'webpack-loader', 'style-collector'),'css']
        },
        {
          test: /\.scss$/,
          loaders: [path.join(__dirname, 'webpack-loader', 'style-collector'), 'css', 'sass']
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
}