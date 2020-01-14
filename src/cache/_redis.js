/**
 * @description connect to redis
 * @author neolu
 */

const redis = require('redis');
const { REDIS_CONF} = require('../conf/db');


//initialise redis client
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host);
redisClient.on('error',err=>{
    console.log("redis is error",err);
});

/**
 *
 * @param {string} key
 * @param {string} val
 * @param {number} timeout
 */
function set(key,val,timeout=60*60){
    if(typeof val === "object"){
        val = JSON.stringify(val);
    }
    redisClient.set(key,val);
    redisClient.expire(key,timeout);
}

/**
 *
 * @param {string} key
 */
function get(key){
    return new Promise((res,rej)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                rej(err);
                return
            }
            if(val == null){
                res(val);
                return
            }
            try{
                res(
                    JSON.parse(val)
                )
            }catch(ex){
                res(val)
            }
        })
    });
}


module.exports = {
    set,
    get
};
