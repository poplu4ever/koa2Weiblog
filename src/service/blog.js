/**
 * @description Blog Service
 * @author Neolu
 */

 const Blog = require('../db/model/Blog') 

 async function createBlog({userId, content, image}){
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues;
 }

 module.exports = {
     createBlog
 }