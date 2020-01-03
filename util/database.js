
/*
// data base connection using mysql2
const mysql = require('mysql2');

// CreatePool allows multiple queries to execute where as createConnection allows only one query for a time'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'orcl'
});

module.exports = pool.promise();
*/

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'orcl', {
        dialect: 'mysql', 
        host: 'localhost'
    });

module.exports = sequelize;