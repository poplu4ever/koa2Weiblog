/**
 * @description user controller 
 * @author neolu
 */

 const {getUserInfo,createUser} = require('../service/user');
 const {SuccessModel, ErrorModel} = require('../model/ResModel');
 const ErrorMessage = require('../model/ErrorInfo');
 const doCrypto = require('../utils/cryp');

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


 /**
  * regsiter new user
  * @param {string} userName
  * @param {string} passowrd
  * @param {number} gender
  */
 async function register({userName,password,gender}){
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new ErrorModel(ErrorMessage.registerUserNameExist);
    }
    try{
        await createUser({
            userName,
            password:doCrypto(password),
            gender
        })
        return new SuccessModel();
    }catch(ex){
        console.log(ex.message,ex.stack);
        return new ErrorModel(ErrorMessage.registerFailInfo);
    }
 } 
    
 module.exports = {
     isExist,
     register
 };