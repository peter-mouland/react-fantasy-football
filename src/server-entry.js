require('babel-polyfill');
const hook = require('node-hook').hook;
const SvgLoader = require('svg-inline-loader');

const connect = require('./server/api/db').connect;
const config = require('./config/db.js');
const webpackAssets = require('../compiled/webpack-assets.json'); // eslint-disable-line import/no-unresolved
const mapWebpackAssets = require('./server/utils/mapWebpackAssets');
require('./config/config');

hook('.scss', () => '');
hook('.svg', (source) => {
  const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
  return `module.exports =  ${JSON.stringify(markup)}`;
});

connect(config.dbUri);

const assets = mapWebpackAssets(webpackAssets);
const createServer = require('./server/server'); //eslint-disable-line
const server = createServer(assets, process.env.NODE_ENV === 'development');

server.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});

// if (!module.parent) {
//   server.listen(process.env.PORT, () => {
//     console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
//   });
// } else {
//   module.exports = server;
// }
