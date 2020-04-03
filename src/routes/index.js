const router = require('koa-router')();
const { loginRedirect, loginCheck} = require('../middleware/loginCheck');


router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});


router.get('/json', loginCheck,async (ctx, next) => {
  const session = ctx.session;
  if(session.viewNum == null){
    session.viewNum = 0
  }

  console.log("session",ctx.session);
  session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    viewNum:session.viewNum
  }
});

module.exports = router;
