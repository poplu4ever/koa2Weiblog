/**
 * @description check login
 * @autor neolu
 */

const {ErrorModel} = require('../model/ResModel');
const loginCheckFailInfo = require('../model/ErrorInfo') 

 /**
  * API Login Check
  * @param {Object} ctx 
  * @param {function} next 
  */
async function loginCheck(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        await next();
        return;
    }else{
        ctx.body = new ErrorModel(loginCheckFailInfo);
    }
}

/**
 * Page Login Check
 * @param {Object} ctx 
 * @param {fcuntion} next 
 */
async function loginRedirect(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        await next();
        return;
    }

    const curUrl = ctx.url;
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl));//setting url param before prompting to login
}

module.exports = {
    loginCheck,
    loginRedirect
}