var mysql = require('mysql')
var pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'medbazzar',
    multipleStatements: true,
})
module.exports = pool;