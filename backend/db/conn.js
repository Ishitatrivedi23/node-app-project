const mysql = require("mysql2");

// Create a connection pool to the database
const pool = mysql.createPool({
  host: "localhost",    // or use your MySQL server IP
  user: "root",
  password: "Aditi@1122",
  port: 8000,           // MySQL default port
  database: "employees_db",

  connectTimeout: 50000
});

// To use the pool for querying:
pool.query('SELECT * FROM employees', (error, results) => {
  if (error) {
    console.error("Error fetching data:", error.message);
    return;
  }
  console.log("Employees data:", results);
});

// Export pool for use in other modules
module.exports = pool;
