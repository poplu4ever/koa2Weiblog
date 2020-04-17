/**
 * @description
 * @author neolu
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginCheck');

router.get('/', loginCheck, async (ctx, next) => {
    await ctx.render('index',{})
 });

 module.exports = router;