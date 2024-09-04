require('dotenv').config();
var mysql = require('mysql2')

var pool = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
    port: process.env.DB_PORT
})

module.exports = pool;




