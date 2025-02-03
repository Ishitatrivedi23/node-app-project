const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",  // MySQL host
  user: "root",       // MySQL username
  password: "Aditi@1122",  // MySQL password
  database: "employees_db",  // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the database!");
  connection.release();  // Release the connection back to the pool
});
