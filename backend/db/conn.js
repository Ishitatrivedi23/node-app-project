const mysql = require("mysql2");


// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',  // Replace with your MySQL host
  user: 'root',  // Replace with your MySQL username
  password: 'Aditi@1122',  // Replace with your MySQL password
  database: 'new',  // Replace with your MySQL database name
 
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the MYSQL database.");
});

module.exports = connection;
