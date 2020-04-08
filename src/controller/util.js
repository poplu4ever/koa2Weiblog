/**
 * @description 
 * @author
 */

 const { ErrorModel, SuccessModel } = require('../model/ResModel');
 const errorInfo = require('../model/ErrorInfo');
 const fse = require('fs-extra');
 const path = require('path');


 const MAX_SIZE = 1024 * 1024 * 1024; //max file size 1MB

 const DIST_FOLDER_PATH = path.join(__dirname,'..','..','uploadFiles');

 //check whether to create the path
 fse.exists(DIST_FOLDER_PATH).then(exist => {
     if(!exist){
         fse.ensureDir(DIST_FOLDER_PATH);
     }
 })

 /**
  * 
  * @param {string} name filename
  * @param {string} type filetype
  * @param {number} size
  * @param {string} filePath 
  */
 async function saveFile({name,type,size,filePath}){
    if(size > MAX_SIZE){
        await fse.remove(filePath);
        return new ErrorModel(errorInfo.uploadFileSizeFailInfo);
    }
   
    const fileName = Date.now()+'.'+name; //avoid duplicate name
    const distFilePath = path.join(DIST_FOLDER_PATH,fileName);
    await fse.move(filePath,distFilePath);

    return new SuccessModel({
        url:'/'+fileName,
    });
 }


 module.exports = {
     saveFile
 }