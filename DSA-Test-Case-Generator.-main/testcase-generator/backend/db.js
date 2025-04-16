const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: '2006shree20', 
  database: 'test_db'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting: ' + err.stack);
    return;
  }
  console.log('✅ Connected to the database');
});

module.exports = db;
