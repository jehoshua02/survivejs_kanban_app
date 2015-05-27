var path = require('path');
var extend = require('extend').bind({}, {});

var TARGET = {
  CURRENT: process.env.TARGET,
  BUILD: 'build',
  DEV: 'dev'
};

var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: path.resolve(ROOT_PATH, 'app/main.js'),
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style', 'css'] }
    ]
  }
};

var config;

if (TARGET.CURRENT === TARGET.BUILD) {
  config = extend(common, {});
}

if (TARGET.CURRENT === TARGET.DEV) {
  config = extend(common, {
    entry: ['webpack/hot/dev-server']
  });
}

module.exports = config;
