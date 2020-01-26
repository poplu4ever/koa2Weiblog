/**
 * @description
 * @author neolu
 */

 const seq = require('../seq');
 const {STRING,DECIMAL} = require('../types.js');

 const User = seq.define('user',{
     userName:{
        type:STRING,
        allowNull: false,
        unique:true,
        comment:'userName is unique'
     },
     password:{
         type:STRING,
         allowNull:false,
     },
     nickName:{
         type:STRING,
         allowNull:false
     },
     gender:{
         type:DECIMAL,
         allowNull:false,
         defaultValue:3,
         comment:'1 male, 2 female, 3 secret'
     },
     profileImg:{
         type:STRING
     },
     city:{
         type:STRING
     }
 })

 module.exports = User;