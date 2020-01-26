/**
 * @description error number and message defination
 * @author neolu
 */


 module.exports = {
    registerUserNameExist:{
        errorno:10001,
        message:'用户名已存在'
    },
    registerFailInfo:{
        errorno:10002,
        message:'注册失败，请重试'
    },
     registerUserNameNotExist:{
         errorno:10003,
         message:'用户名不存在'
     },
     jsonSchemaFailInfo:{
        errorno:10004,
        message:'json验证不通过'
    }
 };