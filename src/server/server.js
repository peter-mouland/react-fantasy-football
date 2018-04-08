import debug from 'debug';
import Koa from 'koa';
import compress from 'koa-compress';
import session from 'koa-session';
import convert from 'koa-convert';
import passport from 'koa-passport';
import qs from 'koa-qs';

import { koaAuthMiddleware } from '@kammy/auth-provider';

import handleError from './middleware/handle-error';
import logger from './middleware/logger';
import responseTime from './middleware/response-time';
import headers from './middleware/headers';
import { router, setRoutes } from './router';
import { cookieToken } from '../config/config';

const server = new Koa();
const log = debug('kammy:server.js');
log('starting');

qs(server);

server.keys = ['Shh, its a session!'];
server.use(convert(session({
  key: 'session', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}, server)));

server.use(passport.initialize());
server.use(passport.session());
server.use(handleError());
server.use(responseTime());
server.use(compress({ threshold: 2048 }));
server.use(logger());
server.use(headers());
server.use(koaAuthMiddleware({ cookieToken }));

export default (assets) => {
  log('createServer');
  setRoutes(assets);
  server.use(router.routes());
  return server;
};
