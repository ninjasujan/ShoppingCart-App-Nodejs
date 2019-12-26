
const mysql = require('mysql2');

// CreatePool allows multiple queries to execute where as createConnection allows only one query for a time'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'orcl'
});

module.exports = pool.promise();