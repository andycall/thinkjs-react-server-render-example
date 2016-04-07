var path = require('path');

module.exports = {
    entry: "./www/static/index.js",
    output: {
        path: path.join(__dirname, 'www', 'static', 'output'),
        filename: "bundle.js"
    },
    watch: true,
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        {
          test: /\.scss$/,
          exclude: [/node_modules/],
          loaders: ['style', 'css', 'sass', 'css-path-loader']
        },
        {
          test: /\.js$/,
          loaders: ['babel', 'html-path-loader']
        }
      ]
    }
};
