/**
 * @description user service
 * @author neolu
 */

 const User = require('../db/model/User');
 const {formatUser} = require('./_format');

/** 
 * @param {string} userName
 * @param {string} password
 */
 async function getUserInfo(userName,password){
    const whereOpt = {
        userName
    };

    if(password){
        Object.assign(whereOpt,{password});
    }

    //checking user from databse by username or password
    const result = await User.findOne({
        attributes:['id','username','nickname','profileImg','city'],
        where:whereOpt
    })

    // console.log('check userreturn',result);

    //user does not exist
    if(result == null){
        return result;
    }

    //format users
    const formatRes = formatUser(result.dataValues);

    return formatRes;
};

/**
 * create user
 * @param {string} userName
 * @param {string} 
 */
async function createUser({userName,password,gender = 3,nickName}){
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    console.log(result.dataValues);
    return result.dataValues;
}


/**
 * delete user
 * @param {string} userName
 */
 async function deleteUser(userName){
     const result = await User.destory({
         where:{
             userName
         }
     })

    return result > 0;
 }


/**
 * update user
 * @param {Object} param0
 * @param {Object} param1
 */
async function updateUser(
    {newPassword,newNickName,newPicture,newCity},
    {username,password}
){
    //generate update content
    const updateData = {};
    if(newPassword){
        updateData.password = newPassword;
    }
    if(newNickName){
        updateData.nickName = newNickName;
    }
    if(newPicture){
        updateData.profileImg = newPicture;
    }
    if(newCity){
        updateData.city = newCity;
    }

    //generate search query
    const whereData = {
        username
    };

    if(password){
        whereData.password = password;
    }

    //execute update
    const result = await User.update(updateData,{
        where:whereData
    });

    return result[0] > 0; //if result[0] > 0 means change successfully,returns true.
}

 module.exports = {
     getUserInfo,
     createUser,
     deleteUser,
     updateUser
 };