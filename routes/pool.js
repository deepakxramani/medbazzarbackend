var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql-3f5f5d7b-medbazzar.k.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_mcpfDXjLpYLEWBVcjPj',
    database: 'defaultdb',
    multipleStatements: true,
    port: 18107
})
module.exports = pool;




