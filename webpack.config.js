var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-config-merger');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var TARGET = {
  CURRENT: process.env.TARGET,
  BUILD: 'build',
  DEV: 'dev'
};

var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: [
    path.resolve(ROOT_PATH, 'app/main.js')
  ],
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style', 'css'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SurviveJS Kanban App',
      template: path.join(ROOT_PATH, 'app/index.tpl')
    })
  ]
};

var config;

if (TARGET.CURRENT === TARGET.BUILD) {
  config = merge(common, {});
}

if (TARGET.CURRENT === TARGET.DEV) {
  var IP = '0.0.0.0';
  var PORT = '8080';

  config = merge(common, {
    ip: IP,
    port: PORT,
    entry: [
      'webpack-dev-server/client?http://' + [IP, PORT].join(':'),
      'webpack/hot/dev-server'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  });
}

module.exports = config;
