/**
 * @description
 * @author neolu
 */

const Ajv = require('ajv');
const ajv = new Ajv();

/**
 * 
 * @param {Object} schema //rules
 * @param {Object} data  //data to be verified
 */
function validate(schema, data = {}){
    const valid = ajv.validate(schema,data);
    if(!valid){
        return ajv.errors[0];
    }
}

module.exports = validate;