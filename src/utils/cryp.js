/**
 * @description
 * @author neolu
 */

const crypto = require('crypto');
const secrectKeys = require('../conf/secrectKey');

const SECRECT_KEY = secrectKeys.CRYPTO_SECRECT_KEY;

/**
 * md5 encrypt
 * @param {string} content 
 */

 function _md5(content){
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
 }

 /**
  * encrypt function
  * @param {string} content
  */
 function doCrypto(content){
    const str = `password=${content}&key=${SECRECT_KEY}`;
    return _md5(str);
 }


 module.exports = doCrypto;