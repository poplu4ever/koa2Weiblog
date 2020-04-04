/**
 * @description format data
 * @author neolu
 */
const { DEFAULT_PICTURE } = require('../conf/constant');

 function _formatUserPicture(obj){
    if(obj.profileImg == null){
        obj.profileImg = DEFAULT_PICTURE;
    }
    return obj;
 }

/**
 * 
 * @param {Array|Object} list user list or single user 
 */
 function formatUser(list){
    if(list == null){
        return list;
    }

    //is user list
    if(list instanceof Array){
        return list.map(_formatUserPicture)
    }

    //is a single user
    return _formatUserPicture(list);
 }

 module.exports = {
     formatUser
 };