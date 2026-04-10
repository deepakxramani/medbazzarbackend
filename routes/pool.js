require('dotenv').config();
var mysql = require('mysql2');

let pool;

if (process.env.NODE_ENV !== 'test') {
  pool = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
    port: process.env.DB_PORT,
  });

  pool.connect((err) => {
    if (err) {
      console.error('DB Connection Failed:', err);
      process.exit(1); // ❗ fail fast in production
    } else {
      console.log('DB Connected');
    }
  });
} else {
  console.log('Skipping DB connection in test environment');
}

module.exports = pool;
