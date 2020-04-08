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
    },
    changePasswordFialInfo:{
        errorno:10006,
        message:'修改密码失败'
    },
    uploadFileSizeFailInfo:{
        errorno:10007,
        message:'上传文件尺寸过大'
    },
    changeInfoFailInfo:{
        errorno:10008,
        message:'修改用户信息失败'
    },
    deleteUserFailInfo:{
        errorno:10011,
        message:"删除用户失败"
    }
 };