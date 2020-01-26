/**
 * @description json schema validate
 * @author neolu
 */

const {ErrorModel} = require('../model/ResModel');
const ErrorMessage = require('../model/ErrorInfo')

 function genValidator(validateFn){
     async function validator(ctx,next){
        const data = ctx.request.body;
        const error = validateFn(data);
        if(error){
              ctx.body = new ErrorModel(ErrorMessage.jsonSchemaFailInfo);
              return 
        }
        await next();
     }
     return validator;
 }


 module.exports = {
     genValidator
 };