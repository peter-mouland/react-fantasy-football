import router from 'koa-router';

const users = require('./scripts/users');
const seasons = require('./scripts/seasons');

const apiRouter = router({ prefix: '/api' });

const envCheck = (reason = '') => new Promise((resolve, reject) => {
  if (process.env.NODE_ENV === 'production') {
    reject(`Cant ${reason} as you are on production`);
  } else {
    resolve();
  }
});

apiRouter.get('/nuke/users/:email', async (ctx) => {
  ctx.type = 'json';
  ctx.response.body = { };
  await envCheck('nuke users')
    .then(() => users.nuke({ email: ctx.params.email }))
    .then((nuked) => {
      ctx.response.body = Object.assign(ctx.response.body, { nuked });
      ctx.status = 200;
    }).catch((err) => {
      ctx.status = 500;
      ctx.response.body = { err };
    });
});

apiRouter.get('/nuke/seasons/:season', async (ctx) => {
  ctx.type = 'json';
  ctx.response.body = { };
  await envCheck('nuke seasons')
    .then(() => seasons.nuke({ season: ctx.params.season }))
    .then((nuked) => {
      ctx.response.body = Object.assign(ctx.response.body, { nuked });
      ctx.status = 200;
    }).catch((err) => {
      ctx.status = 500;
      ctx.response.body = { err };
    });
});

export default apiRouter;
