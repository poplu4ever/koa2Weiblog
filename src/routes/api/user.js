/**
 * @description
 * @author
 */

const router = require('koa-router')();
const {isExist,register,login,deleteCurrentUser} = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middleware/validator');
const { isTest } = require('../../utils/env');
const { loginCheck } = require('../../middleware/loginCheck');
 
 
router.prefix('/api/user');

//register API
router.post('/register',genValidator(userValidate),async(ctx,next)=>{
    const {userName,password,gender} = ctx.request.body;
    ctx.body = await register({userName,password,gender})
     
});

router.post('/isExist',async(ctx,next)=>{
    const {userName} = ctx.request.body;
    ctx.body = await isExist(userName);
});

//login API
router.post('/login', async(ctx,next)=>{
    const{userName,password} = ctx.request.body;
    ctx.body = await login(ctx,userName,password);
})

router.post('/delete',loginCheck, async(ctx,next)=>{
    //only run on test env
    if(isTest){
        const { userName } = ctx.session.userInfo;
        ctx.body = await deleteCurrentUser(userValidate);
    }
});


 module.exports = router; 