const webpack = require('webpack');
const nodemon = require('nodemon');
const nodemonConfig = require('../../nodemon.json');
const merge = require('webpack-merge');
require('babel-core/register')({
  only: [/src/, /tests/, /config/]
});
const baseConfig = require('./webpack.common');
const { SRC } = require('./paths');
require('./config');

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      `${SRC}/client-entry.js`
    ],
    vendor: [`${SRC}/vendor.js`]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '**': 'http://localhost:9090'
    },
    setup() {
      process.env.PORT = 9090;
      nodemonConfig.script = 'src/server-entry.js';
      nodemon(nodemonConfig);
    },
    hot: true
    // enable HMR on the server
  }
});
