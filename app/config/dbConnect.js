require('dotenv').config({ quiet: true });
const mysql = require('mysql2/promise'); // use promise version for async/await

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 5,     // number of concurrent connections
  queueLimit: 0
});

module.exports = pool;