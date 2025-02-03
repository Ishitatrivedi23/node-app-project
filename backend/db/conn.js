const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",     // or use your MySQL server IP
  user: "mysql",
  password: "Aditi@1122",
  port : 8000, 
  database: "employees_db" ,
connectTimeout: 10000 
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the MySQL database.");
});

module.exports = connection;
