var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), config.devServer);

server.listen(config.devServer.port, config.devServer.host, function(err) {
  if (err) { return console.log(err); }
  console.log('Listening at ' + [config.devServer.host, config.devServer.port].join(':'));
});
