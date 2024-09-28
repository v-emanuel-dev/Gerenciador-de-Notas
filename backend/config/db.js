// Importing the MySQL library
const mysql = require('mysql2');

// Creating a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',       // Database host (localhost in this case)
  user: 'root',            // MySQL username
  password: 'root',        // MySQL password
  database: 'blog_db'      // Name of the database to connect to
});

// Establishing the connection to the MySQL database
db.connect(err => {
  if (err) {
    // Log an error if the connection fails
    console.error('Error connecting to the database:', err);
    return;
  }
  // Log success message if connection is successful
  console.log('Connected to the MySQL database');
});

// Exporting the database connection to be used in other modules
module.exports = db;
