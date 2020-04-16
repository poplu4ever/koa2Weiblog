/**
 * @description Test user API
 * @name neolu
 */


const server = require('../server');

 //userinfo
const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
    userName,
    password, 
    nickName:userName,
    gender:1
}

let COOKIE = '';

//register new user
test('register a user', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errorno).toBe(0);
}) 


//register existed user
test('register a existed user should fail', async () => {
    const res = await server   
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errorno).not.toBe(0);
}) 

//check whether username exist
test('check whether username exist', async () => {
    const res = await server   
        .post('/api/user/isExist')
        .send({userName})
    expect(res.body.errorno).toBe(0);
}) 

//check json schema
test('check whether username exist', async () => {
    const res = await server 
        .post('/api/user/register')
        .send({
            userName:'123',
            password:'a',
            gender:'male'
        })
        expect(res.body.errorno).toBe(0);
    }) 

//check login
test('check login', async () => {
    const res = await server   
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errorno).toBe(0);

    //get cookie
    COOKIE = res.headers['set-cookie'].join(';');
    
}) 

//Update Personal Info
test("update personal info", async () => {
    const res = await server
        .patch('api/user/changeInfo')
        .send({
            nickName:"TEST NICKNAME",
            city: "TEST CITY",
            profileImg: "/TEST.png"
        })
        .set('cookie',COOKIE)
    expect(res.body.errorno).toBe(0)
})

//Update Password
test('update password', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            password,
            newPassword: `p_${Date.now()}`
        })
        .set('cookie',COOKIE)

    expect(res.body.errorno).toBe(0)
})


//delete
test('delete user', async () => {
    const res = await server   
        .post('/api/user/delete')
        .set('cookie',COOKIE)
    expect(res.body.errorno).toBe(0);
}) 

//Logout 
test('Logout', async ()=>{
    const res = await server
        .post('/api/user/logout')
        .set('cookie',COOKIE)
    expect(res.body.errorno).toBe(0)
})


//check delete user
test('check delete user', async () => {
    const res = await server   
        .post('/api/user/isExist')
        .send({userName})
    expect(res.body.errorno).not.toBe(0);
}) 


 