/**
 * @description user controller 
 * @author neolu
 */

 const {getUserInfo,createUser,deleteUser,updateUser} = require('../service/user');
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

 /**
  * @param {string} userName
  * @param {string} passowrd
  */
 async function login(ctx,userName,passowrd){
    const userInfo = await getUserInfo(userName,doCrypto(passowrd));
    if(!userInfo){
        return new ErrorModel(ErrorMessage.loginFailInfo);
    }
    //login success 
    console.log("userbefore",ctx.session.userinfo);
    if(ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo;
    }
    console.log("userafter",ctx.session.userInfo);

    return new SuccessModel(userInfo);
 }


 /**
  * @param {string} userName
  */
async function deleteCurrentUser(userName){
    const result = await deleteUser(userName);
    if(result){
        return new SuccessModel();
    }

    return new ErrorModel(ErrorMessage.deleteUserFailInfo);
}


/**
 * @param {Object} ctx
 * @param {string} nickname
 * @param {string} city
 * @param {string} profileImg
 */
async function changeInfo(ctx,{nickname,city,profileImg}){
    const { username } = ctx.session.userInfo;
    if(!nickname){
        nickname = username;
    }
    //pass in info that needed to be updated
    const result = await updateUser(
        {
            newNickName : nickname,
            newCity : city,
            newPicture : profileImg
        },
        { username }
    );

    if(result){
        Object.assign(ctx.session.userInfo,{
            nickname,
            city,
            profileImg
        })
        return new SuccessModel();
    }

    return new ErrorModel(ErrorMessage.changeInfoFailInfo);
}

/**
 * @param {Object} ctx
 * @param {string} password
 * @param {string} newPassword
 */
async function changePassword(ctx,{password,newPassword}){
    const username = ctx.session.userInfo;
    const result = await updateUser(
    { newPassword:doCrypto(newPassword)},
    { 
        username,
        password:doCrypto(password)
    })

    if(result){
        return new SuccessModel();
    }

    return new ErrorModel(ErrorMessage.changePasswordFialInfo);
}

/**
 * @param {Object} ctx
 */
async function logout(ctx){
    delete ctx.session.userInfo;
    return new SuccessModel();
}
 
 module.exports = {
     isExist,
     register,
     login,
     deleteCurrentUser,
     changeInfo,
     changePassword,
     logout
 };