// Get node to use Babel so we can use JSX
require('babel-register');

// Import modules we need
const express = require('express');
const webpack = require('webpack');
const compression = require('compression');
const render = require('./render');
const webpackConfig = require('../webpack.config.dev');

// Create the server
const server = express();

// Add compression middleware to the server
server.use(compression());

const compiler = webpack(webpackConfig);

server.use(
  require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
    serverSideRender: true,
    publicPath: webpackConfig.output.publicPath
  })
);

// Render the application for all urls we get to
server.get('*', render);

// Run the server
server.listen('3000', '0.0.0.0', err => {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  console.info('Running server at http://localhost:3000');
});
