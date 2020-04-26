/**
 * @description Homepage API Controller
 * @author Neolu
 */

 const { createBlog } = require('../service/blog');
 const { SuccessModel, ErrorModel } = require('../model/ResModel');
 const { createBlogFailInfo } = require('../model/ErrorInfo');

 /**
  * 
  * @param {Object} param0 
  */
 async function create({ userId, content, image}){
    try{
        const blog = await createBlog({userId, content, image});
        return new SuccessModel(blog);
    }catch(ex){
        console.log(ex.message, ex.stack);
        return new ErrorModel(createBlogFailInfo);
    }
 }

 module.exports = {
     create
 }