/**
 * @description utils api
 * @author neolu
 */


 const router = require('koa-router')();
 const { loginCheck } = require('../../middleware/loginCheck');
 const koaform = require('formidable-upload-koa');
 const { saveFile } = require('../../controller/util');
 
 router.prefix('/api/utils');

 //upload image
router.post('/upload',loginCheck,koaform(),async(ctx,next)=>{
    
    console.log("CHECK FILE", ctx.req.files);
    const file = ctx.req.files['file'];
    const {size,path,name,type} = file;
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath:path});
});

  
 module.exports = router;