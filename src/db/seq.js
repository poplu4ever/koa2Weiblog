/**
 *@description connect to mysql
 * @author neolu
 */


const Sequelize = require('sequelize');
const {MYSQL_CONF} = require('../conf/db');
const {host, user, password, database} = MYSQL_CONF;
const {isProd,isTest} = require('../utils/env');


const conf = {
    host:'localhost',
    dialect:'mysql'
};

//check if it is a test environment
if(isTest){
    conf.logging = () => {}
}

//check if it is production environment
if(isProd){
    conf.pool ={
        max:5,
        min:0,
        idle:10000
    }
}

//Initialse seq connection 
const seq = new Sequelize(database,user,password,conf);

module.exports = seq;