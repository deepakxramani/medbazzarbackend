var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'sql12.freesqldatabase.com',
    user: 'sql12721637',
    password: 'Resn3QTtKJ',
    database: 'sql12721637',
    multipleStatements: true,
    port: 3306
})
module.exports = pool;


//jdbc:mysql://sql12.freesqldatabase.com:3306/sql12721637