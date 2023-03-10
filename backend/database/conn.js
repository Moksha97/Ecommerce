
const mysql = require('mysql2');

// Exports a connection to the database
const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:  process.env.MYSQL_DATABASE
  });
  
conn.connect(function(err) {
if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}

console.log('connected as id ' + conn.threadId);
});
  
module.exports = conn

