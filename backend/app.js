const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var cors = require('cors');
const mysql = require('mysql2');  // Import mysql2 module

const app = express();

// Enable CORS
app.use(cors());

// Set view engine to EJS
app.set("view engine", 'ejs');
app.set('views', 'views');

// Use bodyParser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',  // Replace with your MySQL host
  user: 'root',  // Replace with your MySQL username
  password: 'Aditi@1122',  // Replace with your MySQL password
  database: 'new'  // Replace with your MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Example query to check MySQL connection (optional)
connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
  if (err) {
    console.error('Error in query:', err);
    return;
  }
  console.log('Query result:', results[0].solution);  // Should print '2'
});

// Pass MySQL connection to routes (if needed in routes)
app.use((req, res, next) => {
  req.dbConnection = connection;  // Make the connection available in routes
  next();
});

// Set up routes
app.use('/', routes);

// Start the server
app.listen(5000, () => console.log('Server is listening on port 5000'));