/**
 * @description test user model
 * @name neolu
 */

 const { User } = require("../../src/db/model/index");


 test('The properties in User model is OK',()=>{
     const user = User.build({
         userName:"Milky",
         password:"123123aa",
         nickName:"miumiu",
         gender:1,
         profileImg:"./xxx.png",
         city:'Melbourne'
     });

     expect(user.userName).toBe('Milky');
     expect(user.password).toBe('123123aa');
     expect(user.nickName).toBe('miumiu');
     expect(user.gender).toBe(1);
     expect(user.profileImg).toBe('./xxx.png');
     expect(user.city).toBe('Melbourne');

 });