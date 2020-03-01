const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require("koa-redis");

const {REDIS_CONF} = require('./conf/db');
const {isProd} = require('./utils/env');
const secretKeys = require('./conf/secrectKey');


//router
const index = require('./routes');
const userViewRouter = require('./routes/view/user');
const userAPIRouter = require('./routes/api/user');
const errorViewRouter = require('./routes/view/error');

// error handler
let onerrorConf = {};
if(isProd){
  onerrorConf = {
    redirect:'/error'
  };
}
onerror(app,onerrorConf);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

//using ejs template
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

app.keys = [secretKeys.SESSION_SECRET_KEY];
//connect session
app.use(session({
  key:"weibo.sid", //cookie name
  prefix:"weibo:sess:", //redis key
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24*60*60*1000
  },
  store:redisStore({
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}));


// register routes
app.use(index.routes(), index.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods());
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods()); //need to be registered at the last position


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
