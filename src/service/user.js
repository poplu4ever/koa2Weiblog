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

    //user does not exist
    if(result == null){
        return result;
    }

    //format users
    const formatRes = formatUser(result.dataValues);

    return formatRes;
};


 module.exports = {
     getUserInfo
 };