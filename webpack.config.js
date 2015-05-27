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
    path.resolve(ROOT_PATH, 'app/main.jsx')
  ],
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint-loader', include: path.join(ROOT_PATH, 'app' )}
    ],
    loaders: [
      { test: /\.jsx$/, loader: 'babel', include: path.join(ROOT_PATH, 'app') },
      { test: /\.css$/, loaders: ['style', 'css'] }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
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
  config = merge(common, {
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  });
}

if (TARGET.CURRENT === TARGET.DEV) {
  var HOST = '0.0.0.0';
  var PORT = '8080';

  config = merge(common, {
    devtool: 'source-map',
    devServer: {
      host: HOST,
      port: PORT,
      contentBase: common.output.path,
      hot: true,
      inline: true,
      stats: { colors: true },
      historyApiFallback: true
    },
    entry: [
      'webpack-dev-server/client?http://' + HOST + ':' + PORT,
      'webpack/hot/dev-server'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]
  });
}

module.exports = config;
