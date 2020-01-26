/**
 * @description capsulate data type for database
 * @author neolu
 */

//  const seq = require('./seq');
 const Sequelize = require('sequelize');

 module.exports = {
     STRING: Sequelize.STRING,
     DECIMAL: Sequelize.DECIMAL,
     TEXT:Sequelize.TEXT,
     INTEGER:Sequelize.INTEGER,
     BOOLEAN:Sequelize.BOOLEAN 
 };