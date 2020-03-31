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
     loginFailInfo:{
        errorno:10004,
        message:'登陆失败，用户名或密码错误'
    },
    loginCheckFailInfo:{
        errorno:10004,
        message:'尚未登陆'
    }
 };