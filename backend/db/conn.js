const mysql = require("mysql2");
var express = require("express");
var app = express();

// Create a connection to the database
const con = mysql.createConnection({
  host: "localhost",    // or use your MySQL server IP
  user: "root",
  password: "Aditi@1122",
  database: "employees_db",  // Specify your database name
  connectTimeout: 50000
});

// Establish the connection
con.connect((err) => {
  if (err) {
    console.log("Connection error:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Define a route to fetch data
app.get("/fetch", (req, res) => {
  con.query("SELECT * FROM employees_db", function (err, result, fields) {
    if (err) {
      console.log("Error fetching data:", err);
      res.status(500).send("Error fetching data.");
    } else {
      var r = JSON.parse(JSON.stringify(result));
      res.status(200).json(r); // Send the result as a JSON response
    }
  });
});

// Start the Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
