/**
 *@description connect sequelize to mysql
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

if(isTest){
    conf.logging = () => {}
}

if(isProd){
    conf.pool ={
        max:5,
        min:0,
        idle:10000
    }
}

const seq = new Sequelize(database,user,password,conf);

module.exports = seq;