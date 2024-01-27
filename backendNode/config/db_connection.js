require('dotenv').config();
const mysql = require('mysql2');

let connection;

const dbUrl = process.env.DB_URL;
console.log('DB URL:', dbUrl);

if (dbUrl) {
  const regex = /mysql:\/\/([^:]+)(?::([^@]*))?@([^:]+):(\d+)\/([^?]+)/;
  const match = dbUrl.match(regex);
  
  connection = mysql.createConnection({
      host: match[3],
      user: match[1],
      password: match[2] || '',
      database: match[5]
  });
} else {
  console.error('DB URL is not set');
}


module.exports = connection;