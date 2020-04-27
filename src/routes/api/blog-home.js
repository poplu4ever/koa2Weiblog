/**
 * @description Homepage Blog API
 * @author NeoLu
 */
const { loginCheck } = require('../../middleware/loginCheck');
const { create } = require('../../controller/blog-home');
const blogValidate = require('../../validator/blog');
const { genValidator } = require('../../middleware/validator');
const router = require('koa-router')();

router.prefix('/api/blog');

router.post('/create', loginCheck , genValidator(blogValidate) , async (ctx, next) => {
  const { content, image } = ctx.request.body; 
  const { id: userId } = ctx.session.userInfo;
  console.log("Check Data", userId, content);
  ctx.body = await create({userId, content, image});
} )

module.exports = router