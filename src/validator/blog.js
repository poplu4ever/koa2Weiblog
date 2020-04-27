/**
 * @description Blog Validator
 * @author Neolu
 */

const validate = require('./validator');

const SCHEMA = {
  type: "object",
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * Verify Blog info
  * @param {Object} data bloginfo 
  */
 function blogValidate(data = {}){
    return validate(SCHEMA,data);   
 }

 module.exports = blogValidate;