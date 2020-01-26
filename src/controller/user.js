/**
 * @description user controller 
 * @author neolu
 */

 const {getUserInfo} = require('../service/user');
 const {SuccessModel, ErrorModel} = require('../model/ResModel');
 const ErrorMessage = require('../model/ErrorInfo');

 /**
  * check whether user exist
  * @param {string} userName
  */
 async function isExist(userName){
    const userInfo = await getUserInfo(userName);
    if(userInfo){
        return new SuccessModel(userInfo);

    } else{
        return new ErrorModel(ErrorMessage.registerUserNameNotExist);
    }
 };


 module.exports = {
     isExist
 };