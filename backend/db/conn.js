const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "10.107.181.238",
  user: "root",
  password: "shubham@12345",
  port: 3306,  // Port should be a number, not a string
  database: "employees_db",
  connectTimeout: 10000  // Optional: Set a timeout for better handling
});

// Open the MySQL connection
connection.connect(error => {
  if (error) {
    console.error("❌ Error connecting to MySQL:", error.message);
    return;
  }
  console.log("✅ Successfully connected to the MySQL database.");
});

// Handle disconnection errors
connection.on('error', (err) => {
  console.error("⚠️ MySQL Connection Error:", err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log("🔄 Attempting to reconnect...");
  } else {
    throw err;
  }
});

module.exports = connection;
