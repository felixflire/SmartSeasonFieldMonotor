const mysql = require('mysql2');
const { randomUUID } = require('crypto');

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  
    database: 'smart_season_field_db',  
    waitForConnections: true,
    connectionLimit: 10,
});

console.log('✅ Connected to MySQL database successfully');
module.exports = connection;  // exports the connection 

