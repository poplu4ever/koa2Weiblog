

const seq = require('./seq');


seq.authenticate().then(()=>{
    console.log('auth ok')
}).catch(()=>{
    console.log('auth err')
});



seq.sync().then(()=>{
    console.log('sync ok');
    process.exit();
});